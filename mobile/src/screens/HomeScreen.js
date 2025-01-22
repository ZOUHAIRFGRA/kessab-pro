import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'dripsy';
import WeatherWidget from '../components/WeatherWidget';

const Container = styled(View)({
  flex: 1,
  padding: 16,
  backgroundColor: 'white',
});

const Grid = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginVertical: 16,
});

const GridItem = styled(TouchableOpacity)({
  width: '48%',
  height: 120,
  backgroundColor: '#f0f0f0',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: 8,
  borderColor: 'gray',
  marginBottom: 16,
});

const BottomNav = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 16,
  borderTopWidth: 1,
  borderColor: 'red',
});

export default function HomeScreen({ navigation }) {
  return (
    <Container>
      <WeatherWidget />

      <TextInput
        placeholder="Search for sheep by ID"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 8, marginVertical: 16 }}
        onSubmitEditing={(e) => console.log(e.nativeEvent.text)}
      />

      <Grid>
        {["Management", "Sales", "Food", "Marketplace"].map((item) => (
          <GridItem key={item} onPress={() => navigation.navigate(item)}>
            <Text>{item}</Text>
          </GridItem>
        ))}
      </Grid>

      <ScrollView horizontal style={{ marginVertical: 16 }}>
        {[...Array(5)].map((_, index) => (
          <View
            key={index}
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#e0e0e0',
              borderRadius: 40,
              marginRight: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Event {index + 1}</Text>
          </View>
        ))}
      </ScrollView>

      <BottomNav>
        {["Dashboard", "QRScanner", "Profile"].map((item) => (
          <TouchableOpacity key={item} onPress={() => navigation.navigate(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </BottomNav>
    </Container>
  );
}
