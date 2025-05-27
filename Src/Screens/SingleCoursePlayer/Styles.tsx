import { StyleSheet } from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import fonts from '../../Constant/Fonts';
import colors from '../../Constant/colors';


export default StyleSheet.create({

  container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
  
//   alignItems: 'center',
//   paddingTop: moderateScale(21),
 },
 header: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
 alignSelf:'center'
 },

 profileIcon: {
  width: moderateScale(35),
  height: moderateScale(35),
  borderRadius: 20
 },
title: {
  fontSize: ms(13),
  fontFamily:fonts.medium,
  fontWeight:'700',
//   marginVertical: mvs(20),
  color: '#000'
 },
 videoBox: {
  width: "100%",
  height: moderateScale(185),
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
 },
 subtitle: {
  fontFamily: fonts.regular,
  fontSize: 13,
  color: colors.textColor
 },
 playButton: {
  backgroundColor: colors.tomato,
  width: moderateScale(48),
  height: moderateScale(48),
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center'
 },
 playIcon: {
  color: '#fff',
  fontSize: 40,
  bottom: 6,
  left: 1
 },
 video: {
  width: '100%',
  height: '100%'
 },


});
