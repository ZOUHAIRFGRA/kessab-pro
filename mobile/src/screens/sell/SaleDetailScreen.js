import React from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import Colors from '../../utils/Colors';
import SaleInfoView from '../../components/sale/SaleInfoView';
import BuyerInfoView from '../../components/buyer/BuyerInfoView';
import AnimalCardView from '../../components/Animal/AnimalCardView';
import TransactionInfoView from '../../components/transaction/TransactionInfoView';

const SaleDetailScreen =  () => {
const [index, setIndex] = React.useState(0);

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
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
        <SaleInfoView/>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
        <BuyerInfoView/>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
        <AnimalCardView/>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
        <TransactionInfoView/>
      </TabView.Item>
    </TabView>
  </>
);
};

export default SaleDetailScreen;