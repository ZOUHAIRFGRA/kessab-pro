import { styled } from "dripsy";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Text from "../../components/global/Text";
const Tag = styled(View)({
  borderWidth: 1,
  borderColor: "gray",
  borderRadius: 2,
});

const IconTag = ({
  tagName,
  color,
  content,
  style,
  textStyle = null,
  hideIcon = false,
}) => {
  const { t } = useTranslation();
  return (
    <Tag
      sx={{
        display: "flex",
        flexDirection: t("dir") == "ltr" ? "row" : "row-reverse",
        alignItems: "center",
        gap: 10,
        paddingY: 1,
        paddingX: 6,
        ...style,
      }}
    >
      {!hideIcon && (
        <FontAwesome
          name={tagName}
          size={16}
          color={color}
          sx={{ marginRight: 4 }}
        />
      )}
      <Text style={{ ...textStyle }}>{content}</Text>
    </Tag>
  );
};
export default IconTag;
