import { StyleSheet } from 'react-native';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { moderateScale } from 'react-native-size-matters';
import {
 responsiveScreenHeight,
 responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
  alignItems: 'center',
  paddingTop: moderateScale(21),
  padding: 8
 },
 header: {
  width: '90%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  bottom: responsiveScreenHeight(2)
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
  fontSize: 31,
  fontFamily: fonts.medium,
  marginTop: responsiveScreenHeight(2),
  color: '#000'
 },
 description: {
  fontSize: 15,
  fontFamily: fonts.regular,
  color: colors.black,
  textAlign: 'center',
  marginTop: '5%'
 },

 levelButton: {
  backgroundColor: colors.black,
  borderRadius: 10,
  width: moderateScale(290),
  height: moderateScale(38),
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: responsiveScreenHeight(6)
 },
 levelText: {
  color: '#fff',
  fontSize: 16
 }
});
