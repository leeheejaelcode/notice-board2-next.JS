export default function Loading() {
  return (
    <div className="flex flex-row gap-4">
      <div className="w-12 h-12 rounded-full animate-spin border-y border-solid border-cyan-500 border-t-transparent shadow-md" />
    </div>
  );
}

// loading.tsx
// next.js에서 loading.tsx는 react의 Suspense 컴포넌트와 동일합니다
// <Suspense fallback={<div>Loading...</div>}>(page.tsx내용)</Suspense>
