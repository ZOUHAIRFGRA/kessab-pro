import React from 'react';
import Container from "../global/Container";
import { Image } from "react-native";
import * as Progress from 'react-native-progress';
import Colors from '../../utils/Colors';

const Loading = () => {
  return (
    <Container sx={{ flex: 1, gap: 20, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../../../assets/logo.png')}
        style={{ height: 150, width: 150, resizeMode: 'contain' }}
      />
      <Progress.Bar color={Colors.primary} indeterminate={true} width={150} />
    </Container>
  );
};

export default Loading;
