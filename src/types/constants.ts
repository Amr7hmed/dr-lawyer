export type FAQ = {
  key: string;
  question: string;
  answer: string;
};

export type languages = {
  code: string;
  name: string;
  flag: string;
};

export type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export type SpecializationsSubCategory = {
  code: string;
  name: string;
};

export type SpecializationsCategory = {
  code: string;
  name: string;
  children: SpecializationsSubCategory[];
};
