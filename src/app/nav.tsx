"use client";

import pb from "@/api/pb";
import { mainStore } from "@/store/mainStore";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const isLoggedIn = mainStore((s) => s.isLoggedIn);
  const updateIsLoggedIn = mainStore((s) => s.updateIsLoggedIn);

  const logoutButton = () => {
    const result = confirm("로그아웃 하시겠습니까?");
    if (!result) return;
    pb.authStore.clear();
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    updateIsLoggedIn();
  };

  return (
    <header>
      <nav className="flex items-center gap-4 p-4 border-b border-solid border-black font-semibold">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={50} height={50} priority />
        </Link>
        {isLoggedIn ? (
          <>
            <Link href="/write">NEW</Link>
            <button type="button" className="ml-auto" onClick={logoutButton}>
              LOGOUT
            </button>
          </>
        ) : (
          <Link href="/login" className="ml-auto">
            LOGIN
          </Link>
        )}
      </nav>
    </header>
  );
}
