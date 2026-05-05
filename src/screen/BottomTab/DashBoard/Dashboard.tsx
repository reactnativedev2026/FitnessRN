import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Platform,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import imageIndex from "../../../assets/imageIndex";
import { color } from "../../../constant";
import useDashboard from "./useDashboard";
import LoadingModal from "../../../utils/Loader";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { styles } from "./DashboardStyle";
import DeliveryCard from "../../../compoent/DeliveryCard";

const DashboardScreen = () => {
  const {
    userData,
    loading,
    navigation,
    insets,
  } = useDashboard();

  return (
    <SafeAreaView style={styles.container}>
      <LoadingModal visible={loading} />
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Header Section */}
        <ImageBackground source={imageIndex.dashboardTop}
          style={[
            styles.headerGradient,
            { paddingTop: Platform.OS === "android" ? insets.top + 20 : 20 }
          ]}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.userName}>Hello {userData?.user_data?.user_name || 'Alex'} 👋</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity >
                <Icon name="notifications-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="person-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Online Status Toggle */}
        <View style={styles.onlineStatusContainer}>
          <TouchableOpacity style={styles.goButton}>
            <Image source={imageIndex.go} style={{ width: 50, height: 50 }} />
            <Icon name="chevron-forward-outline" size={25} color={color.primary} />
            <Icon name="chevron-forward-outline" size={25} color={color.primary} style={{ marginLeft: -15 }} />
          </TouchableOpacity>
          <Text style={styles.statusText}>online</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Image source={imageIndex.assigned} style={styles.statImage} />
            <View>
              <Text style={styles.statLabel}>Assigned</Text>
              <Text style={styles.statValue}>10</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Image source={imageIndex.inProgress} style={styles.statImage} />
            <View>
              <Text style={styles.statLabel}>In Progress</Text>
              <Text style={styles.statValue}>02</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Image source={imageIndex.completed} style={styles.statImage} />
            <View>
              <Text style={styles.statLabel}>Completed</Text>
              <Text style={styles.statValue}>16</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate(ScreenNameEnum.DashBoardDetail as never)}
          >
            <Image source={imageIndex.startdelivery} style={styles.actionImage} />
            <Text style={styles.actionText}>Start Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Image source={imageIndex.status} style={styles.actionImage} />
            <Text style={styles.actionText}>Update Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Image source={imageIndex.viewMap} style={styles.actionImage} />
            <Text style={styles.actionText}>View Map</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Deliveries */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Deliveries</Text>
          <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.RECENT_DELIVERIES as never)}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Cards */}
        {[
          { id: '#5R9G87R', date: '14 May 2025', status: 'In Progress' },
          { id: '#5R9G87R', date: '14 May 2025', status: 'Completed' },
        ].map((item, index) => (
          <DeliveryCard
            key={index}
            id={item.id}
            date={item.date}
            status={item.status}
          />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView >
  );
};

export default DashboardScreen;
