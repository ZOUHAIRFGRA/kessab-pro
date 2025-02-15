import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'dripsy';

const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export default function SaleInfoView() {
  return (
    <Container>
      <Text>Sell Info View</Text>
    </Container>
  ); 
}