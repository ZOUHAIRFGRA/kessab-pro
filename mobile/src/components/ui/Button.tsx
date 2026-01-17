import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cn } from "../../utils/cn";
import { LucideIcon } from "lucide-react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: "py-2 px-4",
  md: "py-3 px-6",
  lg: "py-4 px-8",
};

const textSizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
};

const variantGradients: Record<ButtonVariant, [string, string] | null> = {
  primary: ["#f59e0b", "#d97706"],
  secondary: ["#334e68", "#243b53"],
  outline: null,
  ghost: null,
  danger: ["#f43f5e", "#e11d48"],
};

const variantTextColors: Record<ButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-white",
  outline: "text-primary-700",
  ghost: "text-primary-700",
  danger: "text-white",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const gradientColors = variantGradients[variant];
  const textColor = variantTextColors[variant];
  const iconSize = iconSizes[size];

  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" || variant === "ghost" ? "#334e68" : "white"}
          size="small"
        />
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <Icon
              size={iconSize}
              color={variant === "outline" || variant === "ghost" ? "#334e68" : "white"}
              style={{ marginRight: 8 }}
            />
          )}
          <Text
            className={cn(
              "font-semibold",
              textSizeStyles[size],
              textColor,
              disabled && "opacity-70"
            )}
          >
            {children}
          </Text>
          {Icon && iconPosition === "right" && (
            <Icon
              size={iconSize}
              color={variant === "outline" || variant === "ghost" ? "#334e68" : "white"}
              style={{ marginLeft: 8 }}
            />
          )}
        </>
      )}
    </>
  );

  const baseButtonClass = cn(
    "flex-row items-center justify-center rounded-2xl",
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  if (gradientColors) {
    return (
      <TouchableOpacity
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        <LinearGradient
          colors={disabled ? ["#a1a1aa", "#71717a"] : gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.gradientBase,
            size === "sm" && styles.sizeSm,
            size === "md" && styles.sizeMd,
            size === "lg" && styles.sizeLg,
            fullWidth && styles.fullWidth,
          ]}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      activeOpacity={0.8}
      className={cn(
        baseButtonClass,
        variant === "outline" && "border-2 border-primary-300 bg-transparent",
        variant === "ghost" && "bg-transparent",
        disabled && "opacity-50"
      )}
      {...props}
    >
      {buttonContent}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradientBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  sizeSm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sizeMd: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  sizeLg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  fullWidth: {
    width: '100%',
  },
});

export default Button;
