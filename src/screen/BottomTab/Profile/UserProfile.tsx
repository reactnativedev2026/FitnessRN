import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // using vector icons
import LogoutModal from "../../../compoent/LogoutModal";
import CustomButton from "../../../compoent/CustomButton";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../../../redux/feature/authSlice";
import { useDispatch } from "react-redux";
import { Storage } from "../../../storage";
import { color } from "../../../constant";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import { getProfileApi } from "../../../api/authApi/AuthApi";
import { useSelector } from "react-redux";
import LoadingModal from "../../../utils/Loader";
import imageIndex from "../../../assets/imageIndex";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [logoutModal, setLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const auth = useSelector((state: any) => state.auth);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    fetchProfile(auth?.token);
  };
  const [profile, setProfile] = useState({
    user_name: '',
    email: '',
    image: '',
  });
  const fetchProfile = async (token: string) => {
    const res = await getProfileApi(token, setLoading);
    if (res?.success) {
      setProfile(res?.data?.user_data);
    }
  };
  const menuData = [
    {
      id: "1",
      title: "My Profile",
      icon: "account-circle-outline",
      screen: ScreenNameEnum.EditProfile,
    },
    {
      id: "4",
      title: "Change Password",
      icon: "lock-reset",
      screen: ScreenNameEnum.changePassword,
    },
    {
      id: "4",
      title: "Notification",
      icon: 'bell',
      screen: ScreenNameEnum.NotificationsSetting,
    },
    {
      id: "2",
      title: "Terms and Condition",
      icon: "information-outline",
      screen: ScreenNameEnum.LegalPoliciesScreen,
    },
    {
      id: "3",
      title: "Privacy Policy",
      icon: "shield-lock-outline",
      screen: ScreenNameEnum.PrivacyPolicy,
    },

    {
      id: "5",
      title: "Contact Us",
      icon: "phone-outline",
      screen: ScreenNameEnum.Help,
    },
    {
      id: "7",
      title: "Logout",
      icon: "logout",
      screen: ScreenNameEnum.Help,
    },
  ];

  const handleLogout = async () => {
    setLogoutModal(false);
    dispatch(logout());
    await Storage.remove("LOCK_TYPE");
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenNameEnum.Login }],
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LoadingModal visible={loading} />
      <StatusBarComponent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.profileTitle}>Settings</Text>
        {/* <View style={styles.userCard}>
                        <Image
                          source={{
                            uri:
                              image?.path ||
                              profile.image ||
                              'https://via.placeholder.com/150',
                          }}
                          style={styles.avatar}
                        />
           <View style={{ marginLeft: 15 }}>
            <Text style={styles.userName}>{profile?.user_name}</Text>
            <Text style={styles.username}>{profile?.email}</Text>
          </View>
        </View> */}

        {/* MENU */}
        <FlatList
          data={menuData}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <MenuItem
              title={item.title}
              icon={item.icon}
              onPress={() => {
                if (item.title == 'Logout') {
                  setLogoutModal(true)
                }
                else {
                  navigation.navigate(item.screen)
                }


              }}
            />
          )}
        />

        {/* LOGOUT BUTTON */}
        {/* <View style={{ marginTop: 20 }}>
          <CustomButton
            title="Logout"
            button1={{ backgroundColor: color.primary }}
            onPress={() => setLogoutModal(true)}
          />
        </View> */}

        {/* LOGOUT MODAL */}
        <LogoutModal
          visible={logoutModal}
          onCancel={() => setLogoutModal(false)}
          onLogout={handleLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ title, icon, onPress }: any) => (
  <Pressable style={styles.menuRow} onPress={onPress}>
    <View style={styles.menuLeft}>
      <Icon name={icon} size={28} color={color.primary} style={{ marginRight: 14 }} />
      <Text style={styles.menuText}>{title}</Text>
    </View>
    <Icon name="chevron-right" size={28} color={color.primary} />
  </Pressable>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF" },
  container: { padding: 16, paddingBottom: 40 },
  profileTitle: { fontSize: 26, fontWeight: "600", marginBottom: 20, color: "#000" },
  userCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 18,
    marginBottom: 20,
    alignItems: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 100,

  },
  userName: { fontSize: 18, fontWeight: "500", color: "#000" },
  username: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    borderRadius: 10,
    padding: 16,
    marginVertical: 6,
  },
  menuLeft: { flexDirection: "row", alignItems: "center" },
  menuText: { fontSize: 16, fontWeight: "600", color: "#000" },
});

export default ProfileScreen;
