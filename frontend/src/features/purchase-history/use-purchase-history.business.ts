"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getJson } from "@/lib/api";
import type { PurchaseItem } from "./schema";

export const usePurchaseHistoryBusiness = () => {
  const [purchaseData, setPurchaseData] = useState<PurchaseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      try {
        const data = await getJson<Array<{
          id: string;
          sale: {
            bookTitle: string;
            price: number;
            status: string;
          } | null;
          purchaseAt: string;
        }>>("/api/purchases/my");

        const rows = (data || []).map((r) => ({
          id: r.id,
          title: r.sale?.bookTitle ?? "제목 미상",
          author: null,
          price: r.sale?.price ?? 0,
          status: r.sale?.status ?? "구매완료",
          date: r.purchaseAt ? new Date(r.purchaseAt).toISOString().slice(0, 10) : "",
        }));
        setPurchaseData(rows);
      } catch (e: any) {
        toast.error(e?.message ?? "구매 내역을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  return {
    purchaseData,
    loading,
  };
};
