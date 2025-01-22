import React from 'react';
import { DripsyProvider } from 'dripsy';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import theme from './src/styles/theme';

export default function App() {
  return (
    <DripsyProvider theme={theme}>
      <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

        
          <RootNavigator />
      </SafeAreaView>
    </DripsyProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
