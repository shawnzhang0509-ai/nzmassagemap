
import { Shop } from './types';

export const ADMIN_PASSWORD = 'admin'; // For demo purposes

export const DEFAULT_SHOPS: Shop[] = [
  {
    name: "268 Neilson Street",
    address: "268 Neilson Street, Onehunga, Auckland 1061, New Zealand",
    lat: -36.9245,
    lng: 174.7830,
    phone: "0210000001",
    new_girls_last_15_days: true,
    pictures: ["https://picsum.photos/seed/shop1/400/300"]
  },
  {
    name: "Zen Oasis Spa",
    address: "15 Customs Street East, Auckland CBD, Auckland 1010",
    lat: -36.8445,
    lng: 174.7675,
    phone: "0210000002",
    new_girls_last_15_days: false,
    pictures: ["https://picsum.photos/seed/shop2/400/300"]
  },
  {
    name: "Aotea Wellness",
    address: "290 Queen Street, Auckland CBD, Auckland 1010",
    lat: -36.8509,
    lng: 174.7645,
    phone: "0210000003",
    new_girls_last_15_days: true,
    pictures: ["https://picsum.photos/seed/shop3/400/300"]
  }
];

export const NZ_CENTER = { lat: -36.8485, lng: 174.7633 }; // Auckland Center
