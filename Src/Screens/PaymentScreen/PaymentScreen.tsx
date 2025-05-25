// TrialAccessScreen.tsx

import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from './Styles';
import ShippingAddress from '../../Component/ShippinfgAddress/ShippingAddress';
import PaymentMethod from '../../Component/Payment/PaymentMethod';
import OrderSuccess from '../../Component/OrderSuccess/OrderSuccess';
export default function PaymentScreen() {
 const [playVideo, setPlayVideo] = useState(false);
 const navigation = useNavigation<any>();
 const [value, setValue] = useState(null);
 const [isFocus, setIsFocus] = useState(false);
 const [isStatus, setIsStatus] = useState(1);

 const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' }
 ];
 return (
  <SafeAreaView style={Styles.container}>
   {isStatus == 1 ? (
    <ShippingAddress onPressFirstStep={() => setIsStatus(2)} />
   ) : isStatus == 2 ? (
    <PaymentMethod
     onBackStep={() => setIsStatus(1)}
     onPressSecondStep={() => setIsStatus(3)}
    />
   ) : isStatus == 3 ? (
    <OrderSuccess />
   ) : null}
  </SafeAreaView>
 );
}
