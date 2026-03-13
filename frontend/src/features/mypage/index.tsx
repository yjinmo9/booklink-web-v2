"use client";

import { useMyPageController } from "./use-mypage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, Heart, ShoppingBag, Book, ChevronRight, LogOut } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export function MyPageView() {
  const {
    user,
    salesCount,
    purchaseCount,
    wishlistCount,
    myListings,
    handleLogout,
    navigateTo,
  } = useMyPageController();

  const menuItems = [
    { icon: ShoppingBag, label: "판매 내역", count: salesCount, path: "/mypage/sales" },
    { icon: Book, label: "구매 내역", count: purchaseCount, path: "/mypage/purchases" },
    { icon: Heart, label: "관심 도서", count: wishlistCount, path: "/mypage/wishlist" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">마이페이지</h2>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-6 border-border bg-gradient-to-br from-card to-background">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-2xl font-bold">
                  {user ? user.nickname?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase() || "?" : "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">
                  {user ? user.nickname || user.username : "게스트"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {user?.email || "로그인이 필요합니다"}
                </p>
              </div>
              {!user ? (
                <Button variant="outline" onClick={() => navigateTo("/auth")}>
                  로그인
                </Button>
              ) : (
                <Button variant="outline" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              )}
            </div>
          </Card>

          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="p-4 flex items-center justify-between cursor-pointer hover:shadow-[var(--shadow-hover)] transition-all border-border bg-gradient-to-br from-card to-background"
                  onClick={() => navigateTo(item.path)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">최근 등록한 책</h3>
            <div className="space-y-3">
              {myListings.map((listing, index) => (
                <Card
                  key={index}
                  className="p-4 flex items-center gap-4 hover:shadow-[var(--shadow-hover)] transition-all cursor-pointer border-border bg-gradient-to-br from-card to-background"
                >
                  <div className="w-12 h-16 bg-muted rounded flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold">{listing.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {listing.price.toLocaleString()}원
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      listing.status === "판매중"
                        ? "bg-accent/10 text-accent"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {listing.status}
                  </span>
                </Card>
              ))}
              {myListings.length === 0 && (
                <div className="text-sm text-muted-foreground">최근 등록한 도서가 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
