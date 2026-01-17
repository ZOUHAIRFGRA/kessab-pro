import React, { useState, forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { cn } from "../../utils/cn";
import { Eye, EyeOff, LucideIcon } from "lucide-react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconPress?: () => void;
  isPassword?: boolean;
  isRTL?: boolean;
  containerClassName?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      onRightIconPress,
      isPassword = false,
      isRTL = false,
      containerClassName,
      className,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    return (
      <View className={cn("mb-4", containerClassName)}>
        {label && (
          <Text
            className={cn(
              "text-surface-600 text-sm font-medium mb-2",
              isRTL ? "text-right" : "text-left",
              error && "text-danger-500"
            )}
          >
            {label}
          </Text>
        )}

        <View
          className={cn(
            "flex-row items-center bg-surface-50 rounded-2xl border-2 px-4",
            isFocused && !error && "border-primary-500",
            !isFocused && !error && "border-surface-200",
            error && "border-danger-400",
            isRTL ? "flex-row-reverse" : "flex-row"
          )}
        >
          {LeftIcon && (
            <LeftIcon
              size={20}
              color={
                error
                  ? "#f43f5e"
                  : isFocused
                  ? "#334e68"
                  : "#a1a1aa"
              }
            />
          )}

          <TextInput
            ref={ref}
            secureTextEntry={isPassword && !showPassword}
            placeholderTextColor="#a1a1aa"
            className={cn(
              "flex-1 py-4 px-3 text-base text-primary-900",
              isRTL ? "text-right" : "text-left",
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {isPassword && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {showPassword ? (
                <EyeOff size={20} color="#a1a1aa" />
              ) : (
                <Eye size={20} color="#a1a1aa" />
              )}
            </TouchableOpacity>
          )}

          {RightIcon && !isPassword && (
            <TouchableOpacity
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <RightIcon
                size={20}
                color={isFocused ? "#334e68" : "#a1a1aa"}
              />
            </TouchableOpacity>
          )}
        </View>

        {error && (
          <Text className="text-danger-500 text-xs mt-1.5 ml-1">
            {error}
          </Text>
        )}

        {hint && !error && (
          <Text className="text-surface-500 text-xs mt-1.5 ml-1">
            {hint}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export default Input;
