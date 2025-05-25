import { StyleSheet } from 'react-native';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { moderateScale } from 'react-native-size-matters';
import {
 responsiveScreenHeight,
 responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
  alignItems: 'center'
 },
 header: {
  width: '90%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
 },
 brand: {
  fontSize: 12,
  fontFamily: 'cursive',
  color: '#000'
 }
});
