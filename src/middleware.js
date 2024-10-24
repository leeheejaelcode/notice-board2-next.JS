import { NextResponse } from "next/server";
import pb from "@/api/pb";

export async function middleware(request) {
  // 요청 쿠키에서 'pb_auth' 추출 및 authStore에 로드
  const cookieHeader = request.headers.get("cookie") || "";

  pb.authStore.loadFromCookie(cookieHeader);

  // 인증 정보를 기반으로 사용자를 확인
  const user = pb.authStore.model;
  console.log(user);
  // 만약 사용자가 로그인이 되어 있지 않으면 /login 페이지로 리다이렉트
  if (request.nextUrl.pathname.startsWith("/write")) {
    if (!user) {
      console.log("로그인하지 않은 사용자, 로그인 페이지로 리다이렉트");
      return NextResponse.redirect(
        new URL("/login", request.url) // 로그인 페이지로 리다이렉트
      );
    }
  }

  // 요청을 계속 처리
  return NextResponse.next();
}
