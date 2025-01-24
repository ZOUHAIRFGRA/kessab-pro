import React from 'react';
import { View, Text } from 'dripsy';
import { styled } from 'dripsy';

const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'background', // Use theme's background color
});

export default function ManagementScreen() {
  return (
    <Container>
      <Text sx={{ variant: 'heading' }}>Welcome to the Management Screen</Text>
      <Text sx={{ variant: 'subheading', color: 'secondary' }}>
        Manage your tasks efficiently.
      </Text>
    </Container>
  );
}
