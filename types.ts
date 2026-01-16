
export interface Shop {
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  new_girls_last_15_days?: boolean;
  pictures?: string[]; // Base64 or URL
}

export interface UserLocation {
  lat: number;
  lng: number;
}
