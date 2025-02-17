import React from 'react';
import Container from "../global/Container";
import Header from "../global/Header";
import { Image } from "react-native";

export const FALLBACK_TYPE = {
  NO_RESULT: 'noResult',
  NOT_FOUND: 'notFound',
  ERROR: 'error',
};

const FallBack = ({ message = 'Error, please try again', type = FALLBACK_TYPE.ERROR }) => {
  const getImageSource = (type) => {
    switch (type) {
      case FALLBACK_TYPE.NO_RESULT:
        return require('../../../assets/farmer_feeding_cattle.png');
      case FALLBACK_TYPE.NOT_FOUND:
        return require('../../../assets/farmer_standing_sheep.png');
      case FALLBACK_TYPE.ERROR:
      default:
        return require('../../../assets/farmer_holding_pucket.png');
    }
  };

  return (
    <Container sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={getImageSource(type)}
        style={{ height: 300, width: 300, resizeMode: 'contain' }}
      />
      <Header level={2}>{message}</Header>
    </Container>
  );
};

export default FallBack;
