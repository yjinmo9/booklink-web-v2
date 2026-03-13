"use client";

import { useState } from "react";
import type { FilterState } from "./schema";

export const useMarketplaceUI = (initialQuery: string) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState("원산3동");
  const [selectedRadius, setSelectedRadius] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [filterOpen, setFilterOpen] = useState(false);

  const resetFilters = () => {
    setSelectedRadius("전체");
    setSelectedCategory("전체");
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    selectedRadius,
    setSelectedRadius,
    selectedCategory,
    setSelectedCategory,
    filterOpen,
    setFilterOpen,
    resetFilters,
  };
};
