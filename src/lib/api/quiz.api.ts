import type { Quiz } from '@/types/question';
import type { BrandConfig } from '@/types/brand';
import type { Submission } from '@/types/submission';

const BASE_URL = process.env.API_URL;

export const getBrands = async (): Promise<BrandConfig[]> => {
  const res = await fetch(`${BASE_URL}/brands`);
  if (!res.ok) throw new Error('Failed to fetch brands');
  return res.json();
};

export const getBrand = async (brandId: string): Promise<BrandConfig | null> => {
  const res = await fetch(`${BASE_URL}/brands/${brandId}`);
  if (!res.ok) return null;
  return res.json();
};

export const getQuiz = async (brandId: string): Promise<Quiz | null> => {
  const res = await fetch(`${BASE_URL}/quizzes?brand=${brandId}`);
  if (!res.ok) return null;
  const quizzes = await res.json();
  return quizzes[0] ?? null;
};

export const submitQuiz = async (submission: Submission): Promise<void> => {
  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  });
  if (!res.ok) throw new Error('Failed to submit quiz');
};
