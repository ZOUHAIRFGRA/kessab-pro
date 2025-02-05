import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { DripsyProvider } from 'dripsy';
import { Provider } from 'react-redux';
import theme from './src/styles/theme';
import RootNavigator from './src/navigation/RootNavigator';
import {store} from './src/store/store'; 

export default function App() {
  return (
    <Provider store={store}>
      <DripsyProvider theme={theme}>
        <View style={{ 
          flex: 1, 
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 36 
        }}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          <RootNavigator />
        </View>
      </DripsyProvider>
    </Provider>
  );
}