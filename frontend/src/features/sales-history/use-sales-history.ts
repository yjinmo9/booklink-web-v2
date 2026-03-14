"use client";

import { useRouter } from "next/navigation";
import { useSalesHistoryBusiness } from "./use-sales-history.business";

export const useSalesHistoryController = () => {
  const router = useRouter();
  const business = useSalesHistoryBusiness();

  const goBack = () => {
    router.back();
  };

  return {
    ...business,
    goBack,
  };
};
