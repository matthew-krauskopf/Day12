export interface Property {
  id: number;
  price: number;
  priceStr: string;
  address: {
    city: string;
    state: string;
    street: string;
  };
  bed: number;
  bath: number;
  sqFt: number;
  img: string;
}
