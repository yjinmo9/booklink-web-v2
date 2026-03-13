"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { useAuthUI } from "./use-auth.ui";
import { useAuthBusiness } from "./use-auth.business";

export const useAuth = () => {
  const router = useRouter();
  const ui = useAuthUI();
  const business = useAuthBusiness();

  // Redirect to marketplace if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/marketplace");
    }
  }, [router]);

  // Form submission wrappers
  const onLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    business.handleSignIn(ui.loginForm);
  };

  const onSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    business.handleSignUp(ui.signUpForm);
  };

  const onGoBack = () => {
    router.push("/marketplace");
  };

  return {
    ...ui,
    ...business,
    onLoginSubmit,
    onSignUpSubmit,
    onGoBack,
  };
};
