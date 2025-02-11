import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'dripsy';

const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export default function MarketplaceScreen() {
  return (
    <Container>
      <Text>This Feature is Coming Soon!!!</Text>
    </Container>
  ); 
}