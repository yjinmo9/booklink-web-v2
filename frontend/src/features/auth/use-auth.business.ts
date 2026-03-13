"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction, signUpAction } from "./actions/auth-actions";
import type { LoginFormData, SignUpFormData } from "./schema";

export const useAuthBusiness = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (form: LoginFormData) => {
    setIsLoading(true);
    try {
      await loginAction(form);
      toast.success("로그인되었습니다!");
      router.push("/marketplace");
    } catch (error: any) {
      const errorMessage = error?.message || "로그인 중 오류가 발생했습니다.";
      if (errorMessage.includes("올바르지 않습니다") || errorMessage.includes("Invalid")) {
        toast.error("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (form: SignUpFormData) => {
    setIsLoading(true);
    try {
      await signUpAction(form);
      toast.success("회원가입이 완료되었습니다!");
      router.push("/marketplace");
    } catch (error: any) {
      const errorMessage = error?.message || "회원가입 중 오류가 발생했습니다.";
      if (errorMessage.includes("이미 가입된") || errorMessage.includes("already")) {
        toast.error("이미 가입된 이메일 또는 사용자명입니다.");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    toast.error("구글 로그인은 아직 구현되지 않았습니다.");
  };

  const handleKakaoLogin = async () => {
    toast.error("카카오 로그인은 아직 구현되지 않았습니다.");
  };

  return {
    isLoading,
    handleSignIn,
    handleSignUp,
    handleGoogleLogin,
    handleKakaoLogin,
  };
};
