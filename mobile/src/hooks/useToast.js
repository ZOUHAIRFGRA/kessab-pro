import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

export const useToast = () => {
  
  const showSuccessToast = useCallback((message) => {
    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: message || 'Action was successful!',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 60, 
      style: { backgroundColor: 'green', padding: 15, borderRadius: 8 },
      textStyle: { color: 'white', fontSize: 16 },
    });
  }, []);

  
  const showErrorToast = useCallback((message) => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message || 'Something went wrong.',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 60, 
      style: { backgroundColor: 'red', padding: 15, borderRadius: 8 },
      textStyle: { color: 'white', fontSize: 16 },
    });
  }, []);

  
  const showInfoToast = useCallback((message) => {
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: message || 'This is an informational message.',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 60, 
      style: { backgroundColor: '#3498db', padding: 15, borderRadius: 8 },
      textStyle: { color: 'white', fontSize: 16 },
    });
  }, []);

  return { showSuccessToast, showErrorToast, showInfoToast };
};
