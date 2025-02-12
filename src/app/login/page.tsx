"use client";

import StringInput from "@/component/stringInput";
import { loginStore } from "@/store/loginStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import pb from "@/api/pb";
import { mainStore } from "@/store/mainStore";
import Button from "@/component/button";

export default function Login() {
  const router = useRouter();

  const getEmail = loginStore((s) => s.getEmail);
  const getPassword = loginStore((s) => s.getPassword);
  const loginButtonClick = loginStore((s) => s.loginButtonClick);

  const updateIsLoggedIn = mainStore((s) => s.updateIsLoggedIn);

  const loginButton = async () => {
    const result = await loginButtonClick();
    if (!result) return;
    document.cookie = pb.authStore.exportToCookie({
      httpOnly: false,
    });
    updateIsLoggedIn();
    alert("로그인에 성공하였습니다.");
    router.push("/");
  };

  return (
    <section>
      <div className="w-[80%] mx-auto pt-[50px]">
        <h1 className="text-[32px] font-bold">로그인</h1>
        <div className="flex flex-col gap-3">
          <StringInput
            label="이메일"
            type="email"
            inputId="loginEmail"
            onChange={getEmail}
          />
          <StringInput
            label="비밀번호"
            type="password"
            inputId="loginPassword"
            onChange={getPassword}
          />
          <Button onClick={loginButton}>로그인</Button>
          <Link
            href="/signup"
            className="text-center text-sm font-semibold text-gray-600">
            회원가입
          </Link>
        </div>
      </div>
    </section>
  );
}
