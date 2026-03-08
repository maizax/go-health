'use client';

import { useRouter } from 'next/navigation';
import { useQuiz } from '@/hooks/use-quiz';
import type { Quiz, Question, Answer } from '@/types/question';

type Props = {
  brand: string;
  quiz: Quiz;
};

const getAnswerLabel = (question: Question, answer: Answer): string => {
  if (question.type === 'single_choice') {
    const option = question.options.find((option) => option.value === answer);
    return option?.label ?? String(answer);
  }
  return String(answer);
};

export const SummaryView = ({ brand, quiz }: Props) => {
  const router = useRouter();
  const { answers, reset, isHydrated } = useQuiz(brand);

  if (!isHydrated) return null;

  const answeredQuestions = quiz.questions.filter((question) => answers[question.id] !== undefined);

  const handleStartOver = () => {
    reset();
    router.push(`/${brand}`);
  };

  return (
    <div className="w-full flex flex-col gap-3 md:gap-4">
      {answeredQuestions.length === 0 && <p className="opacity-60">No answers recorded.</p>}

      {answeredQuestions.map((question) => (
        <div
          key={question.id}
          className="bg-[var(--brand-card-bg)] border border-[var(--brand-border)] rounded-xl px-4 py-3 md:px-6 md:py-4 text-left"
        >
          <p className="text-xs md:text-sm opacity-60">{question.text}</p>
          <p className="font-semibold mt-1 text-sm md:text-base">
            {getAnswerLabel(question, answers[question.id])}
          </p>
        </div>
      ))}

      <button
        onClick={handleStartOver}
        className="mt-2 md:mt-4 px-8 py-3 md:py-4 rounded-full font-semibold text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-colors cursor-pointer"
      >
        Start Over
      </button>
    </div>
  );
}
