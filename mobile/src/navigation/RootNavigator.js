import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import AppNavigator from './AppNavigator';
import BuyerScreen from '../screens/BuyerScreen';
import AddTransaction from '../components/AddTransaction';
import AnimalDetailsScreen from '../screens/AnimalDetailsScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const isAuthenticated = true;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="MainApp"
              component={AppNavigator}
              options={{ headerShown: false }} // Hide header for drawer
            />
            <Stack.Screen name="Buyer" component={BuyerScreen} />
            <Stack.Screen name="AddTransaction" component={AddTransaction} />
            <Stack.Screen name="AnimalDetails" component={AnimalDetailsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
