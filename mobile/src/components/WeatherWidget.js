import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { styled } from 'dripsy';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import { WEATHER_API_KEY } from '@env'; 

const WidgetContainer = styled(View)({
  padding: 16,
  backgroundColor: '#ffffff',
  borderRadius: 16,
  marginBottom: 16,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 8,
  elevation: 5,
  borderWidth: 1,
  borderColor: '#e0e0e0',
});

const Header = styled(Text)({
  fontSize: 20,
  fontWeight: 'bold',
  color: '#00796b',
  marginBottom: 16,
  textAlign: 'center',
});

const WeatherInfo = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingVertical: 8,
});

const WeatherDetail = styled(View)({
  alignItems: 'center',
  flex: 1,
});

const WeatherText = styled(Text)({
  fontSize: 14,
  color: '#004d40',
  marginTop: 4,
  textAlign: 'center',
});

export default function WeatherWidget() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location access is required to fetch weather data.');
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        const { latitude, longitude } = currentLocation.coords;
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}`
        );
        const data = await response.json();
        setWeather({
          temperature: data.current.temp_c,
          condition: data.current.condition.text,
          icon: data.current.condition.icon, 
          windSpeed: data.current.wind_kph,
          humidity: data.current.humidity,
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch weather data.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'weather-sunny';
      case 'cloudy':
        return 'weather-cloudy';
      case 'rainy':
        return 'weather-rainy';
      case 'stormy':
        return 'weather-lightning';
      case 'snowy':
        return 'weather-snowy';
      default:
        return 'weather-partly-cloudy';
    }
  };

  if (loading) {
    return (
      <WidgetContainer>
        <ActivityIndicator size="large" color="#00796b" />
        <Text style={{ textAlign: 'center', marginTop: 8, color: '#00796b' }}>
          Loading weather data...
        </Text>
      </WidgetContainer>
    );
  }

  if (!weather) {
    return (
      <WidgetContainer>
        <Text style={{ textAlign: 'center', color: '#b71c1c' }}>
          Unable to fetch weather data.
        </Text>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer>
      <Header>Current Weather</Header>
      <WeatherInfo>
        <WeatherDetail>
          <Icon name={getWeatherIcon(weather.condition)} size={40} color="#00796b" />
          <WeatherText>{weather.condition}</WeatherText>
        </WeatherDetail>
        <WeatherDetail>
          <Icon name="thermometer" size={40} color="#00796b" />
          <WeatherText>{weather.temperature}°C</WeatherText>
        </WeatherDetail>
        <WeatherDetail>
          <Icon name="weather-windy" size={40} color="#00796b" />
          <WeatherText>{weather.windSpeed} km/h</WeatherText>
        </WeatherDetail>
        <WeatherDetail>
          <Icon name="water" size={40} color="#00796b" />
          <WeatherText>{weather.humidity}%</WeatherText>
        </WeatherDetail>
      </WeatherInfo>
    </WidgetContainer>
  );
}
