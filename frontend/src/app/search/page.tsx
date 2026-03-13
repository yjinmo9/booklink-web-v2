import { Suspense } from "react";
import { SearchView } from "@/features/search";
import { BookOpen } from "lucide-react";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
          <BookOpen className="h-12 w-12 text-primary animate-pulse" />
          <p className="text-muted-foreground">검색 결과를 준비 중입니다...</p>
        </div>
      }
    >
      <SearchView />
    </Suspense>
  );
}
