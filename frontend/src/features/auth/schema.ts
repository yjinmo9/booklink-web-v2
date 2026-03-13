import { z } from "zod";

export const loginSchema = z.object({
  loginId: z.string().min(1, { message: "아이디 또는 이메일을 입력해주세요." }),
  password: z.string().min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." }),
});

export const signUpSchema = z.object({
  username: z.string().min(3, { message: "아이디는 3자 이상이어야 합니다." }).max(20),
  nickname: z.string().min(2, { message: "닉네임은 2자 이상이어야 합니다." }).max(20),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z.string().min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
