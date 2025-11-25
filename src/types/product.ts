export interface Product {
  id: string;
  name: string;
  email: string;
  price: number;
  category: string;
  status: 'active' | 'inactive';
  featured: boolean;
  description: string;
  launchDate: Date;
  rating: number;
}

export type ProductFormData = Omit<Product, 'id'>;
