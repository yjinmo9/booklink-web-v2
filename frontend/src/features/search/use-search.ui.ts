"use client";

import { useState } from "react";

export type SearchMode = "buy" | "borrow";

export const useSearchUI = () => {
  const [mode, setMode] = useState<SearchMode>("buy");
  const [newLimit, setNewLimit] = useState<number>(6);
  const [aladinLimit, setAladinLimit] = useState<number>(6);
  const [marketLimit, setMarketLimit] = useState<number>(6);
  const [libraryLimit, setLibraryLimit] = useState<number>(6);

  const resetLimits = () => {
    setNewLimit(6);
    setAladinLimit(6);
    setMarketLimit(6);
    setLibraryLimit(6);
  };

  return {
    mode,
    setMode,
    newLimit,
    setNewLimit,
    aladinLimit,
    setAladinLimit,
    marketLimit,
    setMarketLimit,
    libraryLimit,
    setLibraryLimit,
    resetLimits,
  };
};
