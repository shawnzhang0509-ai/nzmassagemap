import React from 'react';
import ViewModeSwitch from './ViewModeSwitch';
import { useHomeViewMode } from '../contexts/HomeViewModeContext';
import { isBrowseRoute } from '../utils/browseRoutes';
import type { HomeViewMode } from '../utils/homeMapStateStorage';

export interface NavDrawerLink {
  label: string;
  href: string;
  tone?: 'default' | 'accent';
  visible?: boolean;
}

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  links: NavDrawerLink[];
  footer?: React.ReactNode;
}

const NavDrawer: React.FC<NavDrawerProps> = ({
  isOpen,
  onClose,
  pathname,
  links,
  footer,
}) => {
  const { homeViewMode, setHomeViewMode } = useHomeViewMode();
  const showViewModeSwitch = isBrowseRoute(pathname);

  if (!isOpen) return null;

  const handleViewModeChange = (mode: HomeViewMode) => {
    if (mode === homeViewMode) return;
    setHomeViewMode(mode);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="fixed top-0 right-0 z-[10001] flex h-full w-64 flex-col bg-white shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center gap-2 border-b border-gray-100 px-4 pb-3 pt-4">
          {showViewModeSwitch ? (
            <ViewModeSwitch
              className="min-w-0 flex-1"
              value={homeViewMode}
              onChange={handleViewModeChange}
            />
          ) : (
            <span className="flex-1" />
          )}
          <button
            type="button"
            className="shrink-0 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul>
            {links
              .filter((link) => link.visible !== false)
              .map((link) => (
                <li key={link.href + link.label} className="mb-2">
                  <a
                    href={link.href}
                    onClick={onClose}
                    className={`block text-lg font-medium hover:text-gray-600 ${
                      link.tone === 'accent'
                        ? 'text-rose-700 hover:text-rose-600'
                        : 'text-gray-800'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
          </ul>

          {footer ? (
            <div className="mt-6 border-t border-gray-200 pt-4">{footer}</div>
          ) : null}
        </nav>
      </aside>
    </>
  );
};

export default NavDrawer;
