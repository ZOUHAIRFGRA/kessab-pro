import React, { useEffect } from 'react';
import { View, Text,ScrollView } from 'react-native';
import SaleCardView from '../components/sale/SaleCardView';
import Container from '../components/global/Container';
import { fetchSales } from '../api/saleApi';

export default function MySellsScreen() {

  useEffect(() => {
      const sales = fetchSales();
      console.log(sales.then(data => console.log(data)));
    }); 


  return (
    <ScrollView>
    <Container sx={{
      display : "flex",
      flexDirection : "column",
      gap : 8
    }}>
      
      <SaleCardView/>
      <SaleCardView/>
      <SaleCardView/>
      <SaleCardView/>
      <SaleCardView/>
      <SaleCardView/>
      <SaleCardView/>
      <SaleCardView/>
      <SaleCardView/>
      <SaleCardView/>

    </Container>
      </ScrollView>
  );
}
