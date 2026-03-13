// 인증 유틸리티
// JWT 토큰을 localStorage에 저장하고 관리

const TOKEN_KEY = "booklink_auth_token";
const USER_KEY = "booklink_user";

export interface User {
  id: string;
  email: string;
  username: string;
  nickname: string;
  provider: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// 토큰 저장
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

// 토큰 조회
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

// 토큰 삭제
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// 사용자 정보 저장
export function setUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// 사용자 정보 조회
export function getUser(): User | null {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}

// 인증 상태 확인
export function isAuthenticated(): boolean {
  return getToken() !== null;
}

// Authorization 헤더 값 반환
export function getAuthHeader(): string | null {
  const token = getToken();
  return token ? `Bearer ${token}` : null;
}





