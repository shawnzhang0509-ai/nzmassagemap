
import React from 'react';
import { MapPin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex items-center gap-2">
      <div className="bg-rose-500 p-1.5 rounded-lg">
        <MapPin className="text-white w-5 h-5" />
      </div>
      <h1 className="text-lg font-bold tracking-tight text-gray-800">
        New Zealand Massage Map
      </h1>
    </header>
  );
};

export default Header;
