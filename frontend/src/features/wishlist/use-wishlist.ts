"use client";

import { useRouter } from "next/navigation";
import { useWishlistBusiness } from "./use-wishlist.business";

export const useWishlistController = () => {
  const router = useRouter();
  const business = useWishlistBusiness();

  const goBack = () => {
    router.back();
  };

  return {
    ...business,
    goBack,
  };
};
