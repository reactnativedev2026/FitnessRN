import { StyleSheet } from 'react-native';
import { color } from '../../../theme/colors';
import { hp, wp } from '../../../utils/Constant';

export const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary
  },
  logo: {
    width: wp(60),
    height: hp(40),
  },
});
