"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getJson } from "@/lib/api";
import type { SaleItem } from "./schema";

export const useSalesHistoryBusiness = () => {
  const [salesData, setSalesData] = useState<SaleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const data = await getJson<Array<{
          id: string;
          bookTitle: string;
          price: number;
          status: string;
          createdAt: string;
        }>>("/api/sales/my");

        const rows = (data || []).map((r) => ({
          id: r.id,
          title: r.bookTitle ?? "제목 미상",
          author: null,
          price: r.price,
          status: r.status ?? "판매중",
          date: new Date(r.createdAt).toISOString().slice(0, 10),
        }));
        setSalesData(rows);
      } catch (e: any) {
        toast.error(e?.message ?? "판매 내역을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  return {
    salesData,
    loading,
  };
};
