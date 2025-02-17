import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'dripsy';

const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export default function TransactionsListCardView() {
  console.log("TransactionsListCardView: ");
  return (
    <Container>
      <Text>Transaction Info View</Text>
    </Container>
  ); 
}