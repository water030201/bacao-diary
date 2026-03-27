export interface Diary {
  id: string;
  title: string;
  productName: string;
  productCategory: string;
  price: number;
  rating: 1 | 2 | 3 | 4 | 5;
  reason: string;
  experience: string;
  verdict: "worth" | "not-worth" | "neutral";
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  nickname: string;
  avatar: string;
  bio: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export type ProductCategory =
  | "数码" | "美妆" | "服饰" | "美食"
  | "家居" | "图书" | "运动" | "其他";

export const CATEGORIES: ProductCategory[] = [
  "数码", "美妆", "服饰", "美食", "家居", "图书", "运动", "其他",
];

export const EMOJI_RATINGS = ["😡", "😕", "😐", "😊", "🤩"] as const;
