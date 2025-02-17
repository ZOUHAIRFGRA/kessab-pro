import React, { useEffect } from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import Colors from '../../utils/Colors';
import SaleInfoView from '../../components/sale/SaleInfoView';
import BuyerInfoView from '../../components/buyer/BuyerInfoView';
import TransactionsListCardView from '../../components/transaction/TransactionsListCardView';
import AnimalsListCardView from '../../components/Animal/AnimalsListCardView';

const SaleDetailScreen =  ({route}) => {
const [index, setIndex] = React.useState(0);
const { sale } = route.params;
return (
  <>
    <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'white',
        height: 3,
      }}
      dense
      containerStyle={{ backgroundColor : Colors.secondary }}
      variant="primary"
    >
      <Tab.Item
        title="Info"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'information-outline', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="Buyer"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'person-outline', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="Animals"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'cart-outline', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="Transactions"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'pricetags-outline', type: 'ionicon', color: 'white' }}
      />
    </Tab>

    <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item   style={{ backgroundColor: 'white', width: '100%' }}>
        <SaleInfoView sale={sale}/>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
        <BuyerInfoView buyer={sale.buyer}/>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
        <AnimalsListCardView animals={sale.animals}/>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
        <TransactionsListCardView transactions={sale.transactions} />
      </TabView.Item>
    </TabView>
  </>
);
};

export default SaleDetailScreen;