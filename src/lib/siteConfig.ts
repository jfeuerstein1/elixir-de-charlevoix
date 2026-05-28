const primaryName = process.env.NEXT_PUBLIC_PRIMARY_NAME ?? 'Élixir';
const subName = process.env.NEXT_PUBLIC_SUB_NAME ?? 'de Charlevoix';
const isNewSite = !!process.env.NEXT_PUBLIC_PRIMARY_NAME;

export const siteConfig = {
  primaryName,
  subName,
  pageTitle: `${primaryName} | ${subName}`,
  uppercase: true,
  bottleImage: process.env.NEXT_PUBLIC_BOTTLE_IMAGE ?? null,
};
