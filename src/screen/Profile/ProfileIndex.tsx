import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import imageIndex from '../../assets/imageIndex';
import font from '../../theme/font';
import ScreenNameEnum from '../../routes/screenName.enum';
import LogoutModal from '../../component/LogoutModal';
import { logout } from '../../redux/feature/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../component/common/CustomHeader';
import { IMAGE_URL } from '../../Api';


const ProfileIndex = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state: any) => state.auth);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const menuItems = [
    {
      id: 1,
      title: 'Profile',
      icon: imageIndex.profileCircle,
      onPress: () => navigation.navigate(ScreenNameEnum.EditProfile as never),
    },
    {
      id: 2,
      title: 'Notifications',
      icon: imageIndex.notificationCircle,
      onPress: () => navigation.navigate(ScreenNameEnum.NotificationsSetting as never),
    },
    // {
    //   id: 3,
    //   title: 'Appearance',
    //   icon: imageIndex.appearanceCircle,
    //   onPress: () => { }, // Placeholder
    // },
    {
      id: 4,
      title: 'About us',
      icon: imageIndex.aboutusCircle,
      onPress: () => navigation.navigate(ScreenNameEnum.ABOUT_US as never),
    },
    {
      id: 5,
      title: 'Privacy Policy',
      icon: imageIndex.privacyCircle,
      onPress: () => navigation.navigate(ScreenNameEnum.PrivacyPolicy as never),
    },
    {
      id: 6,
      title: 'Terms & Conditions',
      icon: imageIndex.aboutusCircle,
      onPress: () => navigation.navigate(ScreenNameEnum.LegalPoliciesScreen as never),
    },
    {
      id: 7,
      title: 'Contact Us',
      icon: imageIndex.aboutusCircle,
      onPress: () => navigation.navigate(ScreenNameEnum.Help as never),
    },
  ];



  const handleLogout = async () => {
    setLogoutModalVisible(false);
    await AsyncStorage.removeItem('token');
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenNameEnum.Login as never }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CustomHeader
        label={"Profile"}
        menuIcon={imageIndex.back}
        leftPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Info Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                userData?.profile_image_url || userData?.profile_image
                  ? {
                    uri: (() => {
                      const img = userData.profile_image_url || userData.profile_image;
                      if (img.startsWith('http://') || img.startsWith('https://')) return img;
                      return `${IMAGE_URL}${img.startsWith('/') ? img : '/' + img}`;
                    })()
                  }
                  : imageIndex.profile
              }
              style={styles.avatar}
            />
          </View>
          <Text style={styles.userName}>{userData?.name || 'Anita Torres'}</Text>
          <Text style={styles.userDetails}>{userData?.mobile_number || '+9383380527910'}</Text>
          <Text style={styles.userDetails}>{userData?.email || 'sharon_ray@icloud.com'}</Text>
        </View>

        {/* Menu Items Section */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuLeft}>
                <Image source={item.icon} style={styles.menuIcon} resizeMode="contain" />
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#0066FF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setLogoutModalVisible(true)}
        >
          <Icon name="log-out-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <LogoutModal
        visible={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onLogout={handleLogout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B18', // Deep dark background matching screenshot
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: font.TrialBold,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#0066FF',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  userName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: font.TrialBold,
    marginBottom: 5,
  },
  userDetails: {
    color: '#9CA3AF',
    fontSize: 14,
    fontFamily: font.TrialRegular,
    marginBottom: 2,
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 36,
    height: 36,
    marginRight: 15,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: font.TrialRegular,
  },
  logoutButton: {
    backgroundColor: '#FF4B4B', // Vibrant red matching screenshot
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 40,
    height: 56,
    borderRadius: 18,
    shadowColor: '#FF4B4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: font.TrialBold,
  },
});

export default ProfileIndex;
