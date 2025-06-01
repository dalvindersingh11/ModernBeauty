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
  alignSelf: 'center',marginTop:mvs(10)
 },
 backIcon: {
  width: ms(18),
  height: mvs(16)
 },
 title: {
  fontSize: ms(24),
  fontWeight: '700',
  color: '#000'
 },
 emptySpace: {
  width: ms(18),
  height: mvs(16)
 },
 label: {
  fontSize: ms(16),
  fontWeight: '700',
  color: '#000'
 },
 inputBox: {
  backgroundColor: '#fff',
  borderRadius: ms(6),
  gap: mvs(10),
  paddingHorizontal: mvs(10),
  alignItems: 'flex-start',
  height: mvs(44)
 },

});

export default Styles;
