import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import imageIndex from '../../assets/imageIndex';
import font from '../../theme/font';
import ScreenNameEnum from '../../routes/screenName.enum';
import LogoutModal from '../../component/LogoutModal';
import { logout } from '../../redux/feature/authSlice';
import ScreenHeader from '../../component/common/ScreenHeader';
import { IMAGE_URL } from '../../api';
import { useAppTheme } from '../../theme/ThemeProvider';
import StatusBarComponent from '../../component/common/StatusBarCompoent';
import CommonToggleSwitch from '../../component/common/CommonToggleSwitch';
import { resetToLogin } from '../../routes/navigationService';
import { color } from '../../theme';

const BLACK = {
  background: '#050505',
  card: '#111111',
  surface: '#181818',
  surface2: '#1F1F1F',
  border: '#262626',
  primary: '#FFB19F',
  primarySoft: 'rgba(255,122,0,0.14)',
  text: '#FFFFFF',
  textMuted: '#A1A1AA',
  textSoft: '#D4D4D8',
  danger: '#FF3B30',
};

const ProfileIndex = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: any) => state.auth);

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const { isDark, setThemeMode } = useAppTheme();

  const transition = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    transition.setValue(0.96);
    Animated.spring(transition, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
      tension: 80,
    }).start();
  }, [isDark]);

  const getProfileImage = () => {
    const img = userData?.profile_image_url || userData?.profile_image;

    if (!img) return imageIndex.prfile;

    if (img.startsWith('http://') || img.startsWith('https://')) {
      return { uri: img };
    }

    return {
      uri: `${IMAGE_URL}${img.startsWith('/') ? img : '/' + img}`,
    };
  };

  const menuItems = [

    {
      id: 2,
      title: 'Fitness Profile',
      subtitle: 'View performance and biometric details',
      icon: 'fitness-outline',
      onPress: () => navigation.navigate(ScreenNameEnum.FitnessProfileScreen),
    },
    {
      id: 3,
      title: 'Primary Focus',
      subtitle: 'Update your training focus',
      icon: 'locate-outline',
      onPress: () => navigation.navigate(ScreenNameEnum.PrimaryFocusScreen),
    },
    {
      id: 4,
      title: 'Fasting Protocol',
      subtitle: 'Choose and start a fasting plan',
      icon: 'timer-outline',
      onPress: () => navigation.navigate(ScreenNameEnum.FastingProtocolScreen),
    },
    // {
    //   id: 5,
    //   title: 'WatchLock',
    //   subtitle: 'WatchLock',
    //   icon: 'watch-outline',
    //   onPress: () => navigation.navigate(ScreenNameEnum.WatchLock),
    // },

    {
      id: 7,
      title: 'Privacy Policy',
      subtitle: 'View our privacy policy',
      icon: 'shield-checkmark-outline',
      onPress: () => navigation.navigate(ScreenNameEnum.PrivacyPolicy),
    },

    {
      id: 8,
      title: 'Dark Mode',
      subtitle: 'Premium black fitness theme',
      icon: isDark ? 'moon' : 'sunny-outline',
      isToggle: true,
    },
  ];


  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />


      <Animated.View
        style={[
          styles.animatedContent,
          { transform: [{ scale: transition }] },
        ]}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>

          <View style={styles.profileCard}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarOuter}>
                <Image source={getProfileImage()} style={styles.avatar} />
              </View>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.cameraBtn}
                onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)}>
                <Icon name="camera-outline" size={16} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={styles.userName}>
              {userData?.name || 'Anita Torres'}
            </Text>

            <Text style={styles.userGoal}>Goal: Lean Body Transformation</Text>

            <View style={styles.contactCard}>
              <View style={styles.contactRow}>
                <Icon name="call-outline" size={15} color={BLACK.primary} />
                <Text style={styles.contactText}>
                  {userData?.mobile_number || '+9383380527910'}
                </Text>
              </View>

              <View style={styles.contactRow}>
                <Icon name="mail-outline" size={15} color={BLACK.primary} />
                <Text style={styles.contactText}>
                  {userData?.email || 'sharon_ray@icloud.com'}
                </Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>42</Text>
                <Text style={styles.statLabel}>Workouts</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statBox}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Streak</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statBox}>
                <Text style={styles.statValue}>8.5k</Text>
                <Text style={styles.statLabel}>Calories</Text>
              </View>
            </View>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View>
                <Text style={styles.progressTitle}>Weekly Progress</Text>
                <Text style={styles.progressSub}>Keep your rhythm strong</Text>
              </View>

              <View style={styles.percentBadge}>
                <Text style={styles.percentText}>78%</Text>
              </View>
            </View>

            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <View style={styles.menuContainer}>
            <Text style={styles.sectionTitle}>Account Settings</Text>

            {menuItems.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                disabled={item.isToggle}
                onPress={item.onPress}
                style={styles.menuItem}>

                <View style={styles.menuLeft}>
                  <View style={styles.menuIconBox}>
                    <Icon name={item.icon} size={22} color={BLACK.primary} />
                  </View>

                  <View style={styles.menuTextBox}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>

                {item.isToggle ? (
                  <CommonToggleSwitch
                    value={isDark}
                    onValueChange={enabled =>
                      setThemeMode(enabled ? 'dark' : 'light')
                    }
                  />
                ) : (
                  <View style={styles.chevronBox}>
                    <Icon
                      name="chevron-forward"
                      size={18}
                      color={BLACK.textMuted}
                    />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
      </Animated.View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },

  animatedContent: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 145,
  },

  profileCard: {
    borderRadius: 32,
    backgroundColor: BLACK.card,
    borderWidth: 1,
    borderColor: BLACK.border,
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 18,
    marginBottom: 18,
  },

  memberBadge: {
    height: 34,
    borderRadius: 17,
    backgroundColor: BLACK.primary,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  memberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
    marginLeft: 5,
    fontFamily: font.TrialBold,
  },

  avatarWrapper: {
    marginBottom: 16,
  },

  avatarOuter: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: BLACK.surface2,
    borderWidth: 3,
    borderColor: BLACK.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: BLACK.surface,
  },

  cameraBtn: {
    position: 'absolute',
    right: 0,
    bottom: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: BLACK.primary,
    borderWidth: 3,
    borderColor: BLACK.card,
    alignItems: 'center',
    justifyContent: 'center',
  },

  userName: {
    color: BLACK.text,
    fontSize: 24,
    fontWeight: '900',
    fontFamily: font.TrialBold,
  },

  userGoal: {
    color: BLACK.textMuted,
    fontSize: 13,
    marginTop: 5,
    fontFamily: font.TrialRegular,
  },

  contactCard: {
    width: '100%',
    marginTop: 18,
    borderRadius: 22,
    backgroundColor: BLACK.surface,
    borderWidth: 1,
    borderColor: BLACK.border,
    padding: 14,
  },

  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  contactText: {
    color: BLACK.textSoft,
    fontSize: 13,
    marginLeft: 8,
    fontFamily: font.TrialRegular,
    flex: 1,
  },

  statsRow: {
    width: '100%',
    marginTop: 18,
    borderRadius: 24,
    backgroundColor: BLACK.surface,
    borderWidth: 1,
    borderColor: BLACK.border,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statBox: {
    flex: 1,
    alignItems: 'center',
  },

  statValue: {
    color: BLACK.text,
    fontSize: 20,
    fontWeight: '900',
    fontFamily: font.TrialBold,
  },

  statLabel: {
    color: BLACK.textMuted,
    fontSize: 11,
    marginTop: 4,
    fontFamily: font.TrialRegular,
  },

  statDivider: {
    width: 1,
    height: 34,
    backgroundColor: BLACK.border,
  },

  progressCard: {
    borderRadius: 26,
    backgroundColor: BLACK.card,
    borderWidth: 1,
    borderColor: BLACK.border,
    padding: 18,
    marginBottom: 18,
  },

  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  progressTitle: {
    color: BLACK.text,
    fontSize: 17,
    fontWeight: '900',
    fontFamily: font.TrialBold,
  },

  progressSub: {
    color: BLACK.textMuted,
    fontSize: 12,
    marginTop: 4,
    fontFamily: font.TrialRegular,
  },

  percentBadge: {
    height: 34,
    borderRadius: 17,
    backgroundColor: BLACK.primarySoft,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },

  percentText: {
    color: BLACK.primary,
    fontSize: 13,
    fontWeight: '900',
    fontFamily: font.TrialBold,
  },

  progressTrack: {
    height: 10,
    borderRadius: 20,
    backgroundColor: BLACK.surface2,
    overflow: 'hidden',
  },

  progressFill: {
    width: '78%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: BLACK.primary,
  },

  menuContainer: {
    borderRadius: 28,
    backgroundColor: BLACK.card,
    borderWidth: 1,
    borderColor: BLACK.border,
    padding: 14,
  },

  sectionTitle: {
    color: BLACK.text,
    fontSize: 18,
    fontWeight: '900',
    fontFamily: font.TrialBold,
    marginBottom: 12,
    marginLeft: 4,
  },

  menuItem: {
    minHeight: 74,
    borderRadius: 22,
    backgroundColor: BLACK.surface,
    borderWidth: 1,
    borderColor: BLACK.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  menuLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuIconBox: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: BLACK.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  menuTextBox: {
    flex: 1,
  },

  menuTitle: {
    color: BLACK.text,
    fontSize: 15,
    fontWeight: '900',
    fontFamily: font.TrialBold,
  },

  menuSubtitle: {
    color: BLACK.textMuted,
    fontSize: 12,
    fontFamily: font.TrialRegular,
    marginTop: 4,
  },

  chevronBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: BLACK.surface2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  logoutButton: {
    backgroundColor: BLACK.danger,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    height: 58,
    borderRadius: 22,
  },

  logoutIcon: {
    marginRight: 10,
  },

  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: font.TrialBold,
  },
});

export default ProfileIndex;
