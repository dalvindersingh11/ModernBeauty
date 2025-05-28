import { StyleSheet } from 'react-native';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import {
 responsiveScreenHeight,
 responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export default StyleSheet.create({
 header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    height: moderateScale(20),
    width: moderateScale(76)
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backIcon: {
    width: ms(18),
    height: mvs(16),
    borderRadius: 20
  },
  avatarWrapper: {
    width: mvs(170),
    height: mvs(170),
    borderRadius: 800,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarInner: {
    width: mvs(165),
    height: mvs(165),
    borderRadius: 800,
    overflow: 'hidden',
    borderWidth: 1
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    zIndex: 999,
    borderWidth: 1,
    padding: 1
  },
  editIconImage: {
    width: ms(26.67),
    height: ms(24)
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
    padding: mvs(10),
    alignItems: 'flex-start'
  },
  dropdownBox: {
    backgroundColor: '#fff',
    borderRadius: ms(6),
    gap: mvs(10),
    padding: mvs(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropdownIcon: {
    height: ms(16.67),
    width: ms(9.81),
    resizeMode: 'contain'
  }
});
