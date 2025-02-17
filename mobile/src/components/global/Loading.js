import React from 'react';
import Container from "../global/Container";
import Header from "../global/Header";
import { Image } from "react-native";
import * as Progress from 'react-native-progress';
import Colors from '../../utils/Colors';
import { Flex } from 'dripsy';



const Loading = () => {


  return (
    <Container sx={{gap:20,justifyContent:'center',alignItems:'center'}}>
      <Image
        source={require('../../../assets/logo.png')}
        style={{ height: 150, width: 150, resizeMode: 'contain' }}
      />
      <Progress.Bar color={Colors.primary} indeterminate={true} width={150} />
    </Container>
  );
};

export default Loading;
