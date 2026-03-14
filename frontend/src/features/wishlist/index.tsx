"use client";

import { useWishlistController } from "./use-wishlist";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export function WishlistView() {
  const { wishlistItems, loading, toggleLike, goBack } = useWishlistController();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold">관심 도서</h2>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">로딩 중...</div>
          ) : wishlistItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">관심 도서가 없습니다.</div>
          ) : (
            wishlistItems.map((item) => (
              <Card
                key={item.id}
                className="p-4 hover:shadow-[var(--shadow-hover)] transition-all border-border bg-gradient-to-br from-card to-background"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-28 bg-muted rounded flex-shrink-0 cursor-pointer" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 cursor-pointer">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.author}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleLike(item.id)}
                        className="flex-shrink-0"
                      >
                        <Heart className="h-5 w-5 fill-primary text-primary" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-primary">
                        {item.price.toLocaleString()}원
                      </p>
                      <Badge
                        variant={item.status === "판매중" ? "default" : "secondary"}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
