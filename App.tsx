
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, Plus, Navigation, Filter } from 'lucide-react';
import Header from './components/Header';
import MapComponent from './components/MapComponent';
import ShopCard from './components/ShopCard';
import AdminPanel from './components/AdminPanel';
import NavDrawer from './components/NavDrawer';
import { useHomeViewMode } from './contexts/HomeViewModeContext';
import { Shop, UserLocation } from './types';
import { DEFAULT_SHOPS, NZ_CENTER } from './constants';
import { calculateDistance } from './utils';

const STORAGE_KEY = 'nz_massage_shops_v1';

const App: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [useNearbyFilter, setUseNearbyFilter] = useState(false);
  const [radiusKm, setRadiusKm] = useState(10);
  const [menuOpen, setMenuOpen] = useState(false);
  const { homeViewMode } = useHomeViewMode();
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Load initial data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setShops(JSON.parse(saved));
    } else {
      setShops(DEFAULT_SHOPS);
    }
  }, []);

  // Save to localStorage whenever shops change
  useEffect(() => {
    if (shops.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shops));
    }
  }, [shops]);

  // Request user location
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLocation(loc);
          setUseNearbyFilter(true);
        },
        () => {
          alert("Location access denied. Showing all shops.");
        }
      );
    }
  };

  // Compute filtered shops
  const filteredShops = useMemo(() => {
    if (useNearbyFilter && userLocation) {
      return shops.filter(shop => {
        const dist = calculateDistance(userLocation, { lat: shop.lat, lng: shop.lng });
        return dist <= radiusKm;
      });
    }
    return shops;
  }, [shops, useNearbyFilter, userLocation, radiusKm]);

  // Initial shop selection
  useEffect(() => {
    if (filteredShops.length > 0 && !selectedShop) {
      setSelectedShop(filteredShops[0]);
    }
  }, [filteredShops]);

  const handleAddShop = (newShop: Shop) => {
    setShops([newShop, ...shops]);
    setShowAdmin(false);
    setSelectedShop(newShop);
  };

  const handleSelectShop = (shop: Shop) => {
    setSelectedShop(shop);
    // Find index in horizontal list and scroll there
    const index = filteredShops.findIndex(s => s.name === shop.name && s.lat === shop.lat);
    if (index !== -1 && scrollContainerRef.current) {
      const cardWidth = 280 + 16; // width + gap
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative h-screen w-full bg-gray-50 flex flex-col overflow-hidden">
      <Header />

      {/* Main Map Area - Full screen background logic */}
      <div className="flex-1 relative mt-14">
        <MapComponent 
          shops={filteredShops} 
          center={userLocation || NZ_CENTER} 
          selectedShop={selectedShop}
          userLocation={userLocation}
          onMarkerClick={handleSelectShop}
        />

        {/* Floating Controls */}
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-3 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <button 
            onClick={requestLocation}
            className={`p-3 rounded-full shadow-lg transition-all ${userLocation ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
          >
            <Navigation className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => setShowAdmin(true)}
            className="p-3 bg-white text-rose-500 rounded-full shadow-lg hover:bg-rose-50 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setUseNearbyFilter(!useNearbyFilter)}
            className={`p-3 rounded-full shadow-lg transition-all ${useNearbyFilter ? 'bg-green-500 text-white' : 'bg-white text-gray-600'}`}
          >
            <Filter className="w-6 h-6" />
          </button>
        </div>

        {/* Proximity Slider (Conditional) */}
        {useNearbyFilter && userLocation && (
          <div className="absolute top-4 left-4 right-20 z-[999]">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl flex items-center gap-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest min-w-[30px]">Range</span>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={radiusKm} 
                onChange={(e) => setRadiusKm(parseInt(e.target.value))}
                className="flex-1 accent-rose-500"
              />
              <span className="text-sm font-bold text-rose-600 whitespace-nowrap">{radiusKm}km</span>
            </div>
          </div>
        )}

        {/* Bottom Horizontal Card Overlay */}
        <div className="absolute bottom-8 left-0 right-0 z-[999]">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 px-6 pb-6 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          >
            {filteredShops.length > 0 ? (
              filteredShops.map((shop, idx) => (
                <div key={`${shop.lat}-${shop.lng}-${idx}`} className="snap-center">
                  <ShopCard 
                    shop={shop} 
                    isSelected={selectedShop?.name === shop.name && selectedShop?.lat === shop.lat}
                    onClick={() => handleSelectShop(shop)}
                  />
                </div>
              ))
            ) : (
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full mx-4 text-center">
                <p className="text-gray-500 font-medium">No shops found in this area.</p>
                <button 
                  onClick={() => setUseNearbyFilter(false)}
                  className="mt-2 text-rose-500 text-sm font-bold underline"
                >
                  Show all shops
                </button>
              </div>
            )}
            {/* Spacer for horizontal scrolling */}
            <div className="flex-shrink-0 w-2" />
          </div>
        </div>
      </div>

      {/* Admin Panel Modal */}
      {showAdmin && (
        <AdminPanel 
          onAddShop={handleAddShop} 
          onClose={() => setShowAdmin(false)} 
        />
      )}

      <NavDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname="/massage/auckland"
        links={[
          { label: 'Home', href: '/' },
          { label: 'Browse by region', href: '/massage' },
          { label: 'Escort by region', href: '/escort', tone: 'accent' },
          { label: 'About Us', href: '/about', tone: 'accent' },
        ]}
        footer={
          <p className="text-xs text-gray-500">
            View mode: <span className="font-semibold text-gray-700">{homeViewMode}</span>
          </p>
        }
      />
    </div>
  );
};

export default App;
