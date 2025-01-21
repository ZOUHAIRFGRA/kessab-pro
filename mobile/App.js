import React from 'react';
import { DripsyProvider } from 'dripsy';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import theme from './src/styles/theme';

export default function App() {
  return (
    <DripsyProvider theme={theme}>
     
        <RootNavigator />
     
    </DripsyProvider>
  );
}