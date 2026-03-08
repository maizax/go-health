'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import type { Answer } from '@/types/question';

export const useQuiz = (brand: string) => {
  const storageKey = `quiz-answers-${brand}`;
  const emptySubscribe = () => () => {};
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const [answers, setAnswers] = useState<Record<string, Answer>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? (JSON.parse(saved) as Record<string, Answer>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(storageKey, JSON.stringify(answers));
  }, [answers, storageKey, isHydrated]);

  const setAnswer = (id: string, answer: Answer) =>
    setAnswers((previousAnswers) => ({ ...previousAnswers, [id]: answer }));

  const clearAnswer = (id: string) =>
    setAnswers((previousAnswers) => {
      const updated = { ...previousAnswers };
      delete updated[id];
      return updated;
    });

  const reset = () => {
    setAnswers({});
    localStorage.removeItem(storageKey);
  };

  return { answers, setAnswer, clearAnswer, reset, isHydrated };
}
