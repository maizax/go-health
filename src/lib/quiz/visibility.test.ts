import { describe, it, expect } from 'vitest';
import { isQuestionVisible, getVisibleQuestions } from './visibility';
import type { Question, Answer } from '@/types/question';

const questionWithoutCondition: Question = {
  id: 'q1',
  type: 'single_choice',
  text: 'Q1',
  options: [{ value: 'yes', label: 'Yes' }],
};

const questionWithSingleCondition: Question = {
  id: 'q2',
  type: 'number',
  text: 'Q2',
  visibleIf: [{ questionId: 'q1', equals: 'yes' }],
};

const questionWithMultipleConditions: Question = {
  id: 'q3',
  type: 'single_choice',
  text: 'Q3',
  options: [{ value: 'a', label: 'A' }],
  visibleIf: [
    { questionId: 'q1', equals: 'yes' },
    { questionId: 'q2', equals: 5 },
  ],
};

describe('isQuestionVisible', () => {
  it('returns true when visibleIf is absent', () => {
    expect(isQuestionVisible(questionWithoutCondition, {})).toBe(true);
  });

  it('returns true when visibleIf is an empty array', () => {
    const question: Question = { ...questionWithoutCondition, visibleIf: [] };
    expect(isQuestionVisible(question, {})).toBe(true);
  });

  it('returns true when the condition matches', () => {
    expect(isQuestionVisible(questionWithSingleCondition, { q1: 'yes' })).toBe(true);
  });

  it('returns false when the condition does not match', () => {
    expect(isQuestionVisible(questionWithSingleCondition, { q1: 'no' })).toBe(false);
  });

  it('returns false when the referenced question has no answer', () => {
    expect(isQuestionVisible(questionWithSingleCondition, {})).toBe(false);
  });

  it('returns true when all conditions match', () => {
    expect(isQuestionVisible(questionWithMultipleConditions, { q1: 'yes', q2: 5 })).toBe(true);
  });

  it('returns false when only some conditions match', () => {
    expect(isQuestionVisible(questionWithMultipleConditions, { q1: 'yes', q2: 3 })).toBe(false);
  });
});

describe('getVisibleQuestions', () => {
  const questions = [
    questionWithoutCondition,
    questionWithSingleCondition,
    questionWithMultipleConditions,
  ];

  it('returns only unconditional questions when no answers given', () => {
    const result = getVisibleQuestions(questions, {});
    expect(result.map((question) => question.id)).toEqual(['q1']);
  });

  it('shows conditional question when its condition is met', () => {
    const answers: Record<string, Answer> = { q1: 'yes' };
    const result = getVisibleQuestions(questions, answers);
    expect(result.map((question) => question.id)).toEqual(['q1', 'q2']);
  });

  it('shows all questions when all conditions are met', () => {
    const answers: Record<string, Answer> = { q1: 'yes', q2: 5 };
    const result = getVisibleQuestions(questions, answers);
    expect(result.map((question) => question.id)).toEqual(['q1', 'q2', 'q3']);
  });

  it('returns all questions when none have visibleIf', () => {
    const flat = [questionWithoutCondition, { ...questionWithoutCondition, id: 'q4' }];
    expect(getVisibleQuestions(flat, {}).length).toBe(2);
  });
});
