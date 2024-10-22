import StringInput from "@/component/stringInput";
import Link from "next/link";

export default function Login() {
  return (
    <section>
      <div className="w-[80%] mx-auto pt-[50px]">
        <h1 className="text-[32px] font-bold">로그인</h1>
        <div className="flex flex-col gap-3">
          <StringInput label="아이디" />
          <StringInput label="비밀번호" type="password" />
          <button className="p-4 bg-primary text-white rounded-md">
            로그인
          </button>
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
