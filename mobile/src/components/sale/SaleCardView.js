import React from 'react';
import { View, Text , Image} from 'react-native';
import Card from '../global/Card';
import IconTag from '../global/IconTag';


const SaleCardView = ({sale}) => {
  return <Card sx={{
    display : "flex",
    flexDirection : "row",
  }}>
   

   <View style={{ position: 'relative', width: 80, height: 80,  marginRight : 8  }}>
   <Image source={{ uri: 'https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg'}} style={{width : '100%', borderRadius: 8,height : '100%'}} />
  <View style={{ position: 'absolute', bottom: -5, right: 0, backgroundColor : "green", borderRadius : 10, width : 20, height : 20, alignItems: 'center',
    justifyContent: 'center',}}>
    <Text style={{color : 'white'}}>5</Text>
  </View>
</View>

   <View style={{display : "flex",flexDirection : "column",justifyContent:'space-evenly',flex: 1,gap : 4}}>  
   <Text style={{fontWeight:"bold"}}>Category</Text>
      <IconTag tagName="user" color="grey" content="Abdelhamid" />
   <View style={{display: 'flex',flexDirection: "row",gap : 6,justifyContent:'space-evenly'}}>
      <IconTag tagName="calendar" color="grey" content="10-10-2024" style={{flex:1}} />
      <IconTag tagName="dollar" color="grey" content="5" style={{flex:1}} />
  </View>
   </View>
  </Card>
};

export default SaleCardView;
