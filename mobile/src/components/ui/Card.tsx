import React from "react";
import { View, ViewProps, TouchableOpacity } from "react-native";
import { cn } from "../../utils/cn";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  onPress?: () => void;
}

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

const variantStyles = {
  default: "bg-white rounded-2xl",
  elevated: "bg-white rounded-2xl shadow-lg shadow-black/10",
  outlined: "bg-white rounded-2xl border border-surface-200",
};

export function Card({
  children,
  variant = "elevated",
  padding = "md",
  className,
  onPress,
  ...props
}: CardProps) {
  const cardClass = cn(
    variantStyles[variant],
    paddingStyles[padding],
    className
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className={cardClass}
        {...(props as any)}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={cardClass} {...props}>
      {children}
    </View>
  );
}

interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <View className={cn("mb-4", className)} {...props}>
      {children}
    </View>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <View className={cn("", className)}>
      {typeof children === "string" ? (
        <View>
          {/* Text handled by parent */}
        </View>
      ) : (
        children
      )}
    </View>
  );
}

interface CardContentProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <View className={cn("", className)} {...props}>
      {children}
    </View>
  );
}

interface CardFooterProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <View className={cn("mt-4 flex-row items-center", className)} {...props}>
      {children}
    </View>
  );
}

export default Card;
