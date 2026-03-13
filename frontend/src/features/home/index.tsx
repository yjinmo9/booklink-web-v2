"use client";

import { useHomeController } from "./use-home";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, TrendingUp, LogIn } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export function HomeView() {
  const {
    searchQuery,
    setSearchQuery,
    popularSearches,
    isLoggedIn,
    recentBooks,
    handleSearch,
    navigateToSearch,
    navigateToAuth,
  } = useHomeController();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-gradient-to-br from-card via-background to-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-end mb-6">
            {!isLoggedIn && (
              <Button variant="outline" size="sm" onClick={navigateToAuth}>
                <LogIn className="h-4 w-4 mr-2" />
                로그인
              </Button>
            )}
          </div>
          
          <div className="max-w-2xl mx-auto text-center space-y-6 pb-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow blur-2xl opacity-20 animate-pulse" />
              <div className="relative flex items-center justify-center gap-3">
                <div className="relative">
                  <BookOpen className="h-12 w-12 text-primary" strokeWidth={1.5} />
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-glow rounded-full blur opacity-30" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                  BookLink
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              도서관부터 중고거래, 새상품까지. 모든 책을 한 번에
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">도서 검색</h2>
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
              <div className="relative flex gap-2 p-2 bg-card rounded-xl shadow-[var(--shadow-book)] border border-border">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="책 제목, 저자, ISBN으로 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 bg-transparent pl-12 focus-visible:ring-0 text-base"
                />
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              인기 검색어
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => navigateToSearch(search)}
                  className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 text-sm font-medium transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">최근 검색한 도서</h3>
            <div className="space-y-3">
              {recentBooks.map((book, index) => (
                <Card
                  key={index}
                  className="p-4 flex items-center gap-4 hover:shadow-[var(--shadow-hover)] transition-all cursor-pointer border-border bg-gradient-to-br from-card to-background"
                  onClick={() => navigateToSearch(book.title)}
                >
                  <div className="w-12 h-16 bg-muted rounded flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{book.title}</h4>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  <Search className="h-5 w-5 text-muted-foreground" />
                </Card>
              ))}
              {recentBooks.length === 0 && (
                <div className="text-sm text-muted-foreground">최근 검색한 도서가 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
