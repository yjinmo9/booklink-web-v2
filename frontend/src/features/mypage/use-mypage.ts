"use client";

import { useRouter } from "next/navigation";
import { useMyPageBusiness } from "./use-mypage.business";

export const useMyPageController = () => {
  const router = useRouter();
  const business = useMyPageBusiness();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return {
    ...business,
    navigateTo,
  };
};
