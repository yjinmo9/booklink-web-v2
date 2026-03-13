"use client";

import { useAuth } from "./use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Loader2, X } from "lucide-react";

export function AuthView() {
  const {
    isLoading,
    loginForm,
    signUpForm,
    updateLoginField,
    updateSignUpField,
    onLoginSubmit,
    onSignUpSubmit,
    handleGoogleLogin,
    handleKakaoLogin,
    onGoBack,
    activeTab,
    setActiveTab,
  } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onGoBack}
          className="absolute top-4 right-4"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">중고책 마켓</h1>
          <p className="text-muted-foreground text-center">로그인하여 중고책을 거래하세요</p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as "login" | "signup")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">로그인</TabsTrigger>
            <TabsTrigger value="signup">회원가입</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={onLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-id">아이디</Label>
                <Input
                  id="login-id"
                  type="text"
                  placeholder="사용자 아이디"
                  value={loginForm.loginId}
                  onChange={(e) => updateLoginField("loginId", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">비밀번호</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => updateLoginField("password", e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    로그인 중...
                  </>
                ) : (
                  "로그인"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={onSignUpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-username">아이디</Label>
                <Input
                  id="signup-username"
                  type="text"
                  placeholder="사용자 아이디"
                  value={signUpForm.username}
                  onChange={(e) => updateSignUpField("username", e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={3}
                  maxLength={20}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-nickname">닉네임</Label>
                <Input
                  id="signup-nickname"
                  type="text"
                  placeholder="닉네임"
                  value={signUpForm.nickname}
                  onChange={(e) => updateSignUpField("nickname", e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={2}
                  maxLength={20}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">이메일</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="example@email.com"
                  value={signUpForm.email}
                  onChange={(e) => updateSignUpField("email", e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">비밀번호</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signUpForm.password}
                  onChange={(e) => updateSignUpField("password", e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">최소 6자 이상 입력해주세요</p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    가입 중...
                  </>
                ) : (
                  "회원가입"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">또는</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            구글로 시작하기
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-[#FEE500] hover:bg-[#FEE500]/90 text-black border-[#FEE500]"
            onClick={handleKakaoLogin}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.553 1.676 4.786 4.201 6.166-.205.752-.634 2.392-.723 2.76-.107.443.162.437.342.317.145-.096 2.363-1.557 3.327-2.193.609.085 1.23.128 1.853.128 5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
            </svg>
            카카오로 시작하기
          </Button>
        </div>
      </Card>
    </div>
  );
}
