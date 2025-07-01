import { StyleSheet } from 'react-native';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20
 },
 logoStyle: {
  width: moderateScale(260),
  height: moderateScale(67),
  bottom: 7
 },
 title: {
  fontStyle: 'italic',
  fontSize: 20,
  marginBottom: 0,
  color: '#000'
 },

 inputContainer: {
  width: '72%',
  marginBottom: 15,
  marginTop: '3%'
 },
 label: {
  marginBottom: 5,
  fontFamily: fonts.medium,
  color: colors.black
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
 loginButton: {
  backgroundColor: '#000',
  paddingVertical: moderateScale(14),
  paddingHorizontal: moderateScale(14),
  borderRadius: 11,
  width: '72%',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '7%'
 },
 loginText: {
  color: colors.white,
  fontFamily: fonts.medium,
  fontSize: 16
 },
 orText: {
  marginVertical: 15,
  fontSize: 15,
  color: colors.black,
  fontFamily: fonts.regular,
  marginTop: '7%'
 },
 registerText: {
  color: colors.black,
  textDecorationLine: 'underline',
  fontSize: 14,
  fontFamily: fonts.regular
 }
});
