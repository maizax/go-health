type Props = {
  validation?: { min?: number; max?: number };
  value: number | undefined;
  onChange: (value: number | undefined) => void;
};

export const NumberInput = ({ validation, value, onChange }: Props) => (
  <input
    type="number"
    min={validation?.min}
    max={validation?.max}
    value={value ?? ''}
    onChange={(event) => {
      const num = event.target.valueAsNumber;
      onChange(isNaN(num) ? undefined : num);
    }}
    className="w-full px-4 py-3 md:px-5 md:py-4 rounded-xl border-2 border-[var(--brand-border)] focus:outline-none focus:border-[var(--brand-primary)] bg-transparent text-base md:text-lg"
    placeholder="Enter a number..."
  />
);
