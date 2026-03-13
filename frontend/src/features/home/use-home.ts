"use client";

import { useRouter } from "next/navigation";
import { useHomeUI } from "./use-home.ui";
import { useHomeBusiness } from "./use-home.business";

export const useHomeController = () => {
  const router = useRouter();
  const ui = useHomeUI();
  const business = useHomeBusiness();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (ui.searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(ui.searchQuery)}`);
    }
  };

  const navigateToSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const navigateToAuth = () => {
    router.push("/auth");
  };

  return {
    ...ui,
    ...business,
    handleSearch,
    navigateToSearch,
    navigateToAuth,
  };
};
