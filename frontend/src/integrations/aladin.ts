// 알라딘 검색 프록시 래퍼
// - 클라이언트 키 노출 방지를 위해 백엔드 API를 통해 호출
import { postJson } from "@/lib/api";

export interface AladinBookItem {
  title: string;
  author: string | null;
  publisher: string | null;
  publishDate: string | null;
  isbn: string | null;
  description: string | null;
  cover: string | null;
  link: string | null;
  priceStandard: number | null;
  priceSales: number | null;
}

export interface AladinSearchResponse {
  items: AladinBookItem[];
  total: number;
  page: number;
  size: number;
}

// 알라딘 도서 검색
// - target: Book(일반) | Used(중고)
export async function searchAladinBooks(query: string, page = 1, size = 10, opts?: { target?: "Book" | "Used" }): Promise<AladinSearchResponse> {
  // TODO: 백엔드에 알라딘 검색 API 추가 필요 (현재는 중고서점만 있음)
  // const data = await postJson<AladinSearchResponse>("/api/aladin/search", { q: query, page, size, target: opts?.target });
  // return data;
  throw new Error("알라딘 검색은 아직 구현되지 않았습니다.");
}


