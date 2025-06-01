import { StyleSheet } from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import colors from '../../Constant/colors';

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
  fontSize: ms(24),
  fontWeight: '700',
  color: '#000'
 },
 helpPlusIcon: {
  width: ms(24.22),
  height: ms(24.22),
  resizeMode: 'contain',padding:1
 },
 noTicketContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
 },
 noTicketText: {
  fontSize: ms(12),
  fontWeight: '400',
  color: '#000'
 }
});

export default Styles;
