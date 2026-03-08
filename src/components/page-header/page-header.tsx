export const PageHeader = ({ name }: { name: string }) => {
  return (
    <header className="flex items-center justify-center px-4 py-3 md:px-8 md:py-4 border-b border-[var(--brand-border)]">
      <span className="text-lg md:text-xl font-bold text-[var(--brand-primary)]">{name}</span>
    </header>
  );
};
