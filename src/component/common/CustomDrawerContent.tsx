import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import imageIndex from "../../assets/imageIndex";
import ScreenNameEnum from "../../routes/screenName.enum";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "./StatusBarCompoent";
import LogoutModal from "../LogoutModal";
import { logout } from "../../redux/feature/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { color } from "../../constant";

// -------- Menu Data --------
const menuItems = [
  { id: "11", title: "Dashboard", icon: imageIndex.multiUser, screen: ScreenNameEnum.DashBoardScreen },
  { id: "13", title: "Announcements", icon: imageIndex.no1, screen: ScreenNameEnum.AnnouncementsScreen },
  { id: "14", title: "Offers", icon: imageIndex.bag, screen: ScreenNameEnum.OffersScreen },
  { id: "1", title: "Profile", icon: imageIndex.profile, screen: ScreenNameEnum.EditProfile },

  { id: "2", title: "Calculator", icon: imageIndex.service, screen: ScreenNameEnum.ClickUploadScreen },
  { id: "3", title: "Duty Logs", icon: imageIndex.clock, screen: ScreenNameEnum.DutyLog },
  { id: "4", title: "Notification", icon: imageIndex.no1, screen: ScreenNameEnum.NotificationsSetting },
  { id: "5", title: "Change Password", icon: imageIndex.lock, screen: ScreenNameEnum.changePassword },
  { id: "6", title: "Contact Us", icon: imageIndex.support, screen: ScreenNameEnum.Help },
  // { id: "7", title: "Feeding Log", icon: imageIndex.support, screen: ScreenNameEnum.HelpSupport },
  { id: "8", title: "About us", icon: imageIndex.info, screen: ScreenNameEnum.ABOUT_US },
  { id: "9", title: "Service Rules", icon: imageIndex.terms, screen: ScreenNameEnum.LegalPoliciesScreen },
  { id: "6", title: "Privacy Policy", icon: imageIndex.service, screen: ScreenNameEnum.PrivacyPolicy },

  { id: "12", title: "Logout", icon: imageIndex.logout, screen: "Reminder" },

];

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const [LogoutModal1, setLogoutModal] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const isLogin = useSelector((state: any) => state?.auth);
  const toggleSubMenu = (id: string) => {
    setExpandedMenu(prev => (prev === id ? null : id));
  };

  const handleNavigation = (screenName: any) => {
    // console.log(screenName)
    if (screenName) {
      navigation.navigate(screenName);
    } else {
    }
  };
  // -------- Render Item Function --------
  const renderMenuItem = ({ item }: any) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenu === item.id;

    return (
      <View>
        <TouchableOpacity style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
          onPress={() => {
            if (item.id == "12") {
              setLogoutModal(true);
            } else {
              if (hasChildren) {
                toggleSubMenu(item.id);
              } else {
                // handleNavigation(item.screen);
                navigation.navigate(item.screen);
              }
              // navigation.navigate(item.screen);
            }
          }}
        >
          <View
            style={styles.menuItem}
          >
            <View style={{backgroundColor:color.primary, height:45, width:45, borderRadius:23, alignItems:'center', justifyContent:'center',  marginRight: 15,}}>
            <Image source={item.icon} style={styles.icon} />
            </View> 
            <Text allowFontScaling={false} style={styles.menuText}>{item.title}</Text>
          </View>
          {/* <Image source={imageIndex.next} style={[styles.icon,{
            tintColor:"black" ,
            height:34,
            width:22,
      }]} /> */}
          {hasChildren ? (
            isExpanded ?
              <Image source={imageIndex.down} style={[styles.icon, {
                tintColor: "black",
                height: 34,
                width: 22,

              }]} />
              :
              <Image source={imageIndex.right} style={[styles.icon, {
                tintColor: "black",
                height: 34,
                width: 22,

              }]} />

          ) : (
            <Image source={imageIndex.right} style={[styles.icon, {
              tintColor: "black",
              height: 34,
              width: 22,
              marginRight:20

            }]} />
          )}
        </TouchableOpacity>
        {hasChildren && isExpanded && item.children.map((grandChild: any) => (
          <TouchableOpacity
            key={grandChild.id}
            style={[styles.menuItem,]}
            onPress={() =>
              navigation.navigate(grandChild.screen)
            }
          >
            <Image source={grandChild.img} style={{
              height: 24,
              width: 24
            }} />
            <Text style={[styles.menuText, {
              marginLeft: 12
            }]}>{grandChild.title}</Text>
          </TouchableOpacity>
        ))}

      </View>
    )
  }
  const dispatch = useDispatch()
    const handleLogout = () => {
    dispatch(logout());

    navigation.reset({
      index: 0,
      routes: [{ name: ScreenNameEnum.Login }],
    });
  };
  console.log(isLogin)
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBarComponent />
      <TouchableOpacity
        onPress={() => navigation.navigate("EditProfile")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 15,
          marginVertical: 20
        }}>
        {/* <Image

          style={{
            height: 80,
            width: 80,
            borderRadius: 40
          }}
          source={isLogin?.userData?.user_data?.image ? { uri: isLogin?.userData?.user_data?.image } : imageIndex.dummy} /> */}
        <View>
           <Text style={{
            marginLeft: 15,

            color: color.primary,
            fontWeight: "600",
            //  fontSize:26
          }}>Hello welcome!!</Text>
          <Text style={{
            marginLeft: 15,

            color: "black",
            fontWeight: "600",
             fontSize:24
          }}>{isLogin?.userData?.user_data?.user_name || "Marcus Aminoff"}</Text>
          <Text style={{
            marginLeft: 15,
            marginTop: 5,
            color: "black",
            fontWeight: "600",
            fontSize:18
          }}>{isLogin?.userData?.user_data?.email || '@Marcus'}</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        style={{
          marginTop: 11
        }}
        data={menuItems}
        showsVerticalScrollIndicator={false}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
      />

      {/* ---------- Logout Button ---------- */}
      <LogoutModal visible={LogoutModal1}
        onCancel={() => {
          setLogoutModal(false)
        }}
        onLogout={handleLogout}
 

         
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",

  },
  profileImage: {
    height: 45,
    width: 250,
    marginTop: 55
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
   
  },
  menuText: {
    fontSize: 16,
    color: "#352C48",
  },
});
