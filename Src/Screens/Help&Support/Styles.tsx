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
//   paddingHorizontal: ms(8),
  paddingTop: mvs(10)
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
  fontSize: ms(27),
  fontFamily: fonts.medium
 },
 helpPlusIcon: {
  width: ms(24.22),
  height: ms(24.22),
  resizeMode: 'contain',
  padding: 1
 },
 noTicketContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
 },
 noTicketText: {
  color: colors.black,
  fontSize: ms(12),
  fontFamily: fonts.regular
 },
 ticketContainer: {
  backgroundColor: '#f0f0f0',
  borderRadius: 8,
  overflow: 'hidden',
  marginBottom: mvs(12)
 },
 ticketRow: {
  flexDirection: 'row'
 },
 statusBar: {
  backgroundColor: '#544C4C',
  width: 12
 },
 ticketContent: {
  padding: 12,
  flex: 1,
  gap: 5
 },
 subjectRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
 },
 subjectLabel: {
  color: colors.black,
  fontSize: ms(12),
  fontFamily: fonts.bold
 },
 subjectText: {
  color: colors.black,
  fontSize: ms(12),
  fontFamily: fonts.regular
 },
 statusBox: {
  paddingVertical: mvs(1),
  paddingHorizontal: ms(8),
  borderRadius: 5
 },
 statusText: {
  color: colors.white,
  fontSize: ms(10),
  fontFamily: fonts.medium
 },
 messageLabel: {
  color: colors.black,
  fontSize: ms(12),
  fontFamily: fonts.bold
 },
 messageText: {
  color: colors.black,
  fontSize: ms(12),
  fontFamily: fonts.regular
 },
 replyRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
 },
 replyCountRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
 },
 replyIcon: {
  width: 12,
  height: 8,
  marginLeft: 10
 },
 replyButton: {
  backgroundColor: '#000',
  paddingVertical: mvs(2),
  paddingHorizontal: ms(10),
  borderRadius: 5,
  alignSelf: 'flex-end'
 },
 replyButtonText: {
  color: colors.white,
  fontSize: ms(10),
  fontFamily: fonts.medium
 }
});

export default Styles;
