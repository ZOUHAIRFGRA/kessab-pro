import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { DripsyProvider } from 'dripsy';
import  theme  from './src/styles/theme';  
import RootNavigator from './src/navigation/RootNavigator'; 

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
