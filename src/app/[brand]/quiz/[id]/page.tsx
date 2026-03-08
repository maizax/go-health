import { notFound } from 'next/navigation';
import { getBrand, getQuiz } from '@/lib/api/quiz.api';
import { QuestionCard } from '@/components/question-card/question-card';

const QuestionPage = async ({ params }: PageProps<'/[brand]/quiz/[id]'>) => {
  const { brand, id } = await params;
  const [brandData, quiz] = await Promise.all([getBrand(brand), getQuiz(brand)]);

  if (!brandData || !quiz) notFound();

  const question = quiz.questions.find((question) => question.id === id);

  if (!question) notFound();

  return (
    <QuestionCard
      question={question}
      quiz={quiz}
      brand={brand}
      brandName={brandData.name ?? 'Quiz App'}
    />
  );
};

export default QuestionPage;
