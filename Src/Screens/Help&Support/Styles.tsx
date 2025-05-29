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
    padding: ms(12),
  },
  brandingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appLogo: {
    height: moderateScale(20),
    width: moderateScale(76),
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    color: '#000',
  },
  helpPlusIcon: {
    width: ms(24.22),
    height: ms(24.22),
    resizeMode: 'contain',
  },
  noTicketContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTicketText: {
    fontSize: ms(12),
    fontWeight: '400',
    color: '#000',
  },
});

export default Styles;
