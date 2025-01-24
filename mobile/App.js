import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { DripsyProvider } from 'dripsy';
import  theme  from './src/styles/theme';  // Import theme from your theme.js
import RootNavigator from './src/navigation/RootNavigator'; // Adjust based on your navigator path

export default function App() {
  return (
    <DripsyProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <RootNavigator />
      </SafeAreaView>
    </DripsyProvider>
  );
}
