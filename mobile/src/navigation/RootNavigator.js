import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import AppNavigator from './AppNavigator';
import BuyerScreen from '../screens/BuyerScreen';
import AddTransaction from '../components/AddTransaction';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const isAuthenticated = true;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="MainApp" component={AppNavigator} />
            <Stack.Screen name="Buyer" component={BuyerScreen} />
            <Stack.Screen name="AddTransaction" component={AddTransaction} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
