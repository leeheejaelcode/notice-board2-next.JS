"use client";

import pb from "@/api/pb";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [loggedIn, setLoggedIn] = useState(!!pb.authStore.model); // 초기 상태 설정

  useEffect(() => {
    // 로그인 상태가 변경될 때마다 상태를 업데이트
    const updateLoginStatus = () => {
      setLoggedIn(!!pb.authStore.model);
    };
    updateLoginStatus();
    // 이벤트 리스너 등록
    pb.authStore.onChange(updateLoginStatus);
  }, []);

  const logoutButton = () => {
    const result = confirm("로그아웃 하시겠습니까?");
    if (!result) return;
    pb.authStore.clear();
    setLoggedIn(false);
  };

  return (
    <header>
      <nav className="flex items-center gap-4 p-4 border-b border-solid border-black font-semibold">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={50} height={50} priority />
        </Link>
        <Link href="/write">NEW</Link>
        {loggedIn ? (
          <button type="button" className="ml-auto" onClick={logoutButton}>
            LOGOUT
          </button>
        ) : (
          <Link href="/login" className="ml-auto">
            LOGIN
          </Link>
        )}
      </nav>
    </header>
  );
}
