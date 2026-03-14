"use client";

import { useSalesHistoryController } from "./use-sales-history";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export function SalesHistoryView() {
  const { salesData, loading, goBack } = useSalesHistoryController();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold">판매 내역</h2>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {(loading ? Array.from({ length: 6 }).map((_, i) => ({ id: `s-${i}`, title: "로딩 중", author: null, price: 0, status: "판매중", date: "" })) : salesData).map((item) => (
            <Card
              key={item.id}
              className="p-4 hover:shadow-[var(--shadow-hover)] transition-all cursor-pointer border-border bg-gradient-to-br from-card to-background"
            >
              <div className="flex gap-4">
                <div className="w-20 h-28 bg-muted rounded flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.author ?? ""}</p>
                    </div>
                    <Badge
                      variant={item.status === "판매중" ? "default" : "secondary"}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">
                      {item.price ? `${item.price.toLocaleString()}원` : "-"}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
