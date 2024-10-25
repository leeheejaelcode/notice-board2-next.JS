"use client";

import Button from "@/component/button";
import { writeStore } from "@/store/writeStore";
import { throttle } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Write() {
  const router = useRouter();

  const getTitle = writeStore((s) => s.getTitle);
  const getContent = writeStore((s) => s.getContent);
  const createPost = writeStore((s) => s.createPost);

  const throttledGetTitle = useCallback(
    throttle((value) => {
      getTitle(value);
    }, 200),
    [getTitle]
  );

  const throttledGetContent = useCallback(
    throttle((value) => {
      getContent(value);
    }, 200),
    [getContent]
  );

  const handleCreatePost = async () => {
    const result = await createPost();
    if (!result) return;
    alert("글 쓰기에 성공하였습니다");
    router.push("/");
  };

  return (
    <section className="w-full mx-auto px-10 flex flex-col justify-center gap-3">
      <h2 className="font-bold text-[20px] py-[10px]">글 작성</h2>
      <div>
        <label htmlFor="title" className="text-[16px] font-bold">
          제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full border border-black rounded-md p-2 focus:outline-primary"
          onChange={(e) => throttledGetTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content" className="text-[16px] font-bold">
          내용
        </label>
        <textarea
          name="content"
          id="content"
          rows={10}
          className="w-full border border-black rounded-md resize-none p-2 focus:outline-primary"
          onChange={(e) => throttledGetContent(e.target.value)}></textarea>
      </div>
      <Button onClick={handleCreatePost}>글 발행</Button>
    </section>
  );
}
