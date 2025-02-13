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


export const EmptyState = styled(View)({ alignItems: "center", marginTop: 20 });

export const LogCard = styled(View)({
  backgroundColor: "white",
  padding: 14,
  marginBottom: 10,
  borderRadius: 8,
  flexDirection: "column", 
  justifyContent: "flex-start", 
  alignItems: "flex-start", 
});

export const LogText = styled(Text)({
  fontSize: 15,
  fontWeight: "500",
  color: "text",
  marginBottom: 5, 
});

export const LabelText = styled(Text)({
  fontSize: 14,
  fontWeight: '600',
  color: '#333', 
  marginBottom: 6,
});

export const InputField = styled(TextInput)({
  fontSize: 16,
  color: 'text',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 12,
  backgroundColor: '#f9f9f9',
  marginBottom: 16,
  width: '100%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
});

export const FieldContainer = styled(View)({
  marginBottom: 0, 
});

export const EditContainer = styled(View)({
  padding: 16,
  backgroundColor: 'white',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
  marginBottom: 50,
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
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
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

export const InfoContainer = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 10,
});

export const InfoText = styled(Text)({
  fontSize: 16,
  color: 'black',
  fontWeight: '500',
});

export const Card = styled(View)({
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 5,
  marginVertical: 10,
});

export const InfoRow = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
});


export const EditButton = styled(TouchableOpacity)({
  padding: 8,
  backgroundColor: '#f1f8ff',
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
});