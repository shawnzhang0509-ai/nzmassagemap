import type { CityPageKind, CityPageMeta, CityPageMetaInput } from './types';

const SITE_NAME = 'NZ Massage Map';
const SITE_URL = 'https://www.nzmassagemap.com';

/**
 * Version A (active): keyword-first — leads with the exact GSC query "escort massage auckland".
 * Version B (alternate): brand-balanced — "Auckland Escort Massage | NZ Massage Map | Photos, Prices & Contact"
 */
export function buildEscortCityMeta({
  cityName,
  regionSlug,
  listingCount,
}: CityPageMetaInput): CityPageMeta {
  const countLabel = `${listingCount} listings`;

  return {
    title: `Escort Massage ${cityName} | ${SITE_NAME} — ${countLabel}`,
    description: `Find escort massage in ${cityName}. Browse ${listingCount} listings with photos, prices, locations and contact numbers on ${SITE_NAME}. Book discreetly today.`,
    h1: `Escort Massage ${cityName}`,
    intro: `Find escort massage providers in ${cityName}. Browse verified profiles with photos, rates, and contact details. Book directly and discreetly.`,
    ogTitle: `Escort Massage ${cityName} | ${SITE_NAME}`,
    ogDescription: `Browse escort massage in ${cityName}. ${listingCount} listings with photos, prices and contact numbers.`,
  };
}

export function buildMassageCityMeta({
  cityName,
  regionSlug,
  listingCount,
}: CityPageMetaInput): CityPageMeta {
  return {
    title: `${cityName} Massage | ${SITE_NAME} | Find Massage Shops in ${cityName}`,
    description: `Browse massage shops in ${cityName}. View photos, prices, contact numbers and book your appointment today. ${listingCount} listings available.`,
    h1: `${cityName} Massage Listings`,
    intro: `Find massage shops and spa services in ${cityName}. Browse listings with photos, prices, and contact details.`,
    ogTitle: `${cityName} Massage | ${SITE_NAME}`,
    ogDescription: `Browse massage shops in ${cityName}. ${listingCount} listings available.`,
  };
}

export function getCityPageMeta(
  kind: CityPageKind,
  input: CityPageMetaInput,
): CityPageMeta {
  return kind === 'escort' ? buildEscortCityMeta(input) : buildMassageCityMeta(input);
}

export function getCityPageCanonical(kind: CityPageKind, regionSlug: string): string {
  return `${SITE_URL}/${kind}/${regionSlug}`;
}

/** Auckland escort pilot — Version A (deploy to /escort/auckland first). */
export const AUCKLAND_ESCORT_META_V_A = buildEscortCityMeta({
  cityName: 'Auckland',
  regionSlug: 'auckland',
  listingCount: 103,
});
