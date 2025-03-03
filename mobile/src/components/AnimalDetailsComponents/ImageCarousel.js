import { View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { getBaseURL } from "../../api/axiosInstance";
import { AnimalImage } from "./sharedStyles";
import Colors from "../../utils/Colors";
import { Text } from "dripsy";

export const ImageCarousel = ({ imagePaths, flatListRef, screenWidth, isRTL, t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const baseURL = getBaseURL();

  const handleNext = () => {
    if (currentIndex < imagePaths.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: true });
    }
  };

  if (!imagePaths || imagePaths.length === 0) return <Text>{t("No images available")}</Text>;

  // Adjust chevron icons based on RTL
  const prevIcon = isRTL ? "chevron-right" : "chevron-left";
  const nextIcon = isRTL ? "chevron-left" : "chevron-right";

  return (
    <View style={{ alignItems: "center", width: screenWidth }}>
      <FlatList
        ref={flatListRef}
        data={imagePaths}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}-${index}`}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <View style={{ width: screenWidth, alignItems: "center", justifyContent: "center" }}>
            {imageLoading && (
              <ActivityIndicator size="large" color={Colors.primary} style={{ position: "absolute" }} />
            )}
            <AnimalImage
              source={{ uri: `${baseURL}${item}` }}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </View>
        )}
      />
      <View style={{ flexDirection: isRTL ? "row-reverse" : "row", marginTop: 10 }}>
        <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0} style={{ marginHorizontal: 10 }}>
          <MaterialIcons name={prevIcon} size={50} color={currentIndex === 0 ? "gray" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} disabled={currentIndex === imagePaths.length - 1}>
          <MaterialIcons name={nextIcon} size={50} color={currentIndex === imagePaths.length - 1 ? "gray" : "black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};