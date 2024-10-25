"use client";

import { throttle } from "lodash";

export default function Button({
  children,
  type = "button",
  className,
  onClick,
}: Readonly<{
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
}>) {
  const handleClick = throttle(() => {
    onClick?.();
  }, 200);

  return (
    <button
      type={type}
      className={`p-2 bg-primary text-white rounded-md ${className}`}
      onClick={() => {
        handleClick();
      }}>
      {children}
    </button>
  );
}
