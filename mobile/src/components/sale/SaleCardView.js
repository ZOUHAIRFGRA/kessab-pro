import React from 'react';
import { styled, useDripsyTheme } from 'dripsy';
import { View, Text , Image} from 'react-native';
import Card from '../global/Card';
import { FontAwesome } from '@expo/vector-icons';
import IconTag from '../global/IconTag';


const SaleCardView = ({sale}) => {
  return <Card sx={{
    display : "flex",
    flexDirection : "row",
  }}>
   

   <View style={{ position: 'relative', width: 70, height: 70,  marginRight : 8  }}>
   <Image source={{ uri: 'https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg'}} style={{width : '100%', borderRadius: 8,height : '100%'}} />
  <View style={{ position: 'absolute', bottom: -5, right: 0, backgroundColor : "green", borderRadius : 10, width : 20, height : 20, alignItems: 'center',
    justifyContent: 'center',}}>
    <Text style={{color : 'white'}}>5</Text>
  </View>
</View>

   <View style={{display : "flex",flexDirection : "column",justifyContent:'space-evenly'}}>
   <Text sx={{flex:2}}>Category</Text>
   <View style={{display: 'flex',flexDirection: "row",gap : 6}}>
      <IconTag tagName="user" color="grey" content="salam" />
  </View>
  <View style={{display: 'flex',flexDirection: "row",gap : 6}}>
      <IconTag tagName="user" color="grey" content="salam" />
   </View>
  </Card>
};

export default SaleCardView;
