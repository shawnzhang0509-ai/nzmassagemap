const BROWSE_REGION_SLUGS = new Set([
  'auckland',
  'central-north-island',
  'central-nth-island',
  'tauranga',
  'northland',
  'hamilton',
  'wellington',
  'christchurch',
  'south-island',
]);

/** Routes where map/gallery view mode applies (matches production browse pages). */
export function isBrowseRoute(pathname: string): boolean {
  if (
    pathname === '/' ||
    pathname === '/massage' ||
    pathname === '/escort' ||
    pathname.startsWith('/massage/') ||
    pathname.startsWith('/escort/') ||
    pathname.startsWith('/badge/') ||
    pathname.startsWith('/min-spend/')
  ) {
    return true;
  }

  const segment = pathname.replace(/\/$/, '').split('/').filter(Boolean)[0];
  return !!(
    segment &&
    BROWSE_REGION_SLUGS.has(segment) &&
    pathname.split('/').filter(Boolean).length === 1
  );
}
