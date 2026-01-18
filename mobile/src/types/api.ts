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
  id: string; // UUID string
  tag: string;
  sex: string; // "Male" | "Female"
  birthDate: string; // ISO date string
  price: number;
  weight: number;
  imagePaths: string[];
  saleId: string | null; // UUID string, nullable
  category: string; // UUID string (category ID)
  pickUpDate: string | null; // ISO date string, nullable
  imagesToDelete?: string[] | null;
  categoryName?: string; // Populated from join
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
  id: string; // UUID
  fullName: string;
  CIN?: string;
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
// Buyer info in Sale
export interface SaleBuyer {
  id: string; // UUID
  fullName: string;
  CIN: string;
  phone: string;
  address: string;
}

// Animal info in Sale (nested with category)
export interface SaleAnimal {
  id: string; // UUID
  tag: string;
  sex: string;
  birthDate: string;
  price: number;
  weight: number;
  gallery: string[];
  category: {
    type: string;
    icon: {
      iconPath: string;
    };
  };
  pickUpDate: string | null;
}

// Payment details in Sale
export interface SalePaymentDetail {
  remainingAmount: string;
  paidAmount: string;
}

export interface Sale {
  id: string; // UUID
  buyer: SaleBuyer;
  saleDate: string; // Format: "16-01-2026"
  agreedAmount: string; // Format: "8166.55DH"
  paymentStatus: string; // "NOT_PAID" | "PARTIALLY_PAID" | "FULLY_PAID"
  animals: SaleAnimal[];
  paymentDetail: SalePaymentDetail;
}

export interface SaleQuery extends PaginationParams {
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  buyerId?: string; // UUID
}

export interface SaleCreateRequest {
  buyerId: string; // UUID
  animalIds: string[]; // UUID array
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
  id: string; // UUID
  buyerId?: string; // UUID
  buyerName?: string;
  saleId?: string; // UUID
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
  buyerId?: string; // UUID
  saleId?: string; // UUID
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
  id: string;
  animalId: string;
  logDate: string;
  activity: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivityLogRequest {
  animalId: string;
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
