export type CityPageKind = 'escort' | 'massage';

export interface CityPageMeta {
  title: string;
  description: string;
  h1: string;
  intro: string;
  ogTitle: string;
  ogDescription: string;
}

export interface CityPageMetaInput {
  cityName: string;
  regionSlug: string;
  listingCount: number;
}
