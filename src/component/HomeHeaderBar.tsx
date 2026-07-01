import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppThemeColors } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeProvider';
import fonts from '../theme/fonts';
import spacing from '../theme/spacing';
import sizes from '../theme/sizes';

type HomeHeaderBarProps = {
  location?: string;
  lable?: string;
  style1?: StyleProp<TextStyle>;
  onNotificationPress?: () => void;
  hasNotification?: boolean;
};

const HomeHeaderBar = ({
  location = 'Johan Smiths',
  lable = 'Welcome,',
  style1,
  onNotificationPress,
  hasNotification = true,
}: HomeHeaderBarProps) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  return (
    <View>
      <Text style={styles.label}>{lable}</Text>
      <View style={styles.container}>
        <Text style={[styles.locationText, style1]}>{location}</Text>
        <TouchableOpacity style={styles.notificationContainer} onPress={onNotificationPress}>
          <Icon name="notifications-outline" size={sizes.icon.lg} color={theme.colors.icon} />
          {hasNotification ? <View style={styles.badge} /> : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationText: {
    bottom: 6,
    color: colors.text,
    fontFamily: fonts.medium,
    fontSize: 15,
    fontWeight: '500',
  },
  label: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: 12,
    fontWeight: '800',
  },
  notificationContainer: {
    alignItems: 'center',
    backgroundColor: colors.chip,
    borderRadius: sizes.radius.round,
    height: 44,
    justifyContent: 'center',
    position: 'relative',
    width: 44,
  },
  badge: {
    backgroundColor: colors.primary,
    borderColor: colors.background,
    borderRadius: 5,
    borderWidth: 2,
    height: 10,
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
    width: 10,
  },
});

export default HomeHeaderBar;
