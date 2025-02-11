import React from 'react';
import { View, Text, Button } from 'react-native';
import { styled } from 'dripsy';
import { useToast } from "../hooks/useToast";

const Container = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export default function MySellsScreen() {
  const { showSuccessToast, showErrorToast, showInfoToast } = useToast();

  return (
    <Container>
      <Text>My Sells Screen</Text>
      <Button title="Show Success Toast" onPress={()=>showSuccessToast('succ')} />
      <Button title="Show Error Toast" onPress={()=>showErrorToast()} />
      <Button title="Show Info Toast" onPress={()=>showInfoToast()} />
    </Container>
  );
}
