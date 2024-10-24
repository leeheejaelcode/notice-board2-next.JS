"use client";

import { useId, useState } from "react";
import { throttle } from "lodash";

export default function StringInput({
  isHiddenLabel,
  label,
  inputId,
  type = "text",
  inputClassName,
  isRequired,
  onChange,
}: {
  isHiddenLabel?: boolean;
  label?: string;
  inputId?: string;
  type?: "text" | "number" | "email" | "password";
  inputClassName?: string;
  isRequired?: boolean;
  onChange?: (value: string) => void;
}) {
  // 훅을 항상 호출
  const generatedId = useId();
  // 조건에 따라 id 선택
  const id = inputId ? inputId : generatedId;

  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = throttle((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChange?.(value);
  }, 200);

  const baseLabelClass =
    "absolute left-2 translate-y-[-50%] text-black transition-all ease-in-out duration-300";
  const focusLabelClass = "text-[12px] top-[30%] ";
  const blurLabelClass = "text-[16px] top-[50%] font-bold ";

  const labelClass = isHiddenLabel
    ? "sr-only"
    : `${baseLabelClass} ${
        isFocused || inputValue.length > 0 ? focusLabelClass : blurLabelClass
      }`;

  const inputClass = `p-2 mt-5 focus:outline-none ${inputClassName || ""}`;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div
      className={`flex flex-col border w-full ${
        isFocused ? "border-primary" : "border-black"
      } relative rounded-md overflow-auto`}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        className={inputClass}
        type={type}
        id={id}
        name={id}
        defaultValue={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={isRequired}
      />
    </div>
  );
}
