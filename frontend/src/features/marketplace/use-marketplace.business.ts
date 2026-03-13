"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getJson } from "@/lib/api";
import type { Listing } from "./schema";

const mockListings: Listing[] = [
  { id: "mock-1", title: "아몬드", author: "손원평", price: 7000, condition: "상", location: "일산동", image_url: null, category: "소설/문학" },
  { id: "mock-2", title: "불편한 편의점", author: "김호연", price: 6500, condition: "중", location: "일산동", image_url: null, category: "에세이" },
  { id: "mock-3", title: "트렌드 코리아 2025", author: "김난도 외", price: 12000, condition: "최상", location: "일산동", image_url: null, category: "경제/경영" },
];

export const useMarketplaceBusiness = ({
  searchQuery,
  selectedLocation,
  selectedRadius,
  selectedCategory,
}: {
  searchQuery: string;
  selectedLocation: string;
  selectedRadius: string;
  selectedCategory: string;
}) => {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const data = await getJson<Array<{
          id: string;
          price: number;
          condition: string | null;
          location: string | null;
          bookTitle: string;
        }>>("/api/sales");

        let normalized: Listing[] = (data || []).map((row) => ({
          id: row.id as string,
          title: row.bookTitle ?? "제목 미상",
          author: null,
          price: row.price as number,
          condition: row.condition ?? null,
          location: row.location ?? null,
          image_url: null,
          category: null,
        }));

        if (!normalized || normalized.length === 0) {
          normalized = [...mockListings];
        }

        setAllListings(normalized);
        setListings(normalized);
      } catch (e: any) {
        toast.error(e?.message ?? "목록을 불러오지 못했습니다.");
        setAllListings([]);
        setListings(mockListings);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    const targetLoc = (selectedLocation || "").toString().trim();
    const base = allListings.length > 0 ? allListings : [];

    let result = base;

    const q = (searchQuery || "").trim().toLowerCase();
    if (q) {
      result = result.filter((item) => (item.title || "").toLowerCase().includes(q));
    }

    if (selectedRadius !== "전체") {
      result = result.filter((item) => {
        const loc = (item.location || "").toString().trim();
        if (!loc || !targetLoc) return false;
        return loc.includes(targetLoc) || targetLoc.includes(loc);
      });
    }

    if (selectedCategory !== "전체") {
      result = result.filter((item) => (item.category || "") === selectedCategory);
    }

    if (result.length === 0) {
      if (targetLoc.includes("일산동")) {
        const dummy = selectedCategory === "전체" ? mockListings : mockListings.filter((d) => d.category === selectedCategory);
        setListings(dummy);
        return;
      }
      setListings([]);
      return;
    }

    setListings(result);
  }, [selectedRadius, selectedLocation, selectedCategory, searchQuery, allListings]);

  return {
    listings,
    isLoading,
  };
};
