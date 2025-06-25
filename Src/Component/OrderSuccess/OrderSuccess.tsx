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
import { APP_LOGO, ORDER, STRIPE, USER } from '../../Constant/Icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from './Styles';
import colors from '../../Constant/colors';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import TopHeader from '../TopHeader/TopHeader';
export default function OrderSuccess(props: any) {
 const navigation = useNavigation<any>();

 return (
  <View style={{ flex: 1, width: '100%' }}>
   <TopHeader backOnPress={() => navigation.goBack()} />
   <ScrollView showsVerticalScrollIndicator={false}>
    <View style={[Styles.container, { padding: 0 }]}>
     <View style={{ height: moderateScale(38) }} />
     <Image
      style={{ width: moderateScale(240), height: moderateScale(240) }}
      source={ORDER}
     />
     <Text allowFontScaling={true} style={Styles.title}>
      Your order has been {'\n'} placed successfully
     </Text>

     <Text allowFontScaling={true} style={Styles.description}>
      Thank you for choosing us! Feel free to continue {'\n'} shopping and
      explore our wide range {'\n'} of products. Happy Shopping!
     </Text>
     <TouchableOpacity
      onPress={() => navigation?.navigate('CourseListIndex')}
      style={Styles.levelButton}>
      <Text allowFontScaling={false} style={Styles.levelText}>
       Done
      </Text>
     </TouchableOpacity>
    </View>
   </ScrollView>
  </View>
 );
}
