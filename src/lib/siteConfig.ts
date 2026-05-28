const primaryName = process.env.NEXT_PUBLIC_PRIMARY_NAME ?? 'Élixir';
const subName = process.env.NEXT_PUBLIC_SUB_NAME ?? 'de Charlevoix';

export const siteConfig = {
  primaryName,
  subName,
  pageTitle: `${primaryName} | ${subName}`,
};
