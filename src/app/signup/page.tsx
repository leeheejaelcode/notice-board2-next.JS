"use client";

import Button from "@/component/button";
import StringInput from "@/component/stringInput";
import { signupStore } from "@/store/signupStore.ts";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const checkId = signupStore((s) => s.checkId);
  const checkPhoneNumber = signupStore((s) => s.checkPhoneNumber);
  const signupButtonClick = signupStore((s) => s.signupButtonClick);

  ///////////////////////////////////////////////////////////////////////
  const getEmail = signupStore((s) => s.getEmail);
  const getPassword = signupStore((s) => s.getPassword);
  const getPasswordConfirm = signupStore((s) => s.getPasswordConfirm);
  const getName = signupStore((s) => s.getName);
  const getPhoneNumber = signupStore((s) => s.getPhoneNumber);
  const getVerificationCode = signupStore((s) => s.getVerificationCode);

  const handleSignupButtonClick = async () => {
    const result = await signupButtonClick();
    if (!result) return;
    alert("회원가입에 성공하였습니다");
    router.push("/login");
  };

  return (
    <section>
      <div className="w-[80%] mx-auto pt-[50px]">
        <h1 className="text-[32px] font-bold">회원가입</h1>
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <div className="w-[70%]">
              <StringInput
                label="이메일"
                type="email"
                onChange={getEmail}
                inputId="signupEmail"
              />
            </div>
            <button
              type="button"
              onClick={checkId}
              className="w-[30%] h-[61.33px] rounded-md bg-primary text-white">
              중복확인
            </button>
          </div>
          <div>
            <StringInput
              label="비밀번호"
              type="password"
              onChange={getPassword}
              inputId="signupPassword"
            />
            <p className="opacity-80 text-[12px] mt-1">
              비밀번호는 8자 이상이어야 하며, 영문과 숫자를 포함해야 합니다.
            </p>
          </div>
          <StringInput
            label="비밀번호확인"
            type="password"
            onChange={getPasswordConfirm}
            inputId="signupPasswordConfirm"
          />
          <div>
            <StringInput label="이름" onChange={getName} inputId="signupName" />
            <p className="opacity-80 text-[12px] mt-1">
              이름은 2글자 이상 8글자 이하의 한글, 영문 또는 숫자로
              입력해주세요.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-[80%]">
              <StringInput
                label="전화번호"
                type="text"
                onChange={getPhoneNumber}
                inputId="signupPhoneNumber"
              />
              <p className="opacity-80 text-[12px] mt-1">
                핸드폰 번호는 0으로 시작하는 11자리 숫자로 입력해주세요.
              </p>
            </div>
            <button
              type="button"
              onClick={checkPhoneNumber}
              className="w-[30%] h-[61.33px] rounded-md bg-primary text-white">
              인증하기
            </button>
          </div>
          <StringInput label="인증번호" onChange={getVerificationCode} />
          <Button onClick={handleSignupButtonClick}>회원가입</Button>
        </div>
      </div>
    </section>
  );
}
