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
  padding: 6
 },

 heading: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#000',
  marginBottom: 40
 },
 label: {
  fontWeight: '600',
  color: colors.black,
  fontSize: 16,
  right: 6,
  fontFamily: fonts.medium,
  marginBottom: 10
 },
 otpContainer: {
  flexDirection: 'row',
  gap: 14,
  marginBottom: 25
 },
 otpInput: {
  width: moderateScale(47),
  height: moderateScale(47),
  padding: 5,
  borderWidth: 4.5,
  borderColor: '#000',
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  fontSize: 18,
  // right: 16,
  backgroundColor: colors.backgrounColor
 },
 verifyButton: {
  width: '58%',
  height: moderateScale(38),
  backgroundColor: '#000',
  justifyContent: 'center',
  alignSelf: 'center',
  alignItems: 'center',
  borderRadius: 9,
  marginTop: '5%'
 },
 verifyText: {
  color: colors.white,
  fontFamily: fonts.medium,
  fontSize: 16
 }
});
