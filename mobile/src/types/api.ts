// =====================
// Common Types
// =====================
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface PaginationParams {
  page?: number;
  size?: number;
}

// =====================
// Animal Types
// =====================
export interface Animal {
  id: number;
  tag: string;
  categoryId: number;
  categoryName?: string;
  gender?: string;
  birthDate?: string;
  weight?: number;
  price?: number;
  imageUrl?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface AnimalFilterParams extends PaginationParams {
  search?: string;
  filterType?: string;
}

export interface AnimalCreateRequest {
  tag: string;
  categoryId: number;
  gender?: string;
  birthDate?: string;
  weight?: number;
  price?: number;
  image?: File | Blob;
  [key: string]: any;
}

export interface AnimalUpdateRequest extends Partial<AnimalCreateRequest> {}

export type AnimalListResponse = PaginatedResponse<Animal>;

// =====================
// Buyer Types
// =====================
export interface Buyer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface BuyerQuery extends PaginationParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface BuyerCreateRequest {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  [key: string]: any;
}

export interface BuyerUpdateRequest extends Partial<BuyerCreateRequest> {}

export type BuyerListResponse = PaginatedResponse<Buyer>;

export interface BuyerOverview {
  buyer: Buyer;
  totalPurchases: number;
  totalAmount: number;
  lastPurchaseDate?: string;
  [key: string]: any;
}

// =====================
// Sale Types
// =====================
export interface Sale {
  id: number;
  buyerId: number;
  buyerName?: string;
  animalIds: number[];
  totalAmount: number;
  saleDate: string;
  status: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface SaleQuery extends PaginationParams {
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  buyerId?: number;
}

export interface SaleCreateRequest {
  buyerId: number;
  animalIds: number[];
  totalAmount: number;
  saleDate: string;
  notes?: string;
  [key: string]: any;
}

export interface SaleUpdateRequest extends Partial<SaleCreateRequest> {}

export type SaleListResponse = PaginatedResponse<Sale>;

export interface SaleInvoice {
  invoiceId: string;
  pdfUrl?: string;
  pdfData?: string;
  [key: string]: any;
}

// =====================
// Transaction Types
// =====================
export interface Transaction {
  id: number;
  buyerId?: number;
  buyerName?: string;
  saleId?: number;
  amount: number;
  transactionDate: string;
  paymentMethod: string;
  paymentStatus: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface TransactionCreateRequest {
  buyerId?: number;
  saleId?: number;
  amount: number;
  transactionDate: string;
  paymentMethod: string;
  paymentStatus: string;
  description?: string;
  [key: string]: any;
}

export interface TransactionUpdateRequest extends Partial<TransactionCreateRequest> {}

export interface ConsumeTransactionRequest {
  amount: number;
  transactionDate: string;
  paymentMethod: string;
  description?: string;
  [key: string]: any;
}

export interface TransactionInvoice {
  invoiceId: string;
  pdfUrl?: string;
  pdfData?: string;
  [key: string]: any;
}

// =====================
// Category Types
// =====================
export interface CategoryIcon {
  id: number;
  name?: string;
  iconPath: string; // The actual API returns iconPath
  iconData?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface Category {
  id: string; // API returns UUID strings, not numbers
  typeName: string;
  icon: CategoryIcon;
  user?: any; // API includes user object
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface CategoryCreateRequest {
  typeName: string;
  iconId: number;
}

export interface CategoryUpdateRequest extends Partial<CategoryCreateRequest> {}

// =====================
// Log Types
// =====================
export interface MedicalLog {
  id: number;
  animalId: number;
  date: string;
  description: string;
  treatment?: string;
  veterinarian?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MedicalLogRequest {
  animalId: number;
  date: string;
  description: string;
  treatment?: string;
  veterinarian?: string;
  [key: string]: any;
}

export interface ActivityLog {
  id: number;
  animalId: number;
  date: string;
  activityType: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivityLogRequest {
  animalId: number;
  date: string;
  activityType: string;
  description: string;
  [key: string]: any;
}

// =====================
// User Types
// =====================
export interface User {
  id: number | string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface UserUpdateRequest {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  [key: string]: any;
}

// =====================
// Auth Types
// =====================
export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number | string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

// =====================
// Enum Types
// =====================
export interface EnumValue {
  key: string;
  value: string;
  description?: string;
}

export type PaymentStatus = EnumValue;
export type PaymentMethod = EnumValue;
