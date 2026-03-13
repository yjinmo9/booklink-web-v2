import { postJson } from "@/lib/api";
import { setToken, setUser, type AuthResponse } from "@/lib/auth";
import type { LoginFormData, SignUpFormData } from "../schema";

export async function loginAction(data: LoginFormData) {
  const response = await postJson<AuthResponse>("/api/auth/login", {
    login: data.loginId,
    password: data.password,
  });

  setToken(response.token);
  setUser(response.user);
  return response;
}

export async function signUpAction(data: SignUpFormData) {
  const response = await postJson<AuthResponse>("/api/auth/signup", {
    email: data.email,
    username: data.username,
    nickname: data.nickname || data.username,
    password: data.password,
  });

  setToken(response.token);
  setUser(response.user);
  return response;
}
