import { StyleSheet } from 'react-native';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { moderateScale, moderateVerticalScale, ms, mvs } from 'react-native-size-matters';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
  alignItems: 'center',
  paddingTop: moderateScale(10),
paddingHorizontal:ms(10)
 },
 header: {
//   width: '90%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
 },
 brand: {
  fontSize: 12,
  fontFamily:fonts.bold,
  color: '#000'
 },
 profileIcon: {
  width: 40,
  height: 40,
  borderRadius: 20
 },
 title: {
  fontSize: 30,
  fontFamily: fonts.bold,
  marginTop: mvs(10),
  color: '#000'
 },
 subtitle: {
  fontSize: 14,
  textAlign: 'center',
  fontFamily: fonts.regular,
  color: colors.black,
  marginTop: mvs(5)
 },
 giftImage: {
//   width: moderateScale(285),
  height: mvs(130),
  resizeMode: 'contain',
  marginTop: moderateVerticalScale(10)
 },
 planBox: {
//   width: moderateScale(282),
  //   height: moderateScale(75),
  backgroundColor: colors.planColor,
  borderRadius: 12,
  padding: 15,
  marginBottom: 15,
  borderWidth: 1.6,
  borderColor: 'transparent',
  height:mvs(90)
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
  //   marginTop: responsiveScreenHeight(4),
  width:"80%",
  padding: moderateScale(15)
 },
 disableButton: {
  backgroundColor: colors.backgrounColor,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: colors.black,
  justifyContent: 'center',
  alignItems: 'center',
  //   marginTop: responsiveScreenHeight(4),
  width:"80%",
  padding: moderateScale(15)
 },
 proceedText: {
  color: colors.white,
  fontSize: 16,
  textAlign: 'center',
  fontFamily: fonts.medium
 },
 disableText: {
  color: colors.black,
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
