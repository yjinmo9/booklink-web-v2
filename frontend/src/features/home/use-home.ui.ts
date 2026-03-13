"use client";

import { useState } from "react";

export const useHomeUI = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const popularSearches = [
    "파친코",
    "불편한 편의점",
    "달러구트 꿈 백화점",
    "트렌드 코리아 2025",
    "물고기는 존재하지 않는다",
    "아몬드",
  ];

  return {
    searchQuery,
    setSearchQuery,
    popularSearches,
  };
};
