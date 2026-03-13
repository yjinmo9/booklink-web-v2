"use client";

import { useSearchUI } from "./use-search.ui";
import { useSearchBusiness } from "./use-search.business";

export const useSearch = () => {
  const ui = useSearchUI();
  
  const business = useSearchBusiness({
    mode: ui.mode,
    resetLimits: ui.resetLimits,
  });

  return {
    ...ui,
    ...business,
  };
};
