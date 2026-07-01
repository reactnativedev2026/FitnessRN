import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppThemeColors } from '../../theme/colors';
import { useAppTheme } from '../../theme/ThemeProvider';
import fonts from '../../theme/fonts';
import spacing from '../../theme/spacing';

const { height } = Dimensions.get('window');

type CommonEmptyStateProps = {
  message?: string;
  description?: string;
  icon?: string;
};

const CommonEmptyState = ({
  message = 'No data found.',
  description = 'New items will appear here.',
  icon = 'cube-outline',
}: CommonEmptyStateProps) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Icon name={icon} size={60} color={theme.colors.iconMuted} />
      </View>
      <Text allowFontScaling={false} style={styles.title}>{message}</Text>
      <Text allowFontScaling={false} style={styles.description}>{description}</Text>
    </View>
  );
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    alignItems: 'center',
    height: height * 0.6,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.divider,
    borderRadius: 60,
    borderWidth: 1,
    height: 120,
    justifyContent: 'center',
    marginBottom: spacing.xxl,
    width: 120,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 20,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    color: colors.textMuted,
    fontFamily: fonts.mono,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default CommonEmptyState;
