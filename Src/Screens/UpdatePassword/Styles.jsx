import { StyleSheet } from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import {
 responsiveScreenHeight,
 responsiveScreenWidth
} from 'react-native-responsive-dimensions';
const Styles = StyleSheet.create({
 safeArea: {
  flex: 1,
  backgroundColor: colors.backgrounColor
 },
 container: {
  gap: mvs(10),

  alignSelf: 'center',
  //   paddingHorizontal: ms(8),
  paddingTop: mvs(20)
 },
 headerRow: {
  alignSelf: 'center',
  marginTop: responsiveScreenHeight(5)
 },
 backIcon: {
  width: ms(18),
  height: mvs(16),
  bottom: moderateScale(13),
  right: responsiveScreenWidth(14)
 },
 title: {
   color: colors.black,
  fontSize: ms(24),
  fontFamily: fonts.bold,
  //   marginTop: responsiveScreenHeight(3)
 },
 emptySpace: {
  width: ms(18),
  height: mvs(16)
 },
 label: {
  color: colors.black,
  fontSize: ms(15),
  fontFamily: fonts.bold,
  marginLeft: responsiveScreenWidth(11)
 },
 inputBox: {
  backgroundColor: '#fff',
  borderRadius: ms(6),
  color: colors.black,
  gap: mvs(10),
  alignSelf: 'center',
  paddingHorizontal: mvs(10),
  alignItems: 'center',
  width: '80%',
  marginTop: '5%',
  height: mvs(44),  color: colors.black,
  fontSize: ms(12),
  fontFamily: fonts.regular,
 },
 loginButton: {
  backgroundColor: '#000',
  paddingVertical: moderateScale(11),
  borderRadius: ms(10),
  alignSelf: 'center',
  width: '80%',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '12%'
 },
 loginText: {
  color: colors.white,
  fontFamily: fonts.medium,
  fontSize: 16
 }
});

export default Styles;
