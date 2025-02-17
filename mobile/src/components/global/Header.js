import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Header = ({ level, children }) => {
  let fontSize;
  
  switch (level) {
    case 'h1':
      fontSize = 32;
      break;
    case 'h2':
      fontSize = 28;
      break;
    case 'h3':
      fontSize = 24;
      break;
    default:
      fontSize = 20;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize }]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
 
  text: {
    fontWeight: 'bold',
  },
});

export default Header;
