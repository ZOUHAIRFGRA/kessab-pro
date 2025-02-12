import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../utils/Colors';
import Container from './global/Container';

const CustomHeader = ({ navigation, options }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="#fff" />
      </TouchableOpacity>
      <Container sx={{ display: 'flex', flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
      <Text style={styles.headerTitle}>{options.title || 'KessabPro App'}</Text>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomHeader;