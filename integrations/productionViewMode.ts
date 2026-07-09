/**
 * Production wiring (Vercel app):
 *
 * 1. Wrap the app root with <HomeViewModeProvider> (next to MinimalistModeProvider).
 * 2. In HomePage, replace local homeViewMode state:
 *      const { homeViewMode: ve, setHomeViewMode: st } = useHomeViewMode();
 *    Remove direct calls to load/save helpers — context persists to nz_home_view_mode_v1.
 * 3. In the side NavDrawer, render <ViewModeSwitch> in the header (this file).
 * 4. Pass pathname so isBrowseRoute() hides the switch on /shop, /articles, etc.
 */
export {};
