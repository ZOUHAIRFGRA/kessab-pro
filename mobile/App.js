import React from 'react';
import { DripsyProvider } from 'dripsy';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/styles/theme';

const App = () => {
  return (
    <DripsyProvider theme={theme}>
      <AppNavigator />
    </DripsyProvider>
  );
};

export default App;
