'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/hooks/use-quiz';
import { getVisibleQuestions } from '@/lib/quiz/visibility';
import Image from 'next/image';
import { submitQuiz } from '@/lib/api/quiz.api';
import { SingleChoice } from './single-choice';
import { NumberInput } from './number-input';
import type { Quiz, Question } from '@/types/question';

type Props = {
  quiz: Quiz;
  question: Question;
  brand: string;
  brandName: string;
  logoSrc: string | null;
};

export const QuestionCard = ({ quiz, question, brand, brandName, logoSrc }: Props) => {
  const router = useRouter();
  const { answers, setAnswer, clearAnswer, isHydrated } = useQuiz(brand);
  const visibleQuestions = getVisibleQuestions(quiz.questions, answers);
  const currentIndex = visibleQuestions.findIndex(({ id }) => id === question.id);
  const isLast = currentIndex === visibleQuestions.length - 1;
  const currentAnswer = answers[question.id];
  const isAnswerValid = (() => {
    if (currentAnswer === undefined) return false;
    if (question.type === 'number' && question.validation) {
      const number = currentAnswer as number;
      const { min, max } = question.validation;
      return (min === undefined || number >= min) && (max === undefined || number <= max);
    }
    return true;
  })();

  useEffect(() => {
    if (!isHydrated || currentIndex !== -1) return;
    const firstId = visibleQuestions[0]?.id;
    if (firstId) router.replace(`/${brand}/quiz/${firstId}`);
  }, [isHydrated, currentIndex]);

  const handleNumberAnswer = (value: number | undefined) =>
    value === undefined ? clearAnswer(question.id) : setAnswer(question.id, value);

  const handleBack = () => {
    if (currentIndex === 0) {
      router.push(`/${brand}`);
    } else {
      const previousQuestion = visibleQuestions[currentIndex - 1];
      router.push(`/${brand}/quiz/${previousQuestion.id}`);
    }
  };

  const handleNext = () => {
    if (isLast) {
      submitQuiz({ brand, answers, completedAt: new Date().toISOString() }).catch(() => {});
      router.push(`/${brand}/quiz/loading`);
    } else {
      router.push(`/${brand}/quiz/${visibleQuestions[currentIndex + 1].id}`);
    }
  };

  if (!isHydrated) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4 border-b border-[var(--brand-border)]">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-sm md:text-base text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)] hover:bg-[var(--brand-secondary)] px-2 py-1 rounded-md transition-colors cursor-pointer"
        >
          <span>&lt; Back</span>
        </button>

        <button
          onClick={() => router.push(`/${brand}`)}
          className="flex items-center justify-center cursor-pointer"
          aria-label="Go to home page"
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={brandName}
              width={128}
              height={36}
              className="h-7 md:h-9 w-auto object-contain"
              priority
            />
          ) : (
            <span className="font-bold text-[var(--brand-primary)] text-base md:text-lg">
              {brandName}
            </span>
          )}
        </button>

        <span className="text-sm md:text-base opacity-60 tabular-nums">
          {currentIndex + 1} of {visibleQuestions.length}
        </span>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 md:py-10 flex flex-col gap-5 md:gap-8">
        <div className="bg-[var(--brand-card-bg)] border border-[var(--brand-border)] rounded-2xl p-5 md:p-8 flex flex-col gap-4 md:gap-6">
          <h2 className="text-xl md:text-2xl font-semibold">{question.text}</h2>

          {question.type === 'single_choice' && (
            <SingleChoice
              options={question.options}
              value={currentAnswer as string | undefined}
              onChange={(value) => setAnswer(question.id, value)}
            />
          )}

          {question.type === 'number' && (
            <NumberInput
              validation={question.validation}
              value={currentAnswer as number | undefined}
              onChange={handleNumberAnswer}
            />
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={!isAnswerValid}
          className="w-full md:w-auto md:self-end px-8 py-3 md:py-4 rounded-full font-semibold text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLast ? 'Submit' : 'Continue'}
        </button>
      </div>
    </div>
  );
};
