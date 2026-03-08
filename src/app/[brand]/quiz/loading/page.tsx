'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const LoadingPage = () => {
  const router = useRouter();
  const { brand } = useParams<{ brand: string }>();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(`/${brand}/quiz/summary`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [brand, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[50vh]">
      <div className="w-16 h-16 rounded-full border-4 border-[var(--brand-secondary)] border-t-[var(--brand-primary)] animate-spin" />
      <p className="text-xl font-medium opacity-70">Preparing your results...</p>
    </div>
  );
};

export default LoadingPage;
