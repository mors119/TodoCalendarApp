import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="text-xl font-bold">⏳ 로딩 중...</div>}>
      {children}
    </Suspense>
  );
}
