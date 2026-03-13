// OCR 기능 통합
// - 이미지에서 텍스트 추출 및 책 정보 파싱
// - 알라딘/카카오 API로 검색하여 정확한 책 정보 가져오기
import { searchAladinBooks, AladinBookItem } from "./aladin";
import { searchKakaoBooks, KakaoBookItem } from "./kakao";
import { postJson } from "@/lib/api";

export interface BookInfo {
  title: string;
  author: string;
  isbn?: string;
  publisher?: string;
}

// 이미지를 Base64로 변환
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // data:image/jpeg;base64, 부분 제거하고 base64만 반환
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// OCR을 통해 이미지에서 텍스트 추출
// Supabase Edge Function을 통해 OCR API 호출
export async function extractTextFromImage(file: File): Promise<string> {
  try {
    const base64 = await fileToBase64(file);
    
    const response = await postJson<{ text: string }>("/api/ocr/extract", {
      image: base64,
      format: file.type,
    });

    return response?.text || "";
  } catch (error) {
    console.error("OCR 추출 실패:", error);
    // Fallback: 클라이언트 사이드 OCR 시도
    try {
      return await extractTextFromImageClient(file);
    } catch (fallbackError) {
      throw new Error("OCR 처리를 할 수 없습니다. 백엔드 OCR API와 Tesseract.js 설정을 확인해주세요.");
    }
  }
}

// 클라이언트 사이드 OCR (Fallback)
// Tesseract.js 또는 다른 클라이언트 라이브러리 사용
async function extractTextFromImageClient(file: File): Promise<string> {
  // 동적 import로 Tesseract.js 로드 (없어도 에러 방지)
  try {
    const Tesseract = await import('tesseract.js');
    const { data: { text } } = await Tesseract.recognize(file, 'kor+eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          console.log(`OCR 진행률: ${Math.round(m.progress * 100)}%`);
        }
      }
    });
    return text;
  } catch (error) {
    console.error("Tesseract.js 로드 실패:", error);
    throw new Error("OCR 기능을 사용할 수 없습니다. Tesseract.js를 설치하거나 Supabase Edge Function을 설정해주세요.");
  }
}

// 추출된 텍스트에서 책 정보 파싱
// - 제목, 저자, ISBN, 출판사 등을 추출
export function parseBookInfoFromText(text: string): Partial<BookInfo> {
  const info: Partial<BookInfo> = {};
  
  // ISBN 패턴 찾기 (13자리 또는 10자리)
  const isbnPattern = /(?:ISBN[- ]*(?:13|10)?[- ]*)?(\d{10,13}|\d{9}[\dXx])/g;
  const isbnMatch = text.match(isbnPattern);
  if (isbnMatch) {
    // 숫자와 X만 추출
    info.isbn = isbnMatch[0].replace(/[^\dXx]/g, "");
  }

  // 제목 패턴 (보통 첫 번째 줄이나 큰 글씨 부분)
  // "제목", "책", "저자", "출판사" 등의 키워드 주변 텍스트 추출
  const titlePatterns = [
    /(?:제목|책)[:：\s]*([^\n]{1,50})/,
    /^([^\n]{5,50})/m, // 첫 번째 줄
  ];
  
  for (const pattern of titlePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      info.title = match[1].trim();
      break;
    }
  }

  // 저자 패턴
  const authorPatterns = [
    /(?:저자|작가|지은이)[:：\s]*([^\n]{1,30})/,
    /저[:\s]*([^\n]{1,30})/,
  ];
  
  for (const pattern of authorPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      info.author = match[1].trim();
      break;
    }
  }

  // 출판사 패턴
  const publisherPatterns = [
    /(?:출판사|출판)[:：\s]*([^\n]{1,30})/,
    /출판[:\s]*([^\n]{1,30})/,
  ];
  
  for (const pattern of publisherPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      info.publisher = match[1].trim();
      break;
    }
  }

  return info;
}

