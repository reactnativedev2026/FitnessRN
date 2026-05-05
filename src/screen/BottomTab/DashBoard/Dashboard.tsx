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
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import imageIndex from "../../../assets/imageIndex";
import { color } from "../../../constant";
import font from "../../../theme/font";
import useDashboard from "./useDashboard";
import LoadingModal from "../../../utils/Loader";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { styles } from "./DashboardStyle";
import DeliveryCard from "../../../compoent/DeliveryCard";
import SwipeButton from 'rn-swipe-button';

const DashboardScreen = () => {
  const {
    userData,
    loading,
    navigation,
    insets,
    selectedDuty,
    selectDuty,
    DUTY_OPTIONS,
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
              <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.NotificationsScreen as never)}
              >
                <Icon name="notifications-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate(ScreenNameEnum.ProfileSetup as never)}>
                <Icon name="person-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Online Status Toggle */}
        <View style={{ marginHorizontal: 20, marginTop: 15 }}>
          <SwipeButton
            disabled={false}
            swipeSuccessThreshold={70}
            height={60}
            width={Dimensions.get('window').width - 40}
            title={selectedDuty.status === 'on_duty' ? "Swipe to go Offline" : "Swipe to go Online"}
            shouldResetAfterSuccess={true}
            resetAfterSuccessAnimDelay={100}
            titleFadeOut={false}
            onSwipeSuccess={() => {
              const nextStatus = selectedDuty.status === 'on_duty' ? 'off_duty' : 'on_duty';
              const duty = DUTY_OPTIONS.find(d => d.status === nextStatus);
              if (duty) selectDuty(duty);
            }}
            railFillBackgroundColor={'transparent'}
            railFillBorderColor={selectedDuty.status != 'on_duty' ? '#FF3B30' : color.primary}
            thumbIconBackgroundColor={selectedDuty.status != 'on_duty' ? '#FF3B30' : color.primary}
            thumbIconComponent={() => (
              <Image source={imageIndex.go} style={{ width: 50, height: 50 }} />
            )}
            railBackgroundColor="#1C1F26"
            railBorderColor="#393B48"
            titleColor="#fff"
            titleFontSize={16}
            titleStyles={{ fontFamily: font.TrialBold }}
          />
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
            onPress={() => navigation.navigate(ScreenNameEnum.DashBoardDetail as never, { type: 'start' })}
          >
            <Image source={imageIndex.startdelivery} style={styles.actionImage} />
            <Text style={styles.actionText}>Start Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate(ScreenNameEnum.DashBoardDetail as never, { type: 'update' })}>
            <Image source={imageIndex.status} style={styles.actionImage} />
            <Text style={styles.actionText}>Update Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate(ScreenNameEnum.MapScreen)}>
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
