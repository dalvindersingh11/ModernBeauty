import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { APP_LOGO, PREMIUM, USER } from '../../Constant/Icons';
import { moderateScale } from 'react-native-size-matters';
import fonts from '../../Constant/Fonts';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import colors from '../../Constant/colors';
import { useNavigation } from '@react-navigation/native';
import Styles from './Styles';
export default function PlanScreen() {
 const [selectedPlan, setSelectedPlan] = useState('annual');
 const navigation = useNavigation<any>();

 return (
  <ScrollView contentContainerStyle={Styles.container}>
   {/* Header */}
   <View style={Styles.header}>
    <Image
     style={{ height: moderateScale(20), width: moderateScale(76) }}
     source={APP_LOGO}
    />
    <Image source={USER} style={Styles.profileIcon} />
   </View>

   {/* Title */}
   <Text allowFontScaling={true} style={Styles.title}>
    Go Premium
   </Text>
   <Text allowFontScaling={true} style={Styles.subtitle}>
    Unlock all the power of this mobile tool and enjoy{'\n'}digital experience
    like never before!
   </Text>

   {/* Image */}
   <Image
    source={PREMIUM} // replace with your image
    style={Styles.giftImage}
   />

   {/* Plans */}
   <TouchableOpacity
    style={[Styles.planBox, selectedPlan === 'annual' && Styles.planSelected]}
    onPress={() => setSelectedPlan('annual')}>
    <View style={Styles.planTop}>
     <Text allowFontScaling={false} style={Styles.planTitle}>
      Annual
     </Text>
     <Text allowFontScaling={false} style={Styles.bestValue}>
      Best Value
     </Text>
    </View>
    <Text allowFontScaling={false} style={Styles.planText}>
     Get quiz session free - $999/Year
    </Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={[Styles.planBox, selectedPlan === 'monthly' && Styles.planSelected]}
    onPress={() => setSelectedPlan('monthly')}>
    <Text allowFontScaling={false} style={Styles.planTitle}>
     3 Month Subscription
    </Text>
    <Text allowFontScaling={false} style={Styles.planText}>
     Get quiz session free - $500/ Per Month
    </Text>
   </TouchableOpacity>

   {/* Proceed Button */}
   <TouchableOpacity
    onPress={() => navigation?.navigate('PaymentScreen')}
    style={Styles.proceedButton}>
    <Text allowFontScaling={false} style={Styles.proceedText}>
     Proceed
    </Text>
   </TouchableOpacity>

   {/* Terms */}
   <View
    style={{ width: moderateScale(310), marginTop: responsiveScreenHeight(1) }}>
    <Text allowFontScaling={false} style={[Styles.terms]}>
     By placing this order, you agree to the
     <Text allowFontScaling={false} style={Styles.link}>
      Terms of Service
     </Text>
     and
     <Text allowFontScaling={false} style={Styles.link}>
      Privacy Policy
     </Text>
     . Subscription automatically renews unless auto-renew is turned off at
     least 24-hours before the end of the current period.
    </Text>
   </View>
  </ScrollView>
 );
}
