// Tailwind 클래스 유틸리티
// - clsx로 조건부 클래스 처리 후 tailwind-merge로 충돌 정리
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
