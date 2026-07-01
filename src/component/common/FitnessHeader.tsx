import React from 'react';
import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenNameEnum from '../../routes/screenName.enum';
import { AppThemeColors } from '../../theme/colors';
import fonts from '../../theme/fonts';
import sizes from '../../theme/sizes';
import spacing from '../../theme/spacing';
import { useAppTheme } from '../../theme/ThemeProvider';
import imageIndex from '../../assets/imageIndex';

type FitnessHeaderProps = {
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  showNotificationDot?: boolean;
};

const FitnessHeader = ({
  style,
  iconSize = sizes.icon.md,
  showNotificationDot = true,
}: FitnessHeaderProps) => {
  const navigation = useNavigation<any>();
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);
  const userData = useSelector((state: any) => state.auth?.userData);
  const displayName = userData?.name || 'Alex Vaccaro';

  return (
    <View style={[styles.header, style]}>
      <View style={styles.userRow}>
        <View style={styles.avatar}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/men/77.jpg" }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 120,
            }}
            resizeMode='cover'
          />
        </View>
        <View>
          <Text style={styles.hello}>Hello!</Text>
          <Text style={styles.name}>{displayName}</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.82}
        style={styles.notificationButton}
        onPress={() => navigation.navigate(ScreenNameEnum.NotificationsScreen)}
      >
        <Ionicons name="notifications" size={iconSize} color={theme.colors.icon} />
        {showNotificationDot ? <View style={styles.dot} /> : null}
      </TouchableOpacity>
    </View>
  );
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    alignItems: 'center',


    justifyContent: 'center',
    marginRight: spacing.md,

  },
  avatarText: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 15,
    fontWeight: '800',
  },
  hello: {
    color: "#ffffff",
    fontFamily: fonts.regular,
    fontSize: 10,
  },
  name: {
    color: "#ffffff",
    fontFamily: fonts.bold,
    fontSize: 20,
    fontWeight: '800',
    marginTop: spacing.xxs,
  },
  notificationButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
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

export default FitnessHeader;
