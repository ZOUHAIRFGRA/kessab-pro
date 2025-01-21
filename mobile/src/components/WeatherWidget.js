import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'dripsy';

const WidgetContainer = styled(View)({
  padding: 16,
  backgroundColor: '#e0f7fa',
  borderRadius: 8,
  marginBottom: 16,
});

const WeatherInfo = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const WeatherText = styled(Text)({
  fontSize: 16,
  color: '#00796b',
});

export default function WeatherWidget() {
  return (
    <WidgetContainer>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#004d40' }}>Weather</Text>
      <WeatherInfo>
        <WeatherText>Temperature: 25°C</WeatherText>
        <WeatherText>Condition: Sunny</WeatherText>
      </WeatherInfo>
    </WidgetContainer>
  );
}
