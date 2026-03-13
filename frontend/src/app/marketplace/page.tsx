import { Suspense } from "react";
import { MarketplaceView } from "@/features/marketplace";
import { BookOpen } from "lucide-react";

export default function MarketplacePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
          <BookOpen className="h-12 w-12 text-primary animate-pulse" />
          <p className="text-muted-foreground">목록을 준비 중입니다...</p>
        </div>
      }
    >
      <MarketplaceView />
    </Suspense>
  );
}
