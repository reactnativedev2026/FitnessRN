import { StyleSheet } from 'react-native';
// Removed static color import;
import { hp, wp } from '../../../utils/Constant';
import { useAppTheme } from '../../../theme/ThemeProvider';


const createStyles = (theme: any) => StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary
  },
  logo: {
    width: wp(60),
    height: hp(40),
  },
});
