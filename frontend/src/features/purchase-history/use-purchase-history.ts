"use client";

import { useRouter } from "next/navigation";
import { usePurchaseHistoryBusiness } from "./use-purchase-history.business";

export const usePurchaseHistoryController = () => {
  const router = useRouter();
  const business = usePurchaseHistoryBusiness();

  const goBack = () => {
    router.back();
  };

  return {
    ...business,
    goBack,
  };
};
