"use client";

import { useMarketplaceController } from "./use-marketplace";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Plus, BookOpen, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";

export const categories = [
  "전체",
  "소설/문학",
  "자기계발",
  "전공서적",
  "어린이/유아",
  "만화",
  "잡지",
  "에세이",
  "인문",
  "과학",
  "경제/경영",
  "취미/실용",
  "여행",
  "요리"
];

export const radiusOptions = ["반경 3km", "반경 5km", "반경 10km", "전체"];

export const locations = [
  "원산3동", "대치동", "탄현동", "주엽동", "일산동", "덕이동"
];

export function MarketplaceView() {
  const router = useRouter();
  const {
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
    listings,
    isLoading
  } = useMarketplaceController();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-32 border-none shadow-none gap-1 h-9 px-2">
                <MapPin className="h-4 w-4" />
                <SelectValue />
                <ChevronDown className="h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="도서 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">홈 &gt; 중고거래</p>
              <h1 className="text-2xl font-bold mt-2">"{searchQuery || '도서'}" 검색 결과</h1>
            </div>
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="hidden lg:flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  필터
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between">
                    <span>필터</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      초기화
                    </Button>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="space-y-6 mt-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-base">위치</h3>
                    <div className="space-y-2">
                      {radiusOptions.map((radius) => (
                        <div key={radius} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`mobile-${radius}`}
                            name="mobile-radius"
                            checked={selectedRadius === radius}
                            onChange={() => setSelectedRadius(radius)}
                            className="w-4 h-4 accent-primary cursor-pointer"
                          />
                          <Label htmlFor={`mobile-${radius}`} className="text-sm cursor-pointer font-normal">
                            {radius}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-base">카테고리</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`mobile-${category}`}
                            name="mobile-category"
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                            className="w-4 h-4 accent-primary cursor-pointer"
                          />
                          <Label htmlFor={`mobile-${category}`} className="text-sm cursor-pointer font-normal">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="lg:hidden border-b border-border bg-background">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={selectedRadius} onValueChange={setSelectedRadius}>
              <SelectTrigger className="w-auto h-9 gap-2">
                <MapPin className="h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {radiusOptions.map((radius) => (
                  <SelectItem key={radius} value={radius}>{radius}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-auto h-9 gap-2 min-w-[120px]">
                <BookOpen className="h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(selectedRadius !== "전체" || selectedCategory !== "전체") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-9 px-3"
              >
                <X className="h-4 w-4 mr-1" />
                초기화
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">필터</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                초기화
              </Button>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-base">위치</h3>
                <div className="space-y-2">
                  {radiusOptions.map((radius) => (
                    <div key={radius} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={radius}
                        name="radius"
                        checked={selectedRadius === radius}
                        onChange={() => setSelectedRadius(radius)}
                        className="w-4 h-4 accent-primary cursor-pointer"
                      />
                      <Label htmlFor={radius} className="text-sm cursor-pointer font-normal">
                        {radius}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-base">카테고리</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={category}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 accent-primary cursor-pointer"
                      />
                      <Label htmlFor={category} className="text-sm cursor-pointer font-normal">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {(isLoading ? Array.from({ length: 8 }).map((_, idx) => ({ id: `skeleton-${idx}` })) : listings).map((listing: any) => (
                <Card
                  key={listing.id}
                  className="overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all cursor-pointer border-border bg-card group"
                  onClick={() => {
                    if (isLoading) return;
                    if (String(listing.id).startsWith("mock-")) {
                      toast.info("임시 데이터입니다. 상세 페이지는 준비 중입니다.");
                      return;
                    }
                    router.push(`/book/${listing.id}`);
                  }}
                >
                  <div className="aspect-[3/4] bg-muted flex items-center justify-center overflow-hidden">
                    <BookOpen className="h-16 w-16 text-muted-foreground/30 group-hover:scale-110 transition-transform" />
                  </div>
                  
                  <div className="p-3 space-y-1">
                    <h3 className="font-semibold line-clamp-1">{isLoading ? "로딩 중" : listing.title}</h3>
                    {!isLoading && (
                      <p className="text-sm text-muted-foreground line-clamp-1">{listing.author}</p>
                    )}
                    <p className="text-lg font-bold text-primary">
                      {isLoading ? "-" : `${listing.price.toLocaleString()}원`}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{isLoading ? "" : (listing.location ?? "")}</span>
                      </div>
                      {!isLoading && (
                        <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                          {listing.condition ?? "-"}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push("/sell")}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-[var(--shadow-hover)] flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform z-40"
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </button>

      <BottomNav />
    </div>
  );
}
