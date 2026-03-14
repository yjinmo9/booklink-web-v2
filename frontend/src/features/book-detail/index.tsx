"use client";

import { useBookDetailController } from "./use-book-detail";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, MessageCircle, Share2, Heart, BookOpen } from "lucide-react";

export function BookDetailView() {
  const {
    bookDetail,
    loading,
    handleContact,
    handleLike,
    handleShare,
    goBack
  } = useBookDetailController();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLike}>
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="overflow-hidden border-border bg-gradient-to-br from-card to-background">
            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
              <BookOpen className="h-24 w-24 text-muted-foreground/30" />
            </div>
          </Card>

          <Card className="p-6 space-y-4 border-border bg-gradient-to-br from-card to-background">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{bookDetail?.title ?? (loading ? "로딩 중" : "-")}</h1>
              <p className="text-lg text-muted-foreground">{bookDetail?.author ?? ""}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium">
                {bookDetail?.condition ?? "-"}
              </span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {bookDetail?.location ?? ""}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-4xl font-bold text-primary">
                {bookDetail ? `${bookDetail.price.toLocaleString()}원` : "-"}
              </p>
            </div>
          </Card>

          <Card className="p-6 space-y-4 border-border bg-gradient-to-br from-card to-background">
            <h2 className="text-xl font-bold">상품 설명</h2>
            <p className="text-muted-foreground leading-relaxed">
              {bookDetail?.description ?? ""}
            </p>
          </Card>

          <Card className="p-6 space-y-4 border-border bg-gradient-to-br from-card to-background">
            <h2 className="text-xl font-bold">판매자 정보</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <span className="text-lg font-bold text-muted-foreground">
                  {(bookDetail?.seller ?? "").slice(0, 1)}
                </span>
              </div>
              <div>
                <p className="font-semibold">{bookDetail?.seller ?? ""}</p>
                <p className="text-sm text-muted-foreground">{bookDetail?.location ?? ""}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border bg-gradient-to-br from-card to-background">
            <div className="flex justify-around text-center">
              <div>
                <p className="text-sm text-muted-foreground">조회</p>
                <p className="text-lg font-bold">-</p>
              </div>
              <div className="border-l border-border" />
              <div>
                <p className="text-sm text-muted-foreground">관심</p>
                <p className="text-lg font-bold">-</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-sm p-4 z-40">
        <div className="container mx-auto max-w-4xl">
          <Button 
            size="lg" 
            className="w-full gap-2"
            onClick={handleContact}
          >
            <MessageCircle className="h-5 w-5" />
            판매자에게 연락하기
          </Button>
        </div>
      </div>
    </div>
  );
}
