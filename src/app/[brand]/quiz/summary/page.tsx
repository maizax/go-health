import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBrand, getQuiz } from '@/lib/api/quiz.api';
import { SummaryView } from '@/components/summary-view/summary-view';
import { PageHeader } from '@/components/page-header/page-header';

const SummaryPage = async ({ params }: PageProps<'/[brand]/quiz/summary'>) => {
  const { brand } = await params;
  const [brandData, quiz] = await Promise.all([getBrand(brand), getQuiz(brand)]);

  if (!brandData || !quiz) notFound();

  const completionSrc = brandData.images.completion ?? null;

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader name={brandData.name ?? 'Quiz App'} />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col items-center gap-6 md:gap-8 text-center">
        {completionSrc && (
          <div className="relative w-full h-40 md:h-48 rounded-2xl overflow-hidden">
            <Image
              src={completionSrc}
              alt="Quiz complete"
              fill
              sizes="(max-width: 672px) 100vw, 672px"
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-2xl md:text-3xl font-bold">You&apos;re all done!</h1>
        <p className="opacity-70 text-sm md:text-base">Here&apos;s a summary of your answers.</p>
        <SummaryView brand={brand} quiz={quiz} />
      </main>
    </div>
  );
};

export default SummaryPage;
