import { Image, styled, Text, TextInput, View } from "dripsy";
import { Dimensions, TouchableOpacity } from "react-native";
const { width } = Dimensions.get("window");


export const Container = styled(View)({ flex: 1, backgroundColor: "background" });

export const AnimalImage = styled(Image)({
  width: width * 0.9,
  height: 250,
  borderRadius: 10,
  marginBottom: 16,
  alignSelf: "center",
});

export const InfoText = styled(Text)({
  fontSize: 16,
  color: "text",
  paddingVertical: 4,
  fontWeight: "500",
});

export const EmptyState = styled(View)({ alignItems: "center", marginTop: 20 });

export const LogCard = styled(View)({
  backgroundColor: "cardBackground",
  padding: 14,
  marginBottom: 10,
  borderRadius: 8,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

export const LogText = styled(Text)({
  fontSize: 15,
  fontWeight: "500",
  color: "text",
});

export const InputField = styled(TextInput)({
  fontSize: 15,
  color: "text",
  borderBottomWidth: 1,
  marginBottom: 6,
  width: "80%",
});

export const AddButton = styled(TouchableOpacity)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#007bff",
  paddingVertical: 12,
  borderRadius: 10,
  marginBottom: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
});

export const AddButtonText = styled(Text)({
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
  marginLeft: 8,
});

export const ActionButtons = styled(View)({
  flexDirection: "row",
  marginTop: 8,
});

export const SaveButton = styled(TouchableOpacity)({
  backgroundColor: "green",
  padding: 8,
  borderRadius: 8,
  marginRight: 10,
});

export const CancelButton = styled(TouchableOpacity)({
  backgroundColor: "red",
  padding: 8,
  borderRadius: 8,
});

