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
  backgroundColor: colors.backgrounColor,
 },
 contentWrapper: {
  gap: mvs(10),
  width:"90%",alignSelf:'center',paddingHorizontal:ms(8),paddingTop:mvs(10)
 },
 brandingContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
 },
 logo: {
  height: ms(20),
  width: ms(76),
 },
 userImage: {
  width: 40,
  height: 40,
  borderRadius: 20,
 },
 header: {
  flexDirection: 'row',
  alignSelf: 'center',
 },
 backIcon: {
  width: ms(18),
  height: mvs(16),
  borderRadius: 20,
 },
 title: {
  fontSize: ms(24),
  fontWeight: '700',
  color: '#000',
 },
//  placeholder: {
//   width: ms(18),
//   height: mvs(16),
//  },
 sectionTitle: {
  fontSize: ms(16),
  fontWeight: '600',
  color: '#000',
 },
 card: {
  backgroundColor: '#dbbfb4',
  borderRadius: ms(6),
  gap: mvs(10),
  padding: mvs(10),
  alignItems: 'flex-start',
 },
 row: {
  flexDirection: 'row',
  alignItems: 'center',
 },
 icon: {
  width: ms(20),
  height: mvs(20),
  borderRadius: 20,
 },
 optionText: {
  fontSize: ms(16),
  fontWeight: '600',
  color: '#000',
  marginLeft: ms(20),
 }
});
