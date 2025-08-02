import { StyleSheet } from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import colors from '../../Constant/colors';
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
 headerTitle: {
  color: colors.black,
  fontSize: ms(24),
  fontFamily: fonts.medium,
  alignSelf: 'center'
 },
 spacer: {
  width: ms(18),
  height: mvs(16)
 },
 subscriptionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: ms(20),
  marginTop: mvs(30)
 },
 subscriptionInfo: {
  gap: 5
 },
 purchaseDate: {
  color: colors.black,
  fontSize: ms(10),
  fontFamily: fonts.medium
 },
 priceRow: {
  flexDirection: 'row'
 },
 price: {
  color: colors.black,
  fontSize: ms(19),
  fontFamily: fonts.medium
 },
 perMonth: {
  color: colors.black,
  fontSize: ms(10),
  fontFamily: fonts.medium,
  marginLeft: ms(3)
 },
 manageBtn: {
  backgroundColor: 'black',
  paddingVertical: mvs(4),
  paddingHorizontal: ms(12),
  borderRadius: ms(9)
 },
 manageBtnText: {
  color: colors.white,
  fontSize: ms(11),
  fontFamily: fonts.medium
 }
});

export default Styles;
