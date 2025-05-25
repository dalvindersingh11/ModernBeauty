import React, { useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 Image,
 ScrollView
} from 'react-native';
import { APP_LOGO, PREMIUM, USER } from '../../Constant/Icons';
import { moderateScale } from 'react-native-size-matters';
import fonts from '../../Constant/Fonts';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import colors from '../../Constant/colors';

export default function PlanScreen() {
 const [selectedPlan, setSelectedPlan] = useState('annual');

 return (
  <ScrollView contentContainerStyle={styles.container}>
   {/* Header */}
   <View style={styles.header}>
    <Image
     style={{ height: moderateScale(20), width: moderateScale(76) }}
     source={APP_LOGO}
    />
    <Image source={USER} style={styles.profileIcon} />
   </View>

   {/* Title */}
   <Text allowFontScaling={true} style={styles.title}>
    Go Premium
   </Text>
   <Text allowFontScaling={true} style={styles.subtitle}>
    Unlock all the power of this mobile tool and enjoy{'\n'}digital experience
    like never before!
   </Text>

   {/* Image */}
   <Image
    source={PREMIUM} // replace with your image
    style={styles.giftImage}
   />

   {/* Plans */}
   <TouchableOpacity
    style={[styles.planBox, selectedPlan === 'annual' && styles.planSelected]}
    onPress={() => setSelectedPlan('annual')}>
    <View style={styles.planTop}>
     <Text allowFontScaling={false} style={styles.planTitle}>
      Annual
     </Text>
     <Text allowFontScaling={false} style={styles.bestValue}>
      Best Value
     </Text>
    </View>
    <Text allowFontScaling={false} style={styles.planText}>
     Get quiz session free - $999/Year
    </Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={[styles.planBox, selectedPlan === 'monthly' && styles.planSelected]}
    onPress={() => setSelectedPlan('monthly')}>
    <Text allowFontScaling={false} style={styles.planTitle}>
     3 Month Subscription
    </Text>
    <Text allowFontScaling={false} style={styles.planText}>
     Get quiz session free - $500/ Per Month
    </Text>
   </TouchableOpacity>

   {/* Proceed Button */}
   <TouchableOpacity style={styles.proceedButton}>
    <Text allowFontScaling={false} style={styles.proceedText}>
     Proceed
    </Text>
   </TouchableOpacity>

   {/* Terms */}
   <View
    style={{ width: moderateScale(310), marginTop: responsiveScreenHeight(1) }}>
    <Text allowFontScaling={false} style={[styles.terms]}>
     By placing this order, you agree to the
     <Text allowFontScaling={false} style={styles.link}>
      Terms of Service
     </Text>
     and
     <Text allowFontScaling={false} style={styles.link}>
      Privacy Policy
     </Text>
     . Subscription automatically renews unless auto-renew is turned off at
     least 24-hours before the end of the current period.
    </Text>
   </View>
  </ScrollView>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
  alignItems: 'center',
  paddingTop: moderateScale(21),
  padding: 20
 },
 header: {
  width: '90%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
 },
 brand: {
  fontSize: 12,
  fontFamily: 'cursive',
  color: '#000'
 },
 profileIcon: {
  width: 40,
  height: 40,
  borderRadius: 20
 },
 title: {
  fontSize: 32,
  fontFamily: fonts.bold,
  marginTop: responsiveScreenHeight(5),
  color: '#000'
 },
 subtitle: {
  fontSize: 14,
  textAlign: 'center',
  fontFamily: fonts.regular,
  color: colors.black,
  marginTop: responsiveScreenHeight(1)
 },
 giftImage: {
  width: moderateScale(285),
  height: moderateScale(130),
  resizeMode: 'contain',
  marginTop: responsiveScreenHeight(5)
 },
 planBox: {
  width: moderateScale(282),
  height: moderateScale(68),
  backgroundColor: colors.planColor,
  borderRadius: 12,
  padding: 15,
  marginBottom: 15,
  borderWidth: 1.6,
  borderColor: 'transparent'
 },
 planSelected: {
  borderColor: '#000',
  backgroundColor: '#09276514'
 },
 planTop: {
  flexDirection: 'row',
  justifyContent: 'space-between'
 },
 planTitle: {
  fontSize: 16,
  fontFamily: fonts.bold,
  color: colors.black
 },
 planText: {
  fontSize: 14,
  fontFamily: fonts.regular,
  color: colors.black,
  marginTop: 5
 },
 bestValue: {
  fontSize: 11,
  color: colors.white,
  fontFamily: fonts.medium,
  backgroundColor: colors.green,
  paddingHorizontal: 9,
  paddingVertical: 3,
  borderRadius: 20,
  overflow: 'hidden'
 },
 proceedButton: {
  backgroundColor: '#000',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: responsiveScreenHeight(4),
  width: moderateScale(285),
  padding: moderateScale(15)
 },
 proceedText: {
  color: colors.white,
  fontSize: 16,
  textAlign: 'center',
  fontFamily: fonts.medium
 },
 terms: {
  fontSize: 10,
  color: colors.black,
  fontFamily: fonts.regular,
  marginTop: 20,
  textAlign: 'center'
 },
 link: {
  textDecorationLine: 'underline',
  fontSize: 10,
  color: colors.black,
  fontFamily: fonts.regular
 }
});
