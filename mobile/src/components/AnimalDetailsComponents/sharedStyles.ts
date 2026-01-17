import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

/**
 * Color Constants - Deep Slate Blue and Warm Amber Theme
 */
export const COLORS = {
  // Primary Colors
  primary: '#1E293B', // Deep Slate Blue
  secondary: '#F59E0B', // Warm Amber
  danger: '#EF4444', // Red for delete/cancel actions
  
  // Background Colors
  background: '#F8FAFC', // Light slate background
  cardBackground: '#FFFFFF', // White for cards
  
  // Text Colors
  text: '#1E293B', // Deep slate for primary text
  textSecondary: '#64748B', // Slate gray for secondary text
  textLight: '#94A3B8', // Light slate for subtle text
  
  // Border Colors
  border: '#E2E8F0', // Light slate border
  borderDark: '#CBD5E1', // Darker slate border
  
  // State Colors
  success: '#10B981', // Green
  warning: '#F59E0B', // Amber
  error: '#EF4444', // Red
  info: '#3B82F6', // Blue
};

/**
 * Spacing Constants
 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

/**
 * Border Radius Constants
 */
export const RADIUS = {
  sm: 5,
  md: 8,
  lg: 10,
  xl: 12,
  xxl: 16,
};

/**
 * Font Sizes
 */
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};

/**
 * Shadow Styles
 */
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
};

/**
 * Dimension Constants
 */
export const DIMENSIONS = {
  screenWidth: width,
  imageWidth: width * 0.9,
  imageHeight: 250,
};

/**
 * Common Style Utilities
 */
export const getFlexDirection = (isRTL: boolean) => ({
  flexDirection: isRTL ? ('row-reverse' as const) : ('row' as const),
});

export const getTextAlign = (isRTL: boolean) => ({
  textAlign: isRTL ? ('right' as const) : ('left' as const),
});

export const getMargin = (isRTL: boolean, leftValue: number, rightValue: number) => ({
  marginLeft: isRTL ? rightValue : leftValue,
  marginRight: isRTL ? leftValue : rightValue,
});

/**
 * TypeScript Interfaces for Shared Components
 */
export interface LogCardProps {
  isRTL?: boolean;
  children: React.ReactNode;
}

export interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  isRTL?: boolean;
  multiline?: boolean;
}

export interface ActionButtonProps {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

/**
 * NativeWind Class Name Utilities
 */
export const containerClasses = 'flex-1 bg-slate-50';
export const cardClasses = 'bg-white p-3.5 mb-2.5 rounded-lg shadow-sm';
export const inputClasses =
  'text-base text-slate-800 border border-gray-300 rounded-lg py-2.5 px-3 bg-white mb-4';
export const primaryButtonClasses =
  'items-center justify-center bg-slate-700 py-3 rounded-lg shadow-lg';
export const secondaryButtonClasses =
  'items-center justify-center bg-amber-500 py-3 rounded-lg shadow-lg';
export const dangerButtonClasses =
  'items-center justify-center bg-red-500 py-3 rounded-lg shadow-lg';
export const buttonTextClasses = 'text-white text-base font-bold';
export const logTextClasses = 'text-base font-medium text-slate-800 mb-1.5';
export const emptyStateClasses = 'items-center mt-5';

/**
 * Common NativeWind Button Classes by Variant
 */
export const getButtonClasses = (variant: 'primary' | 'secondary' | 'danger' = 'primary') => {
  switch (variant) {
    case 'primary':
      return primaryButtonClasses;
    case 'secondary':
      return secondaryButtonClasses;
    case 'danger':
      return dangerButtonClasses;
    default:
      return primaryButtonClasses;
  }
};

/**
 * Export all constants as default object for convenience
 */
export default {
  COLORS,
  SPACING,
  RADIUS,
  FONT_SIZES,
  SHADOWS,
  DIMENSIONS,
  getFlexDirection,
  getTextAlign,
  getMargin,
  getButtonClasses,
};
