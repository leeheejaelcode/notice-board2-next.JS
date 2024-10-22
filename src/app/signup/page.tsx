import StringInput from "@/component/stringInput";

export default function Signup() {
  return (
    <section>
      <div className="w-[80%] mx-auto pt-[50px]">
        <h1 className="text-[32px]">회원가입</h1>
        <div className="flex flex-col gap-3">
          <StringInput label="아이디" />
          <StringInput label="비밀번호" type="password" />
          <StringInput label="이름" />
          <div className="flex gap-4">
            <StringInput
              label="전화번호"
              type="text"
              inputClassName="w-[80%]"
            />
            <button
              type="button"
              className="w-[30%] rounded-md bg-primary text-white">
              전화번호 인증
            </button>
          </div>
          <button className="p-4 bg-primary text-white rounded-md">
            회원가입
          </button>
        </div>
      </div>
    </section>
  );
}
