import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator, Image, Text } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { getBaseURL } from '../../api/axiosInstance';

interface ImageCarouselProps {
  imagePaths: string[];
  flatListRef: React.RefObject<FlatList>;
  screenWidth: number;
  isRTL: boolean;
  t: (key: string) => string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  imagePaths,
  flatListRef,
  screenWidth,
  isRTL,
  t,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const baseURL = getBaseURL();

  const handleNext = () => {
    if (currentIndex < imagePaths.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  if (!imagePaths || imagePaths.length === 0) {
    return (
      <View className="items-center justify-center p-4">
        <Text className="text-slate-600 text-base">{t('No images available')}</Text>
      </View>
    );
  }

  return (
    <View className="items-center" style={{ width: screenWidth }}>
      <FlatList
        ref={flatListRef}
        data={imagePaths}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}-${index}`}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(
            event.nativeEvent.contentOffset.x / screenWidth
          );
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <View
            className="items-center justify-center"
            style={{ width: screenWidth }}
          >
            {imageLoading && (
              <ActivityIndicator
                size="large"
                color="#F59E0B"
                className="absolute"
              />
            )}
            <Image
              source={{ uri: `${baseURL}${item}` }}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              defaultSource={require('../../../assets/placeholder.png')}
              className="rounded-xl bg-white self-center"
              style={{ width: screenWidth * 0.9, height: 250 }}
            />
          </View>
        )}
      />
      <View
        className="mt-2.5"
        style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
      >
        <TouchableOpacity
          onPress={handlePrev}
          disabled={currentIndex === 0}
          className="mx-2.5"
        >
          {isRTL ? (
            <ChevronRight
              size={50}
              color={currentIndex === 0 ? '#9CA3AF' : '#1E293B'}
            />
          ) : (
            <ChevronLeft
              size={50}
              color={currentIndex === 0 ? '#9CA3AF' : '#1E293B'}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          disabled={currentIndex === imagePaths.length - 1}
        >
          {isRTL ? (
            <ChevronLeft
              size={50}
              color={
                currentIndex === imagePaths.length - 1 ? '#9CA3AF' : '#1E293B'
              }
            />
          ) : (
            <ChevronRight
              size={50}
              color={
                currentIndex === imagePaths.length - 1 ? '#9CA3AF' : '#1E293B'
              }
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
