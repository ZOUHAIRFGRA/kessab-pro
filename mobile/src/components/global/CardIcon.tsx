import "../../../global.css";
import React from "react";
import { View } from "react-native";
import { LucideIcon } from "lucide-react-native";
import Card from "./Card";
import Container from "./Container";
import Header from "./Header";
import Text from "./Text";

interface CardIconProps {
  style?: object;
  text: string;
  icon: LucideIcon;
  subText?: string | null;
  hideIcon?: boolean;
  color?: string;
  iconSize?: number;
}

const CardIcon: React.FC<CardIconProps> = ({
  style,
  text,
  icon: Icon,
  subText = null,
  hideIcon = false,
  color = "#334155", // Deep Slate Blue
  iconSize = 32,
}) => {
  return (
    <Card
      sx={{
        alignItems: "center",
        padding: 12,
        ...style,
      }}
    >
      <Container style={{ flex: 5, justifyContent: "space-between" }}>
        <Text className="text-base text-slate-700">{text}</Text>
        {subText && <Header level={"h3"}>{subText}</Header>}
      </Container>

      {!hideIcon && (
        <Container className="flex-1 flex-row justify-center items-center">
          <View className="bg-amber-500 rounded-full p-3">
            <Icon size={iconSize} color="white" />
          </View>
        </Container>
      )}
    </Card>
  );
};

export default CardIcon;
