import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { AppThemeColors } from '../../theme/colors';
import { useAppTheme } from '../../theme/ThemeProvider';
import spacing from '../../theme/spacing';
import sizes from '../../theme/sizes';

type CommonCardProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
}>;

const CommonCard = ({ children, style, padded = true }: CommonCardProps) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  return <View style={[styles.card, padded && styles.padded, style]}>{children}</View>;
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: sizes.radius.lg,
    borderWidth: 1,
  },
  padded: {
    padding: spacing.lg,
  },
});

export default CommonCard;
