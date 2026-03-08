import { notFound, redirect } from 'next/navigation';
import { getBrands } from '@/lib/api/quiz.api';

const RootPage = async () => {
  const brands = await getBrands();
  const defaultBrand = brands[0];

  if (!defaultBrand) return notFound();

  redirect(`/${defaultBrand.id}`);
};

export default RootPage;
