
import React from 'react';
import { MessageCircle, MapPin, Phone } from 'lucide-react';
import { Shop } from '../types';
import { getSMSLink } from '../utils';

interface ShopCardProps {
  shop: Shop;
  isSelected: boolean;
  onClick: () => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, isSelected, onClick }) => {
  const defaultImg = "https://picsum.photos/seed/massage/400/300";
  const mainImg = shop.pictures && shop.pictures.length > 0 ? shop.pictures[0] : defaultImg;

  return (
    <div 
      onClick={onClick}
      className={`flex-shrink-0 w-[280px] bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-300 transform ${
        isSelected ? 'border-rose-500 scale-100' : 'border-transparent scale-95 opacity-90'
      }`}
    >
      <div className="relative h-32 overflow-hidden">
        <img 
          src={mainImg} 
          alt={shop.name} 
          className="w-full h-full object-cover"
        />
        {shop.new_girls_last_15_days && (
          <div className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
            <span>🆕</span>
            <span>NEW ARRIVAL</span>
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900 truncate pr-2">{shop.name}</h3>
        </div>
        
        <div className="flex items-start gap-1.5 text-gray-500 text-xs leading-tight h-8 overflow-hidden">
          <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5 text-rose-400" />
          <p className="line-clamp-2">{shop.address}</p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <a 
            href={getSMSLink(shop.phone, shop.address)}
            className="flex-1 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">Send SMS</span>
          </a>
          <a 
            href={`tel:${shop.phone}`}
            className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-xl text-gray-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
