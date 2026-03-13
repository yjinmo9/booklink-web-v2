// 카카오 도서 검색 프록시 래퍼
// - 백엔드 API를 통해 서버 측에서 호출
import { postJson } from "@/lib/api";

export interface KakaoBookItem {
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

export interface KakaoSearchResponse {
  items: KakaoBookItem[];
  total: number;
  page: number;
  size: number;
}

// 카카오 도서 검색(새상품 섹션에 사용)
export async function searchKakaoBooks(query: string, page = 1, size = 10): Promise<KakaoSearchResponse> {
  // TODO: 백엔드에 카카오 검색 API 추가 필요
  // const data = await postJson<KakaoSearchResponse>("/api/kakao/search", { q: query, page, size });
  // return data;
  throw new Error("카카오 검색은 아직 구현되지 않았습니다.");
}


