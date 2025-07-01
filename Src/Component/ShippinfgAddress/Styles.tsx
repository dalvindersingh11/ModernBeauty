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
  //   backgroundColor: colors.backgrounColor,
  alignItems: 'center',
  paddingTop: moderateScale(8),
  padding: 1
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
  fontWeight: 'bold'
 },
 stepContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  //   marginVertical: 15,
  //   marginTop: '-3%',
  padding: ms(12)
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
 input: {
  backgroundColor: '#fff',
  borderRadius: 9,
  color: colors.black,
  fontFamily: fonts.regular,
  height: moderateScale(45),
  paddingHorizontal: 11,
  paddingVertical: moderateScale(10),
  fontSize: 16
 },
 viewInput: {
  backgroundColor: '#fff',
  borderRadius: 9,
  justifyContent: 'space-between',
  alignItems: 'center',
  height: moderateScale(45),
  paddingHorizontal: 11,
  paddingVertical: moderateScale(10),
  marginTop: '4%'
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
 arrowStyle: {
  alignSelf: 'flex-start',
  width: responsiveScreenWidth(20),
  right: responsiveScreenWidth(10)
 },
 dropdown: {
  height: 30,
  width: '100%',
  paddingHorizontal: 3
 },
 icon: {
  marginRight: 5
 },
 dropDownLabel: {
  position: 'absolute',
  backgroundColor: 'white',
  left: 22,
  top: 8,
  zIndex: 999,
  paddingHorizontal: 8,
  fontSize: 14
 },
 placeholderStyle: {
  fontSize: 16
 },
 selectedTextStyle: {
  fontSize: 16
 },
 iconStyle: {
  width: moderateScale(30),
  height: moderateScale(30),
  color: colors.black
 },
 inputSearchStyle: {
  height: 40,
  fontSize: 16
 },
 phoneInputWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 8,
  //  paddingHorizontal: 10,
  marginBottom: 16,
  backgroundColor: '#fff',
  height: mvs(44)
 },
 callingCodeBox: {
  paddingHorizontal: 10,
  paddingVertical: 12,
  borderRightWidth: 1,
  borderColor: '#ccc'
 },
 callingCodeText: {
  fontSize: 16,
  color: '#000'
 },
 phoneInput: {
  flex: 1,
  color: colors.black,
  paddingLeft: 10,
  fontSize: 16
 }
});
