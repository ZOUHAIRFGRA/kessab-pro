import React from 'react';
import { DripsyProvider, View, Text, Pressable, Image, ScrollView } from 'dripsy';

const theme = {
  colors: {
    primary: '#007aff',
    secondary: '#4caf50',
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#333333',
  },
  text: {
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'primary',
    },
    subheading: {
      fontSize: 18,
      fontWeight: '500',
      color: 'text',
    },
    body: {
      fontSize: 16,
      color: 'text',
    },
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  radii: {
    default: 8,
    round: 50,
  },
};

export default function App() {
  return (
    <DripsyProvider theme={theme}>
      <ScrollView
        sx={{
          flex: 1,
          bg: 'background',
          padding: 'medium',
        }}
      >
        {/* Heading */}
        <Text sx={{ variant: 'text.heading', mb: 'medium' }}>Welcome to Dripsy!</Text>

        {/* Subheading */}
        <Text sx={{ variant: 'text.subheading', mb: 'medium' }}>
          Test out various components below:
        </Text>

        {/* Button */}
        <Pressable
          sx={{
            bg: 'primary',
            padding: 'medium',
            borderRadius: 'default',
            alignItems: 'center',
            mb: 'medium',
          }}
          onPress={() => alert('Button Pressed!')}
        >
          <Text sx={{ color: 'card', fontWeight: 'bold' }}>Click Me</Text>
        </Pressable>

        {/* Card */}
        <View
          sx={{
            bg: 'card',
            padding: 'medium',
            borderRadius: 'default',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
            mb: 'medium',
          }}
        >
          <Text sx={{ variant: 'text.body' }}>This is a simple card component.</Text>
        </View>

        {/* Image */}
        <Image
          source={{
            uri: 'https://via.placeholder.com/150',
          }}
          sx={{
            width: 150,
            height: 150,
            borderRadius: 'round',
            alignSelf: 'center',
            mb: 'medium',
          }}
        />

        {/* List */}
        <View sx={{ mb: 'large' }}>
          <Text sx={{ variant: 'text.subheading', mb: 'small' }}>Features:</Text>
          {['Fast', 'Responsive', 'Utility-first'].map((item, index) => (
            <View
              key={index}
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                mb: 'small',
              }}
            >
              <View
                sx={{
                  width: 8,
                  height: 8,
                  bg: 'secondary',
                  borderRadius: 'round',
                  mr: 'small',
                }}
              />
              <Text sx={{ variant: 'text.body' }}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </DripsyProvider>
  );
}
