import { styled } from "dripsy";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Tag = styled(View)({
  borderWidth: 1,
  borderColor: "gray",
  borderRadius: 2,
});

const IconTag = ({ tagName, color, content, style }) => {
  return (
    <Tag
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingY: 1,
        paddingX: 6,
        ...style,
      }}
    >
      <FontAwesome
        name={tagName}
        size={16}
        color={color}
        sx={{ marginRight: 4 }}
      />
      <Text>{content}</Text>
    </Tag>
  );
};
export default IconTag;
