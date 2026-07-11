export interface InquiryData {
  id: number;
  clientToken?: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  location: string;
  message?: string;
}

export interface MenuItemState {
  selected: boolean;
  quantity: number;
}

export interface CategoryState {
  [itemName: string]: MenuItemState;
}

export interface PackageState {
  selected: boolean;
  categories: Record<string, CategoryState>;
}

export interface MenuBuilderState {
  [pkgId: string]: PackageState;
}

export interface CategoryConfig {
  name: string;
  maxSelect: number;
  items: string[];
  complimentary?: boolean;
}

export interface PackageConfig {
  id: string;
  name: string;
  description: string;
  includes: readonly string[];
  categories: CategoryConfig[];
}

export interface SelectedItem {
  name: string;
  quantity: number;
}

export interface DishInfo {
  name: string;
  description: string;
  image: string;
}
