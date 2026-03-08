import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBrand, getQuiz } from '@/lib/api/quiz.api';
import { PageHeader } from '@/components/page-header/page-header';

const BrandLandingPage = async ({ params }: PageProps<'/[brand]'>) => {
  const { brand } = await params;
  const [brandData, quiz] = await Promise.all([getBrand(brand), getQuiz(brand)]);

  if (!brandData || !quiz || quiz.questions.length === 0) notFound();

  const firstQuestion = quiz.questions[0];
  const headline = brandData.landing.headline ?? 'Take the Quiz';
  const subheadline = brandData.landing.subheadline ?? '';
  const ctaLabel = brandData.landing.ctaLabel ?? 'Start';
  const heroSrc = brandData.images.hero ?? null;

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader name={brandData.name ?? 'Quiz App'} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col items-center gap-6 md:gap-8 text-center">
        {heroSrc && (
          <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden">
            <Image
              src={heroSrc}
              alt={headline}
              fill
              sizes="(max-width: 672px) 100vw, 672px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="flex flex-col gap-2 md:gap-3">
          <h1 className="text-2xl md:text-4xl font-bold">{headline}</h1>
          {subheadline && <p className="text-base md:text-lg opacity-70">{subheadline}</p>}
        </div>

        <Link
          href={`/${brand}/quiz/${firstQuestion.id}`}
          className="w-full md:w-auto px-8 py-3 md:py-4 rounded-full font-semibold text-white bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-colors"
        >
          {ctaLabel}
        </Link>
      </main>
    </div>
  );
};

export default BrandLandingPage;
