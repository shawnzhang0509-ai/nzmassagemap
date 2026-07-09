import React from 'react';
import { LayoutGrid, Map } from 'lucide-react';
import type { HomeViewMode } from '../utils/homeMapStateStorage';

interface ViewModeSwitchProps {
  value: HomeViewMode;
  onChange: (mode: HomeViewMode) => void;
  className?: string;
}

const ViewModeSwitch: React.FC<ViewModeSwitchProps> = ({
  value,
  onChange,
  className = '',
}) => {
  return (
    <div
      role="group"
      aria-label="View mode"
      className={`flex rounded-xl bg-gray-100 p-1 ${className}`.trim()}
    >
      <button
        type="button"
        onClick={() => onChange('map')}
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-bold transition-colors ${
          value === 'map'
            ? 'bg-rose-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-white/70'
        }`}
        aria-pressed={value === 'map'}
        title="Map mode"
      >
        <Map className="h-4 w-4" strokeWidth={2.25} aria-hidden />
        Map
      </button>
      <button
        type="button"
        onClick={() => onChange('gallery')}
        className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-bold transition-colors ${
          value === 'gallery'
            ? 'bg-rose-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-white/70'
        }`}
        aria-pressed={value === 'gallery'}
        title="Gallery mode"
      >
        <LayoutGrid className="h-4 w-4" strokeWidth={2.25} aria-hidden />
        Gallery
      </button>
    </div>
  );
};

export default ViewModeSwitch;
