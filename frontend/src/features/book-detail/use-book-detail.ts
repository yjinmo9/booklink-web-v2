"use client";

import { useParams, useRouter } from "next/navigation";
import { useBookDetailBusiness } from "./use-book-detail.business";

export const useBookDetailController = () => {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const business = useBookDetailBusiness(id);

  const goBack = () => {
    router.back();
  };

  return {
    ...business,
    goBack,
  };
};
