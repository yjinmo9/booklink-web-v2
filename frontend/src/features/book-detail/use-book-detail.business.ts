"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getJson } from "@/lib/api";
import type { BookDetail } from "./schema";

export const useBookDetailBusiness = (id: string | undefined) => {
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getJson<any>(`/api/sales/${id}`);
        setBookDetail({
          id: data.id,
          title: data.bookTitle ?? "제목 미상",
          author: data.bookAuthor ?? null,
          price: data.price,
          condition: data.condition ?? null,
          location: data.location ?? null,
          seller: data.sellerNickname ?? null,
          description: data.bookDescription ?? null,
        });
      } catch (e: any) {
        toast.error(e?.message ?? "상세 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleContact = () => {
    toast.success("판매자에게 연락하기 기능은 곧 추가됩니다!");
  };

  const handleLike = () => {
    toast.success("관심 목록에 추가되었습니다!");
  };

  const handleShare = () => {
    toast.success("링크가 복사되었습니다!");
  };

  return {
    bookDetail,
    loading,
    handleContact,
    handleLike,
    handleShare,
  };
};
