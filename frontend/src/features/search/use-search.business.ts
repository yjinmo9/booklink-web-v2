"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { searchAladinBooks, type AladinBookItem } from "@/integrations/aladin";
import { searchKakaoBooks } from "@/integrations/kakao";
import { searchLibraryBooks, type LibraryBookItem, type LibraryInfo } from "@/integrations/library";
import { searchAladinUsedStore, getUserLocation, type BookStoreInfo } from "@/integrations/aladin-used-store";
import type { SearchMode } from "./use-search.ui";

export interface BookInfo {
  title: string;
  author: string | null;
  publisher?: string | null;
  publishDate?: string | null;
  description: string | null;
}

export interface MarketplaceResult {
  id: string;
  seller: string | null;
  price: number;
  location: string | null;
  condition: string | null;
}

export const useSearchBusiness = ({
  mode,
  resetLimits,
}: {
  mode: SearchMode;
  resetLimits: () => void;
}) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [loading, setLoading] = useState<boolean>(false);
  const [aladinResults, setAladinResults] = useState<AladinBookItem[]>([]);
  const [kakaoResults, setKakaoResults] = useState<AladinBookItem[]>([]);
  const [libraryResults, setLibraryResults] = useState<LibraryBookItem[]>([]);
  const [libraryInfos, setLibraryInfos] = useState<LibraryInfo[]>([]);
  const [usedStoreResults, setUsedStoreResults] = useState<BookStoreInfo[]>([]);
  const [usedStoreLoading, setUsedStoreLoading] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
  const [marketplaceResults, setMarketplaceResults] = useState<MarketplaceResult[]>([]);

  useEffect(() => {
    resetLimits();

    const run = async () => {
      setLoading(true);

      const aladinPromise = (async () => {
        try {
          const { items } = await searchAladinBooks(query, 1, 12, { target: "Used" });
          setAladinResults(items);
        } catch (e: any) {
          toast.error(e?.message ?? "알라딘 검색 실패");
          setAladinResults([]);
        }
      })();

      const kakaoPromise = (async () => {
        try {
          const { items } = await searchKakaoBooks(query, 1, 30);
          setKakaoResults(items as unknown as AladinBookItem[]);
        } catch (e: any) {
          toast.error(e?.message ?? "카카오 검색 실패");
          setKakaoResults([]);
        }
      })();

      const libraryPromise = (async () => {
        if (mode === "borrow" && query) {
          try {
            let location = userLocation;
            if (!location) {
              try {
                location = await Promise.race([
                  getUserLocation(),
                  new Promise<null>((_, reject) => setTimeout(() => reject(new Error("위치 정보 요청 타임아웃")), 5000))
                ]) as { lat: number; lng: number } | null;
                if (location) setUserLocation(location);
              } catch (e) {
                console.warn("위치 정보를 가져올 수 없습니다:", e);
              }
            }
            const result = await searchLibraryBooks(query, 1, 30, location?.lat, location?.lng, 10);
            setLibraryResults(result.items);
            setLibraryInfos(result.libraries || []);
          } catch (e: any) {
            toast.error(e?.message ?? "도서관 검색 실패");
            setLibraryResults([]);
            setLibraryInfos([]);
          }
        } else {
          setLibraryResults([]);
          setLibraryInfos([]);
        }
      })();

      const booksPromise = (async () => {
        try {
          setBookInfo(null);
        } catch (e: any) {
          setBookInfo(null);
        }
      })();

      const salesPromise = (async () => {
        try {
          setMarketplaceResults([]);
        } catch (e: any) {
          setMarketplaceResults([]);
        }
      })();

      const usedStorePromise = (async () => {
        if (mode === "buy" && query) {
          try {
            setUsedStoreLoading(true);
            let location = userLocation;
            if (!location) {
              try {
                location = await Promise.race([
                  getUserLocation(),
                  new Promise<null>((_, reject) => setTimeout(() => reject(new Error("위치 요청 타임아웃")), 5000))
                ]) as { lat: number; lng: number } | null;
                if (location) setUserLocation(location);
              } catch (e) {
                console.warn("위치 가져오기 실패:", e);
              }
            }

            const result = await Promise.race([
              searchAladinUsedStore({
                searchWord: query,
                userLat: location?.lat,
                userLng: location?.lng,
                radiusKm: 10,
                maxBooks: 3,
              }),
              new Promise<never>((_, reject) => setTimeout(() => reject(new Error("타임아웃")), 60000))
            ]);
            setUsedStoreResults(result.books || []);
          } catch (e: any) {
            setUsedStoreResults([]);
            if (e.message?.includes("타임아웃")) {
              toast.error("중고매장 정보 로딩이 오래 걸립니다.");
            } else {
              toast.error("중고매장 정보를 불러올 수 없습니다.");
            }
          } finally {
            setUsedStoreLoading(false);
          }
        } else {
          setUsedStoreLoading(false);
        }
      })();

      await Promise.allSettled([aladinPromise, kakaoPromise, libraryPromise, booksPromise, salesPromise, usedStorePromise]);
      setLoading(false);
    };

    if (query) {
      run();
    }
  }, [query, mode, resetLimits, userLocation]);

  return {
    query,
    loading,
    aladinResults,
    kakaoResults,
    libraryResults,
    libraryInfos,
    usedStoreResults,
    usedStoreLoading,
    userLocation,
    bookInfo,
    marketplaceResults,
  };
};
