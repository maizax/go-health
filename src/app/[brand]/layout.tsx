import { notFound } from 'next/navigation';
import { getBrand } from '@/lib/api/quiz.api';

const BrandLayout = async ({ children, params }: LayoutProps<'/[brand]'>) => {
  const { brand } = await params;
  const brandData = await getBrand(brand);

  if (!brandData) notFound();

  return (
    <div data-brand={brand} className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)]">
      <div className="max-w-[1440px] mx-auto">{children}</div>
    </div>
  );
};

export default BrandLayout;
