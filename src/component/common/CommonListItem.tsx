import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppThemeColors } from '../../theme/colors';
import { useAppTheme } from '../../theme/ThemeProvider';
import fonts from '../../theme/fonts';
import spacing from '../../theme/spacing';
import sizes from '../../theme/sizes';
import CommonDivider from './CommonDivider';

type CommonListItemProps = {
  title: string;
  subtitle?: string;
  icon?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  showDivider?: boolean;
  style?: StyleProp<ViewStyle>;
};

const CommonListItem = ({
  title,
  subtitle,
  icon,
  right,
  onPress,
  showDivider = true,
  style,
}: CommonListItemProps) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);
  const Container = onPress ? TouchableOpacity : View;

  return (
    <>
      <Container activeOpacity={0.82} onPress={onPress} style={[styles.container, style]}>
        {icon ? (
          <View style={styles.iconCircle}>
            <Icon name={icon} size={sizes.icon.md} color={theme.colors.primaryDark} />
          </View>
        ) : null}
        <View style={styles.textColumn}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {right || (onPress ? <Icon name="chevron-forward" size={sizes.icon.md} color={theme.colors.primaryDark} /> : null)}
      </Container>
      {showDivider ? <CommonDivider /> : null}
    </>
  );
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 64,
    paddingVertical: spacing.md,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    marginRight: spacing.lg,
    width: 36,
  },
  textColumn: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});

export default CommonListItem;
