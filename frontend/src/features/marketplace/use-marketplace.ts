"use client";

import { useSearchParams } from "next/navigation";
import { useMarketplaceUI } from "./use-marketplace.ui";
import { useMarketplaceBusiness } from "./use-marketplace.business";

export const useMarketplaceController = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const ui = useMarketplaceUI(initialQuery);
  const business = useMarketplaceBusiness({
    searchQuery: ui.searchQuery,
    selectedLocation: ui.selectedLocation,
    selectedRadius: ui.selectedRadius,
    selectedCategory: ui.selectedCategory,
  });

  return {
    ...ui,
    ...business,
  };
};
