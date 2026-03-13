// 공공도서관(도서관 정보나루) 검색 프록시 래퍼
// - Functions "library-search"를 통해 서버에서 API 호출
import { postJson } from "@/lib/api";

export interface LibraryBookItem {
  title: string;
  author: string | null;
  publisher: string | null;
  publishDate: string | null;
  isbn: string | null;
  link: string | null;
}

export interface LibraryInfo {
  libCode: string;
  libName: string;
  address: string | null;
  tel: string | null;
  homepage: string | null;
  lat: number | null;
  lon: number | null;
  distance?: number; // km
  hasBook: boolean; // 해당 도서 소장 여부
}

export interface LibrarySearchResponse {
  items: LibraryBookItem[];
  total: number;
  page: number;
  size: number;
  libraries?: LibraryInfo[]; // 위치 기반 검색 시 도서관 정보
}

// 도서관 소장 도서 검색(빌리기 섹션)
export async function searchLibraryBooks(
  query: string,
  page = 1,
  size = 10,
  userLat?: number,
  userLng?: number,
  radiusKm = 10
): Promise<LibrarySearchResponse> {
  try {
    return await postJson<LibrarySearchResponse>("/api/library/search", {
      q: query,
      page,
      size,
      userLat,
      userLng,
      radiusKm,
    });
  } catch (error) {
    console.error("도서관 검색 실패:", error);
    throw error;
  }
}


