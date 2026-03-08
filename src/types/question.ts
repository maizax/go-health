export type Answer = string | number | boolean;

export type VisibleIfCondition = {
  questionId: string;
  equals: Answer;
};

export type QuestionOption = {
  value: string;
  label: string;
};

export type QuestionBase = {
  id: string;
  text: string;
  visibleIf?: VisibleIfCondition[];
};

export type SingleChoiceQuestion = QuestionBase & {
  type: 'single_choice';
  options: QuestionOption[];
};

export type NumberQuestion = QuestionBase & {
  type: 'number';
  validation?: { min?: number; max?: number };
};

export type Question = SingleChoiceQuestion | NumberQuestion;

export type Quiz = {
  quizId: string;
  title: string;
  questions: Question[];
};
