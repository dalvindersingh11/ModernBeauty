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
 },ticketContainer: {
  backgroundColor: '#f0f0f0',
  borderRadius: 8,
  overflow: 'hidden',
  marginBottom: 10,
},
ticketRow: {
  flexDirection: 'row',
},
statusBar: {
  backgroundColor: '#544C4C',
  width: 20,
},
ticketContent: {
  padding: 12,
  flex: 1,
  gap: 5,
},
subjectRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
subjectLabel: {
  fontWeight: 'bold',
},
subjectText: {
  fontWeight: '500',
},
statusBox: {
  paddingVertical: 2,
  paddingHorizontal: 5,
  borderRadius: 5,
},
statusText: {
  fontWeight: '600',
  fontSize: 10,
  color: '#fff',
},
messageLabel: {
  fontWeight: 'bold',
},
messageText: {
  color: '#000',
},
replyRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
replyCountRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
replyIcon: {
  width: 12,
  height: 8,
  marginLeft: 10,
},
replyButton: {
  backgroundColor: '#000',
  paddingVertical: 2,
  paddingHorizontal: 5,
  borderRadius: 5,
  alignSelf: 'flex-end',
},
replyButtonText: {
  fontWeight: '600',
  fontSize: 10,
  color: '#fff',
},
});

export default Styles;