// 여러 권의 책 정보를 텍스트에서 추출
// - 줄바꿈이나 구분자로 여러 책이 구분될 수 있음
export function parseMultipleBooksFromText(text: string): Partial<BookInfo>[] {
  // 줄바꿈으로 분리
  const lines = text.split(/\n/).filter(line => line.trim().length > 0);
  
  const books: Partial<BookInfo>[] = [];
  let currentBook: Partial<BookInfo> = {};

  for (const line of lines) {
    const trimmed = line.trim();
    
    // ISBN이 있으면 새로운 책으로 간주
    const isbnMatch = trimmed.match(/(?:ISBN[- ]*)?(\d{10,13}|\d{9}[\dXx])/);
    if (isbnMatch && Object.keys(currentBook).length > 0) {
      books.push(currentBook);
      currentBook = {};
    }

    // 제목 패턴
    if (!currentBook.title && trimmed.length > 3 && trimmed.length < 100) {
      // 숫자나 특수문자만 있는 줄은 제외
      if (!/^[\d\s\-_]+$/.test(trimmed)) {
        currentBook.title = trimmed;
      }
    }

    // 저자 패턴
    if (trimmed.match(/(?:저자|작가|지은이)/)) {
      const authorMatch = trimmed.match(/(?:저자|작가|지은이)[:：\s]*([^\n]{1,30})/);
      if (authorMatch) {
        currentBook.author = authorMatch[1].trim();
      }
    }

    // 출판사 패턴
    if (trimmed.match(/(?:출판사|출판)/)) {
      const publisherMatch = trimmed.match(/(?:출판사|출판)[:：\s]*([^\n]{1,30})/);
      if (publisherMatch) {
        currentBook.publisher = publisherMatch[1].trim();
      }
    }

    // ISBN
    if (isbnMatch) {
      currentBook.isbn = isbnMatch[1].replace(/[^\dXx]/g, "");
    }
  }

  // 마지막 책 추가
  if (Object.keys(currentBook).length > 0) {
    books.push(currentBook);
  }

  // 책이 하나도 없으면 전체 텍스트를 하나의 책으로 간주
  if (books.length === 0) {
    books.push(parseBookInfoFromText(text));
  }

  return books;
}

// 알라딘/카카오 API로 검색하여 정확한 책 정보 가져오기
export async function searchBookByInfo(info: Partial<BookInfo>): Promise<BookInfo | null> {
  try {
    // ISBN이 있으면 ISBN으로 검색
    if (info.isbn) {
      try {
        const aladinResult = await searchAladinBooks(info.isbn, 1, 1);
        if (aladinResult.items.length > 0) {
          const book = aladinResult.items[0];
          return {
            title: book.title,
            author: book.author || info.author || "",
            isbn: book.isbn || info.isbn,
            publisher: book.publisher || info.publisher,
          };
        }
      } catch (error) {
        console.error("알라딘 검색 실패:", error);
      }
    }

    // 제목으로 검색
    if (info.title) {
      try {
        const aladinResult = await searchAladinBooks(info.title, 1, 5);
        if (aladinResult.items.length > 0) {
          // 저자명이 있으면 저자명으로도 필터링
          let matchedBook = aladinResult.items[0];
          
          if (info.author) {
            const authorMatch = aladinResult.items.find(
              (book) => book.author?.includes(info.author!) || info.author?.includes(book.author || "")
            );
            if (authorMatch) {
              matchedBook = authorMatch;
            }
          }

          return {
            title: matchedBook.title,
            author: matchedBook.author || info.author || "",
            isbn: matchedBook.isbn || info.isbn,
            publisher: matchedBook.publisher || info.publisher,
          };
        }
      } catch (error) {
        console.error("알라딘 검색 실패:", error);
      }

      // 카카오로도 시도
      try {
        const kakaoResult = await searchKakaoBooks(info.title, 1, 5);
        if (kakaoResult.items.length > 0) {
          let matchedBook = kakaoResult.items[0];
          
          if (info.author) {
            const authorMatch = kakaoResult.items.find(
              (book) => book.author?.includes(info.author!) || info.author?.includes(book.author || "")
            );
            if (authorMatch) {
              matchedBook = authorMatch;
            }
          }

          return {
            title: matchedBook.title,
            author: matchedBook.author || info.author || "",
            isbn: matchedBook.isbn || info.isbn,
            publisher: matchedBook.publisher || info.publisher,
          };
        }
      } catch (error) {
        console.error("카카오 검색 실패:", error);
      }
    }

    // 검색 결과가 없으면 파싱된 정보 반환
    if (info.title) {
      return {
        title: info.title,
        author: info.author || "",
        isbn: info.isbn,
        publisher: info.publisher,
      };
    }

    return null;
  } catch (error) {
    console.error("책 검색 실패:", error);
    return null;
  }
}

// 이미지에서 책 정보 추출 (메인 함수)
export async function extractBooksFromImage(file: File): Promise<BookInfo[]> {
  try {
    // 1. OCR로 텍스트 추출
    const text = await extractTextFromImage(file);
    
    if (!text || text.trim().length === 0) {
      throw new Error("텍스트를 추출할 수 없습니다.");
    }

    // 2. 여러 권의 책 정보 파싱
    const parsedBooks = parseMultipleBooksFromText(text);

    // 3. 각 책에 대해 API 검색
    const books: BookInfo[] = [];
    for (const parsedBook of parsedBooks) {
      const book = await searchBookByInfo(parsedBook);
      if (book) {
        books.push(book);
      }
    }

    // 4. 검색 결과가 없으면 파싱된 정보 사용
    if (books.length === 0 && parsedBooks.length > 0) {
      for (const parsedBook of parsedBooks) {
        if (parsedBook.title) {
          books.push({
            title: parsedBook.title,
            author: parsedBook.author || "",
            isbn: parsedBook.isbn,
            publisher: parsedBook.publisher,
          });
        }
      }
    }

    return books.length > 0 ? books : [];
  } catch (error) {
    console.error("책 정보 추출 실패:", error);
    throw error;
  }
}

