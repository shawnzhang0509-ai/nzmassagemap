
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Shop, UserLocation } from '../types';

interface MapComponentProps {
  shops: Shop[];
  center: UserLocation;
  selectedShop: Shop | null;
  onMarkerClick: (shop: Shop) => void;
  userLocation: UserLocation | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  shops, 
  center, 
  selectedShop, 
  onMarkerClick,
  userLocation 
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([center.lat, center.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // Update center when it changes (e.g., location permission granted)
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([center.lat, center.lng]);
    }
  }, [center]);

  // Handle markers and selection
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    shops.forEach(shop => {
      const isSelected = selectedShop?.name === shop.name && selectedShop?.lat === shop.lat;
      
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${isSelected ? 'bg-rose-600 scale-125 transition-transform' : 'bg-rose-400'}">
              <span class="text-white text-[10px] font-bold">SPA</span>
            </div>
            ${isSelected ? '<div class="absolute -bottom-1 w-2 h-2 bg-rose-600 rotate-45"></div>' : ''}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      const marker = L.marker([shop.lat, shop.lng], { icon: customIcon })
        .addTo(mapRef.current!)
        .on('click', () => onMarkerClick(shop));
      
      markersRef.current[`${shop.lat}-${shop.lng}`] = marker;
    });

    if (userLocation && mapRef.current) {
      const userIcon = L.divIcon({
        className: 'user-icon',
        html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md pulse"></div>`,
        iconSize: [16, 16]
      });
      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(mapRef.current);
    }
  }, [shops, selectedShop, userLocation]);

  // Center on selected shop
  useEffect(() => {
    if (selectedShop && mapRef.current) {
      mapRef.current.panTo([selectedShop.lat, selectedShop.lng]);
    }
  }, [selectedShop]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default MapComponent;
