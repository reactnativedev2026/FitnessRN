import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenNameEnum from '../../routes/screenName.enum';
import { AppThemeColors } from '../../theme/colors';
import fonts from '../../theme/fonts';
import sizes from '../../theme/sizes';
import spacing from '../../theme/spacing';
import { useAppTheme } from '../../theme/ThemeProvider';

type ScreenHeaderProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  showNotification?: boolean;
};

const ScreenHeader = ({ title, style, showNotification = true }: ScreenHeaderProps) => {
  const navigation = useNavigation<any>();
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity activeOpacity={0.82} style={styles.iconButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={sizes.icon.lg} color={theme.colors.icon} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {showNotification ? (
        <TouchableOpacity
          activeOpacity={0.82}
          style={styles.iconButton}
          onPress={() => navigation.navigate(ScreenNameEnum.NotificationsScreen)}
        >
          <Ionicons name="notifications" size={sizes.icon.md} color={theme.colors.icon} />
          <View style={styles.dot} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconButton} />
      )}
    </View>
  );
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10
  },
  iconButton: {
    alignItems: 'center',
    height: 55,
    justifyContent: 'center',
    width: 36,
  },
  title: {
    color: "white",
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: 17,
    fontWeight: '900',
    marginLeft: spacing.sm,
  },
  dot: {
    backgroundColor: colors.primary,
    borderColor: colors.background,
    borderRadius: 5,
    borderWidth: 1,
    height: 8,
    position: 'absolute',
    right: 8,
    top: 7,
    width: 8,
  },
});

export default ScreenHeader;
