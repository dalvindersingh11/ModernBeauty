import { StyleSheet } from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

const Styles = StyleSheet.create({
 safeArea: {
  flex: 1,
  backgroundColor: colors.backgrounColor
 },
 container: {
  gap: mvs(10),
  width: '90%',
  alignSelf: 'center',
  paddingHorizontal: ms(8),
  paddingTop: mvs(20)
 },
 headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
 },
 backIcon: {
  width: ms(18),
  height: mvs(16)
 },
 title: {
  fontSize: ms(24),
  fontFamily: fonts.medium,
  color: '#000',
  alignSelf: 'center'
 },
 emptySpace: {
  width: ms(18),
  height: mvs(16)
 },
 label: {
  fontSize: ms(16),
  fontFamily: fonts.medium,
  color: '#000',
  marginTop: responsiveScreenHeight(3)
 },
 inputBox: {
  backgroundColor: '#fff',
  borderRadius: ms(6),
  gap: mvs(10),
  color: colors.black,
  fontFamily: fonts.regular,
  paddingHorizontal: mvs(10),
  alignItems: 'flex-start',
  height: mvs(44)
 },
 messageBox: {
  backgroundColor: '#fff',
  borderRadius: ms(6),
  gap: mvs(10),
  padding: mvs(10),
  alignItems: 'flex-start',
  minHeight: mvs(161)
 },
 bottomButton: {
  backgroundColor: colors.black,
  borderRadius: 10,
  padding: 10,
  marginTop: 20,
  justifyContent: 'center',
  alignItems: 'center'
 },
 buttonText: {
  color: '#fff',
  fontSize: 16,
  fontFamily: fonts.regular
 }
});

export default Styles;
