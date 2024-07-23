export interface Property {
  id: number;
  price: number;
  priceStr?: string;
  address: {
    city: string;
    state: string;
    street: string;
  };
  bed: number;
  bath: number;
  sqFt: number;
  imgs: string[];
  seller: {
    name: string;
    phone: string;
  };
  createdBy: string;
  deletable?: boolean;
}
