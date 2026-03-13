// 알라딘 중고매장 크롤러 통합 함수
// - 검색어로 중고매장 검색
// - 위치 기반 필터링 및 평균 가격 계산

import { postJson } from "@/lib/api";

export interface StoreInfo {
  storeName: string;
  price: number;
  priceText: string;
  stock: string;
  location: string;
  url: string;
  lat?: number;
  lng?: number;
  distance?: number;
}

export interface BookStoreInfo {
  title: string;
  itemId?: string;
  stores: StoreInfo[];
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  nearbyStores: StoreInfo[];
}

export interface UsedStoreResponse {
  books: BookStoreInfo[];
  hasNearbyStores: boolean;
  message?: string;
}

export interface UsedStoreSearchOptions {
  searchWord: string;
  userLat?: number;
  userLng?: number;
  radiusKm?: number;
  maxBooks?: number;
}

// 알라딘 중고매장 검색
export async function searchAladinUsedStore(
  options: UsedStoreSearchOptions
): Promise<UsedStoreResponse> {
  const { searchWord, userLat, userLng, radiusKm = 10, maxBooks = 3 } = options;

  try {
    return await postJson<UsedStoreResponse>("/api/aladin/used-store", {
      searchWord,
      userLat,
      userLng,
      radiusKm,
      maxBooks,
    });
  } catch (error) {
    console.error("알라딘 중고매장 검색 오류:", error);
    throw error;
  }
}

// 사용자 위치 가져오기 (브라우저 Geolocation API)
export function getUserLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation이 지원되지 않습니다."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(`위치 정보를 가져올 수 없습니다: ${error.message}`));
      }
    );
  });
}

// 가격 포맷팅
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR").format(price) + "원";
}

// 거리 포맷팅
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
}

