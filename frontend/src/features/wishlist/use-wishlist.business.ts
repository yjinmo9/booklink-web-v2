"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getJson } from "@/lib/api";
import type { WishListItem } from "./schema";

export const useWishlistBusiness = () => {
  const [wishlistItems, setWishlistItems] = useState<WishListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const data = await getJson<Array<{
          id: string;
          book: {
            title: string;
            author?: string;
          } | null;
        }>>("/api/wishlist/my");
        
        const items = (data || []).map((item) => ({
          id: item.id,
          title: item.book?.title ?? "제목 미상",
          author: item.book?.author ?? null,
          price: 0, // TODO: 가격 정보 추가 필요
          status: "판매중",
          liked: true,
        }));
        setWishlistItems(items);
      } catch (e: any) {
        toast.error(e?.message ?? "위시리스트를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const toggleLike = (id: string) => {
    // TODO: 백엔드 API로 삭제 구현 필요
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  return {
    wishlistItems,
    loading,
    toggleLike,
  };
};
