import { StyleSheet } from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgrounColor,
  },
  container: {
   gap: mvs(10),
  width:"90%",alignSelf:'center',paddingHorizontal:ms(8),paddingTop:mvs(10)
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
  title: {
     color: colors.black,
  fontSize: ms(24),
  fontFamily: fonts.bold,alignSelf:'center'
  },
  emptySpace: {
    width: ms(18),
    height: mvs(16),
  },
  description: {
  color: colors.black,
  fontSize: ms(10),
  fontFamily: fonts.regular,
    paddingHorizontal: 20,
    marginTop: mvs(20),
    marginBottom:mvs(40),
    lineHeight: 15,
  },
});

export default Styles;
