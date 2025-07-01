import { StyleSheet } from 'react-native';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { moderateScale, mvs } from 'react-native-size-matters';
import {
 responsiveScreenHeight,
 responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
  alignItems: 'center',
  width: '90%',
  alignSelf: 'center'
 },
 header: {
  // width: '90%',
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
 inputContainer: {
  width: '93%',
  marginBottom: 15,
  marginTop: '3%'
 },
 title: {
  fontSize: 19,
  fontFamily: fonts.medium,
  marginTop: responsiveScreenHeight(2),
  color: '#000'
 },
 label: {
  marginBottom: 5,
  fontFamily: fonts.medium,
  color: colors.black
 },
 navRow: {
  flexDirection: 'row',
  //   alignItems: 'center',
  width: responsiveScreenWidth(65),
  alignSelf: 'center',
  marginVertical: 20
 },
 checkoutText: {
  fontSize: 20,
  fontWeight: 'bold',
  marginVertical: mvs(10)
  //   marginLeft: 12
 },
 stepContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  //   marginVertical: 15,
  marginTop: '-3%',
  padding: 12
 },
 arrowStyle: {
  alignSelf: 'flex-start',
  width: responsiveScreenWidth(20),
  right: responsiveScreenWidth(10)
 },
 step: {
  alignItems: 'center'
 },
 separator: {
  flex: 1,
  height: 1,
  backgroundColor: '#000',
  marginHorizontal: 5
 },
 stepLabel: {
  fontSize: 12
 },
 levelButton: {
  backgroundColor: colors.black,
  borderRadius: 10,
  width: moderateScale(290),
  height: moderateScale(38),
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: responsiveScreenHeight(4)
 },
 levelText: {
  color: '#fff',
  fontSize: 16
 },
 input: {
  backgroundColor: '#fff',
  borderRadius: 13,
  color: colors.black,
  fontFamily: fonts.regular,
  height: moderateScale(45),
  paddingHorizontal: 11,
  paddingVertical: moderateScale(10),
  fontSize: 16
 },
 bottomView: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '95%',
  padding: 6
 }
});
