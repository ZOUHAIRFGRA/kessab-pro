import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import SaleCardView from '../components/sale/SaleCardView';
import Container from '../components/global/Container';
import { fetchSales } from '../api/saleApi';

export default function MySellsScreen() {

  useEffect(() => {
      const sales = fetchSales();
      console.log({sales});
    }); 


  return (
    <Container sx={{
      display : "flex",
      flexDirection : "column",
      gap : 8
    }}>
      <SaleCardView/>
      <SaleCardView/>
      <SaleCardView/>
      <SaleCardView/>
    </Container>
  );
}