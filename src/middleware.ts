import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // request 타입을 가져옴
import pb from "@/api/pb";

export async function middleware(request: NextRequest) {
  // 1. 요청의 쿠키에서 인증 정보 가져오기
  const cookieHeader: string = request.headers.get("cookie") || "";

  // 2. 쿠키에서 인증 정보를 로드
  pb.authStore.loadFromCookie(cookieHeader);

  // 3. 로드된 인증 정보를 사용하여 현재 로그인한 사용자 정보 확인
  // pb.authStore.model의 작동원리

  // 1. pb.authStore 객체
  // PocketBase에서 authStore는 사용자 인증 정보를 관리하는 역할을 합니다.
  // 인증된 사용자 정보(로그인 상태)와 JWT(JSON Web Token)를 저장하고, 그 정보를 기반으로 인증 관련 작업을 수행할 수 있습니다.
  // authStore는 로그인, 로그아웃, 쿠키에 인증 정보 저장 및 불러오기 등의 기능을 담당합니다.

  // 2. pb.authStore.model 속성
  // pb.authStore.model은 authStore가 가지고 있는 인증된 사용자 정보를 나타냅니다.
  // 사용자가 로그인을 성공적으로 하면, authStore에 해당 사용자의 정보(JWT 포함)가 저장되고, 그 사용자 정보를 model 속성을 통해 접근할 수 있습니다.
  // 로그인된 상태에서는 이 속성이 현재 로그인된 사용자의 데이터를 포함한 객체를 반환합니다.
  // 로그인되지 않은 상태에서는 null 값을 반환합니다.

  // 3. 작동 과정
  // 로그인 시:
  // 사용자가 로그인에 성공하면 PocketBase는 사용자 정보를 받아서 authStore에 저장합니다.
  // 이때, authStore.model에 로그인한 사용자의 정보가 담깁니다.
  // authStore.exportToCookie()와 같은 방법으로 해당 인증 정보를 쿠키에 저장할 수도 있습니다.
  // 인증 후 상태 확인:
  // 서버나 클라이언트에서 pb.authStore.model을 호출하면 현재 로그인된 사용자의 정보가 포함된 객체를 반환합니다.
  // 로그인된 사용자가 없으면 model은 null을 반환합니다.

  const user = pb.authStore.model;
  // 4. 로그인하지 않은 사용자는 write 페이지 접근 불가
  if (request.nextUrl.pathname.startsWith("/write")) {
    if (!user) {
      console.log("로그인하지 않은 사용자, 로그인 페이지로 리다이렉트");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next(); // 로그인된 사용자는 접근 허용
}
