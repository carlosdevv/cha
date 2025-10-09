export interface Gift {
  id: string;
  name: string;
  category: string;
  links?: string[]; // Array de links para o produto (múltiplas opções)
  selectedBy: string[]; // Array de nomes que já escolheram (vem do Firebase)
  type?: "cheap" | "super-cheap";
  maxAttempts: number; // Quantidade máxima de vezes que pode ser escolhido
}

export interface Confirmation {
  id?: string;
  name: string;
  selectedGifts: string[];
  timestamp: number;
}

export interface GiftCategory {
  id: string;
  name: string;
  gifts: Gift[];
}

export type CategoryId =
  | "most-wanted"
  | "kitchen"
  | "bathroom"
  | "laundry"
  | "bedroom"
  | "general";
