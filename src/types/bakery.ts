export type CategoryId = 'all' | 'cookies' | 'tins' | 'breads' | 'pastries';

export type DietaryTag = 'sourdough' | 'vegan' | 'wholegrain' | 'nut-free' | 'dairy-free' | 'gluten-free';

export type SlicingOption = 'whole' | 'sliced-standard' | 'sliced-thick';

export type FulfillmentMode = 'nationwide-shipping' | 'local-pickup';

export interface NutritionalProfile {
  servingSize: string;
  servingsPerContainer: number;
  calories: number;
  proteinGrams: number;
  totalCarbGrams: number;
  dietaryFiberGrams: number;
  sugarGrams: number;
  totalFatGrams: number;
  saturatedFatGrams: number;
  sodiumMg: number;
  glycemicIndex?: 'Low' | 'Medium' | 'Low-Medium' | 'Medium-High';
  digestibilityRating?: string;
  allergenSummary: {
    contains: string[];
    facilityNotice?: string;
    isDairyFree: boolean;
    isNutFree: boolean;
    isVegan: boolean;
    isSoyFree: boolean;
  };
}

export interface BakeryItem {
  id: string;
  name: string;
  frenchName?: string;
  category: 'cookies' | 'tins' | 'breads' | 'pastries' | 'pantry';
  lineType: 'cookies' | 'gift-boxes' | 'hearth-breads' | 'cakes-treats';
  description: string;
  price: number;
  pricePerServing?: number;
  weight: string; // e.g. "6 oz (170g) Giant Cookie"
  ingredients: string[];
  allergens: string[];
  dietaryTags: DietaryTag[];
  isAvailableToday: boolean;
  isHotFresh?: boolean;
  badge?: string; // e.g. "The Original NYC Icon", "Levain Bestseller"
  gooeyRating?: number; // 1-5 gooey center indicator
  nutritionalHighlights?: { label: string; value: string }[];
  nutrition?: NutritionalProfile;
  artworkType:
    | 'chocolate-chip-walnut'
    | 'two-chip-chocolate'
    | 'dark-chocolate-pb'
    | 'birthday-cake-cookie'
    | 'cereal-milk-truffle'
    | 'cookie-gift-tin'
    | 'country-boule'
    | 'baguette'
    | 'croissant';
}

export interface CookieBoxCustomization {
  size: 4 | 8 | 12;
  selectedItems: Record<string, number>;
  giftNote: string;
  recipientName: string;
  boxStyle: 'signature-blue-ribbon' | 'milkbar-confetti';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  subtitle: string;
  householdSize: string;
  fullPrice: number;
  firstBoxDiscountPrice: number;
  pricePerMealOrDay: string;
  features: string[];
  popular?: boolean;
  recommendedItemIds: string[];
  cookieCount: number;
  frequency: string;
}

export interface ComparisonRow {
  aspect: string;
  atelierLevain: string;
  traditionalStore: string;
  advantage: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  verifiedBuyer: boolean;
  rating: number;
  headline: string;
  comment: string;
  tag: string;
  date: string;
  favoriteItem: string;
}

export interface FaqItem {
  id: string;
  category: 'delivery' | 'storage' | 'subscription' | 'allergens';
  question: string;
  answer: string;
}

export interface CartItem {
  item: BakeryItem;
  quantity: number;
  slicing?: SlicingOption;
  customBoxDetails?: CookieBoxCustomization;
}

export interface OrderConfirmation {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  fulfillmentMode: FulfillmentMode;
  selectedBakeryLocation?: string;
  deliveryDate: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  giftNote?: string;
  placedAt: string;
}
