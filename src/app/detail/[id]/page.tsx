"use client";

import { getOneById } from "@/api/CRUD";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import { RecordModel } from "pocketbase";
import React, { useEffect, useState } from "react";

export default function Detail() {
  const [data, setData] = useState<RecordModel | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const result = await getOneById("noticeBoard", id.toString());
          if (result) {
            setData(result);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false); // 데이터 로딩 완료 후 로딩 상태 변경
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <div>데이터가 없습니다.</div>; // 데이터가 없을 경우
  }

  return (
    <section className="w-full mx-auto px-10 flex flex-col justify-center gap-3">
      <h2 className="font-bold text-[20px] py-[10px] border-b border-black">
        {data.title}
      </h2>
      <p className="text-[14px] text-right">
        작성일: {data.created.slice(0, 10)}
      </p>
      <p>{data.content}</p>
    </section>
  );
}

// props: 컴포넌트가 부모로부터 받는 값으로, 일반적으로 동기적으로 전달됩니다. 예를 들어, 일반적인 React 컴포넌트에서 부모가 자식에게 props를 전달할 때는 비동기 처리가 필요 없습니다.

// params: Next.js의 App Router에서 동적 라우팅을 사용할 때 params 객체는 비동기로 처리해야 하며, 이 객체는 요청이 들어올 때 동적으로 생성됩니다. 이 때문에 await 키워드를 사용하여 값을 가져와야 합니다.
