import * as ImagePicker from "expo-image-picker";

export interface UseImagePickerReturn {
  pickImages: () => Promise<void>;
  takeImage: () => Promise<void>;
  removeImage: (index: number) => void;
}

export const useImagePicker = (
  images: string[],
  setImages: (images: string[]) => void
): UseImagePickerReturn => {
  const pickImages = async (): Promise<void> => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((asset) => asset.uri)]);
    }
  };

  const takeImage = async (): Promise<void> => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number): void => {
    setImages(images.filter((_, i) => i !== index));
  };

  return { pickImages, takeImage, removeImage };
};
