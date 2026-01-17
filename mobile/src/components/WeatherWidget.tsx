import "../../global.css";
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import * as Location from "expo-location";
import { WEATHER_API_KEY } from "@env";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  Thermometer,
  Wind,
  Droplets,
} from "lucide-react-native";

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  windSpeed: number;
  humidity: number;
}

const WeatherWidget: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location access is required to fetch weather data."
          );
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
        Alert.alert("Error", "Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getWeatherIcon = (condition: string) => {
    const iconColor = "#1e3a5f";
    const iconSize = 40;

    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun size={iconSize} color={iconColor} />;
      case "cloudy":
      case "overcast":
      case "partly cloudy":
        return <Cloud size={iconSize} color={iconColor} />;
      case "rainy":
      case "rain":
        return <CloudRain size={iconSize} color={iconColor} />;
      case "drizzle":
        return <CloudDrizzle size={iconSize} color={iconColor} />;
      case "snowy":
      case "snow":
        return <CloudSnow size={iconSize} color={iconColor} />;
      default:
        return <Cloud size={iconSize} color={iconColor} />;
    }
  };

  if (loading) {
    return (
      <View className="p-4 bg-white rounded-2xl mb-4 shadow-lg border border-gray-200">
        <ActivityIndicator size="large" color="#1e3a5f" />
        <Text className="text-center mt-2 text-[#1e3a5f]">
          Loading weather data...
        </Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View className="p-4 bg-white rounded-2xl mb-4 shadow-lg border border-gray-200">
        <Text className="text-center text-[#dc2626]">
          Unable to fetch weather data.
        </Text>
      </View>
    );
  }

  return (
    <View className="p-4 bg-white rounded-2xl mb-4 shadow-lg border border-[#d4a574]">
      <View className="flex-row justify-around items-center py-2">
        <View className="items-center flex-1">
          {getWeatherIcon(weather.condition)}
          <Text className="text-sm text-[#1e3a5f] mt-1 text-center">
            {weather.condition}
          </Text>
        </View>
        <View className="items-center flex-1">
          <Thermometer size={40} color="#1e3a5f" />
          <Text className="text-sm text-[#1e3a5f] mt-1 text-center">
            {weather.temperature}°C
          </Text>
        </View>
        <View className="items-center flex-1">
          <Wind size={40} color="#1e3a5f" />
          <Text className="text-sm text-[#1e3a5f] mt-1 text-center">
            {weather.windSpeed} km/h
          </Text>
        </View>
        <View className="items-center flex-1">
          <Droplets size={40} color="#1e3a5f" />
          <Text className="text-sm text-[#1e3a5f] mt-1 text-center">
            {weather.humidity}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherWidget;
