import { StyleSheet } from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import colors from '../../Constant/colors';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import fonts from '../../Constant/Fonts';

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
  fontWeight: '700',
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
  marginLeft: responsiveScreenWidth(7)
 },
 inputBox: {
  backgroundColor: '#fff',
  borderRadius: ms(6),
  gap: mvs(10),
  color: colors.black,
  fontFamily: fonts.regular,
  width: '85%',
  alignSelf: 'center',
  paddingHorizontal: mvs(10),
  alignItems: 'flex-start',
  height: mvs(44)
 },
 messageBox: {
  backgroundColor: '#fff',
  borderRadius: ms(6),
  width: '85%',
  alignSelf: 'center',
  color: colors.black,
  fontFamily: fonts.regular,
  gap: mvs(10),
  padding: mvs(10),
  alignItems: 'flex-start',
  minHeight: mvs(141)
 }
});

export default Styles;
