import type { Answer, Question } from '@/types/question';

export const isQuestionVisible = (question: Question, answers: Record<string, Answer>): boolean => {
  if (!question.visibleIf || question.visibleIf.length === 0) return true;

  return question.visibleIf.every(
    (condition) => answers[condition.questionId] === condition.equals,
  );
};

export const getVisibleQuestions = (
  questions: Question[],
  answers: Record<string, Answer>,
): Question[] => questions.filter((question) => isQuestionVisible(question, answers));
