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
  headerSpacer: {
    width: ms(18),
    height: mvs(16),
  },
  bodyText: {
    fontSize: ms(10),
    fontWeight: '400',
    color: '#000',
    paddingHorizontal: 20,
    marginTop: mvs(20),
    lineHeight: 18,
  },
});

export default Styles;
