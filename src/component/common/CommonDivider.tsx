import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { AppThemeColors } from '../../theme/colors';
import { useAppTheme } from '../../theme/ThemeProvider';

type CommonDividerProps = {
  style?: StyleProp<ViewStyle>;
};

const CommonDivider = ({ style }: CommonDividerProps) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  return <View style={[styles.divider, style]} />;
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
  },
});

export default CommonDivider;
