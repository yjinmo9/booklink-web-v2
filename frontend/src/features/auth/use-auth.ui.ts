"use client";

import { useState } from "react";
import type { LoginFormData, SignUpFormData } from "./schema";

export const useAuthUI = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  
  // Login State
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    loginId: "",
    password: "",
  });

  // SignUp State
  const [signUpForm, setSignUpForm] = useState<SignUpFormData>({
    username: "",
    nickname: "",
    email: "",
    password: "",
  });

  const updateLoginField = <K extends keyof LoginFormData>(field: K, value: LoginFormData[K]) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateSignUpField = <K extends keyof SignUpFormData>(field: K, value: SignUpFormData[K]) => {
    setSignUpForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    activeTab,
    setActiveTab,
    loginForm,
    signUpForm,
    updateLoginField,
    updateSignUpField,
  };
};
