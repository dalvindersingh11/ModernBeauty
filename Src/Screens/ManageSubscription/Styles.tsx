import { StyleSheet } from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import colors from '../../Constant/colors';

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgrounColor,
  },
  container: {
   gap: mvs(10),
  width:"90%",alignSelf:'center',paddingHorizontal:ms(8),paddingTop:mvs(20)
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIcon: {
    width: ms(18),
    height: mvs(16),
  },
  headerTitle: {
    fontSize: ms(24),
    fontWeight: '700',
    color: '#000',alignSelf:'center'
  },
  spacer: {
    width: ms(18),
    height: mvs(16),
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ms(20),
    marginTop: mvs(30),
  },
  subscriptionInfo: {
    gap: 5,
  },
  purchaseDate: {
    fontSize: ms(10),
    fontWeight: '600',
    color: '#000',
  },
  priceRow: {
    flexDirection: 'row',
  },
  price: {
    fontSize: ms(19),
    fontWeight: '600',
    color: '#000',
  },
  perMonth: {
    fontSize: ms(10),
    fontWeight: '600',
    color: '#000',
    marginLeft: ms(3),
  },
  manageBtn: {
    backgroundColor: 'black',
    paddingVertical: mvs(2),
    paddingHorizontal: ms(8),
    borderRadius: ms(9),
  },
  manageBtnText: {
    color: '#fff',
    fontSize: ms(11),
    fontWeight: '500',
  },
});

export default Styles;
