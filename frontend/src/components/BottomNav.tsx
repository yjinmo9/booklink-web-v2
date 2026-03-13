"use client";

// 앱 하단 고정 내비게이션 바
// - 현재 경로와 비교하여 활성 탭에 강조 스타일 적용
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // 내비게이션 항목 정의: 경로, 아이콘, 라벨
  const navItems = [
    { path: "/", icon: Search, label: "검색" },
    { path: "/marketplace", icon: ShoppingBag, label: "중고거래" },
    { path: "/mypage", icon: User, label: "마이페이지" },
  ];

  // 현재 경로와 일치 여부
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-all ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon
                  className={`h-6 w-6 transition-all ${
                    active ? "scale-110" : ""
                  }`}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span className={`text-xs font-medium ${active ? "text-primary" : ""}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
