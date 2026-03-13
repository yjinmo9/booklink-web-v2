"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getJson, postJson } from "@/lib/api";
import { getUser, removeToken, type User } from "@/lib/auth";
import type { MyPageListing } from "./schema";

export const useMyPageBusiness = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [salesCount, setSalesCount] = useState<number>(0);
  const [purchaseCount, setPurchaseCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [myListings, setMyListings] = useState<MyPageListing[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getJson<User>("/api/auth/me");
        setUser(userData);
      } catch (error) {
        removeToken();
        router.push("/auth");
      }
    };

    const localUser = getUser();
    if (localUser) {
      setUser(localUser);
      fetchUser();
    } else {
      router.push("/auth");
    }
  }, [router]);

  useEffect(() => {
    const fetchMyPage = async () => {
      try {
        const sales = await getJson<Array<{ id: string; price: number; status: string; bookTitle: string }>>("/api/sales/my");
        setSalesCount(sales?.length || 0);
        setMyListings((sales || []).slice(0, 3).map(s => ({ 
          title: s.bookTitle, 
          price: s.price, 
          status: s.status || "판매중" 
        })));

        const purchases = await getJson<Array<{ id: string }>>("/api/purchases/my");
        setPurchaseCount(purchases?.length || 0);

        const wishlist = await getJson<Array<{ id: string }>>("/api/wishlist/my");
        setWishlistCount(wishlist?.length || 0);
      } catch (e: any) {
        // fail silently for now
      }
    };
    if (user) {
      fetchMyPage();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await postJson("/api/auth/logout", {});
      removeToken();
      setUser(null);
      toast.success("안전하게 로그아웃되었습니다.");
      router.push("/auth");
    } catch (error: any) {
      removeToken();
      setUser(null);
      toast.success("안전하게 로그아웃되었습니다.");
      router.push("/auth");
    }
  };

  return {
    user,
    salesCount,
    purchaseCount,
    wishlistCount,
    myListings,
    handleLogout,
  };
};
