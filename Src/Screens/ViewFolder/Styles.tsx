import { StyleSheet } from 'react-native';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import {
 responsiveScreenHeight,
 responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
//   alignItems: 'center',
//   paddingTop: moderateScale(21),
//   padding: 8
 },
 header: {

  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

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
  fontSize: ms(13),
  fontFamily:fonts.medium,
  fontWeight:'700',
  marginVertical: mvs(20),
  color: '#000',marginLeft:ms(10)
 },

 levelButton: {
  backgroundColor: colors.black,
  borderRadius: 10,
  width: moderateScale(290),
  height: moderateScale(38),
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf:'center'
 },
 levelText: {
  color: '#fff',
  fontSize: 16
 }
});
