import type { Answer } from './question';

export type Submission = {
  brand: string;
  answers: Record<string, Answer>;
  completedAt: string;
};
