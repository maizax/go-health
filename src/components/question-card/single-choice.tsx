import type { QuestionOption, Answer } from '@/types/question';

type Props = {
  options: QuestionOption[];
  value: string | undefined;
  onChange: (value: Answer) => void;
};

export const SingleChoice = ({ options, value, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-full text-left px-4 py-3 md:px-5 md:py-4 rounded-xl border-2 transition-colors cursor-pointer text-sm md:text-base ${
              isSelected
                ? 'border-[var(--brand-primary)] bg-[var(--brand-secondary)]'
                : 'border-[var(--brand-border)] hover:border-[var(--brand-primary)]'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
