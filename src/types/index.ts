export type BeanType = '手冲' | '意式' | '冷萃' | '其他';

export const BEAN_TYPES: BeanType[] = ['手冲', '意式', '冷萃', '其他'];

export interface CoffeeNote {
  id: string;
  shopName: string;
  city: string;
  beanType: BeanType;
  rating: number;
  feelings: string;
  image?: string;
  createdAt: string;
}

export type FilterTag = '全部' | BeanType;

export const ALL_FILTER_TAGS: FilterTag[] = ['全部', ...BEAN_TYPES];

export interface ShopInfo {
  shopName: string;
  city: string;
}

export interface CoffeeNoteInput {
  shopName: string;
  city: string;
  beanType: BeanType;
  rating: number;
  feelings: string;
  image?: string;
}
