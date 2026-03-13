"use client";

import { useState, useEffect } from "react";
import { isAuthenticated } from "@/lib/auth";
import type { RecentBook } from "./schema";

export const useHomeBusiness = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recentBooks, setRecentBooks] = useState<RecentBook[]>([]);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());

    // Fetch recent books (mocking backend call)
    const fetchRecent = async () => {
      // try {
      //   const data = await getJson("/api/books?limit=5");
      //   setRecentBooks(data);
      // } catch (e) {
      //   console.error(e);
      // }
      // Mock data for now
      setRecentBooks([]);
    };
    fetchRecent();
  }, []);

  return {
    isLoggedIn,
    recentBooks,
  };
};
