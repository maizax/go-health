export type BrandImages = {
  logo: string;
  hero: string;
  completion: string;
};

export type BrandLanding = {
  headline: string;
  subheadline: string;
  ctaLabel: string;
};

export type BrandConfig = {
  id: string;
  name: string;
  images: BrandImages;
  landing: BrandLanding;
};
