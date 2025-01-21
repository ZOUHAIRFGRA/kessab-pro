import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function BuyerScreen() {
  const route = useRoute();
  const { cin } = route.params; // Retrieve the passed CIN

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buyer Details</Text>
      <Text style={styles.cin}>CIN: {cin}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cin: {
    fontSize: 18,
    color: '#333',
  },
});
