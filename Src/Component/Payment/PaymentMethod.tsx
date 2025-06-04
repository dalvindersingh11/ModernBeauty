// TrialAccessScreen.tsx

import React, { useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 TextInput,
 SafeAreaView,
 ScrollView
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { APP_LOGO, STRIPE, USER } from '../../Constant/Icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from './Styles';
import colors from '../../Constant/colors';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import TopHeader from '../TopHeader/TopHeader';
export default function PaymentMethod(props: any) {
 const navigation = useNavigation<any>();

 return (
  <View style={{ flex: 1, width: '100%' }}>
   {/* <TopHeader backOnPress={() => navigation.goBack()} /> */}
   <ScrollView showsVerticalScrollIndicator={false}>
    <View style={[Styles.container, { padding: 0 }]}>
     {/* Top branding */}
     {/* <View style={Styles.navRow}>
      <TouchableOpacity onPress={props?.onBackStep} style={Styles.arrowStyle}>
       <Icon name="arrow-back" size={30} />
      </TouchableOpacity> */}
     <Text style={Styles.checkoutText}>Checkout</Text>
     {/* </View> */}
     <View style={Styles.stepContainer}>
      <View style={Styles.step}>
       <Icon name="local-shipping" size={20} />
       <Text style={Styles.stepLabel}>Shipping</Text>
      </View>
      <View style={Styles.separator} />
      <View style={Styles.step}>
       <Icon name="payment" size={20} />
       <Text style={Styles.stepLabel}>Payment</Text>
      </View>
      <View style={Styles.separator} />
      <View style={Styles.step}>
       <Icon name="assignment" size={20} />
       <Text style={Styles.stepLabel}>Review</Text>
      </View>
     </View>
     <Text allowFontScaling={true} style={Styles.title}>
      Enter Shipping Details
     </Text>
     <View style={{ height: moderateScale(38) }} />
     <Image
      style={{ width: moderateScale(260), height: moderateScale(80) }}
      source={STRIPE}
     />
     <View style={Styles.inputContainer}>
      <Text
       allowFontScaling={false}
       style={[Styles.label, { marginTop: '5%' }]}>
       Card Holder Name
      </Text>
      <TextInput
       allowFontScaling={false}
       placeholder="Enter Username"
       style={[Styles.input]}
       placeholderTextColor={colors.gray}
      />
     </View>
     <View style={Styles.inputContainer}>
      <Text
       allowFontScaling={false}
       style={[Styles.label, { marginTop: '5%' }]}>
       Card Number
      </Text>
      <TextInput
       allowFontScaling={false}
       placeholder="0000 0000 0000 "
       keyboardType="number-pad"
       style={[Styles.input]}
       placeholderTextColor={colors.gray}
      />
     </View>
     <View style={Styles.bottomView}>
      <View style={[Styles.inputContainer, { width: '30%' }]}>
       <Text
        allowFontScaling={false}
        style={[
         Styles.label,
         { marginTop: '5%', marginLeft: responsiveScreenWidth(2) }
        ]}>
        Expiry Date
       </Text>
       <TextInput
        allowFontScaling={false}
        placeholder="MM/YY"
        keyboardType="number-pad"
        style={[Styles.input]}
        placeholderTextColor={colors.gray}
       />
      </View>
      <View style={[Styles.inputContainer, { width: '30%' }]}>
       <Text
        allowFontScaling={false}
        style={[
         Styles.label,
         { marginTop: '5%', marginLeft: responsiveScreenWidth(4) }
        ]}>
        CVV
       </Text>
       <TextInput
        allowFontScaling={false}
        placeholder="123 "
        maxLength={3}
        keyboardType="number-pad"
        style={[Styles.input]}
        placeholderTextColor={colors.gray}
       />
      </View>
     </View>
     <TouchableOpacity
      onPress={props?.onPressSecondStep}
      style={Styles.levelButton}>
      <Text allowFontScaling={false} style={Styles.levelText}>
       Confirm
      </Text>
     </TouchableOpacity>
    </View>
   </ScrollView>
  </View>
 );
}
