import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { DripsyProvider } from 'dripsy';
import { Provider } from 'react-redux';
import theme from './src/styles/theme';
import RootNavigator from './src/navigation/RootNavigator';
import {store} from './src/store/store'; 

export default function App() {
  return (
    <Provider store={store}>
      <DripsyProvider theme={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          <RootNavigator />
        </SafeAreaView>
      </DripsyProvider>
    </Provider>
  );
}
