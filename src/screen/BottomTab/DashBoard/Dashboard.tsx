import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Platform,
  ImageBackground,
  Dimensions,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import imageIndex from "../../../assets/imageIndex";
import { color } from "../../../theme/colors";
import font from "../../../theme/font";
import useDashboard from "./useDashboard";
import LoadingModal from "../../../component/LoadingModal";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { styles } from "./DashboardStyle";
import DeliveryCard from "../../../component/DeliveryCard";
import SwipeButton from 'rn-swipe-button';
import { IMAGE_URL } from "../../../api";
import { SafeAreaView } from "react-native-safe-area-context";

const DashboardScreen = () => {
  const {
    userData,
    loading,
    navigation,
    insets,
    selectedDuty,
    selectDuty,
    DUTY_OPTIONS,
    dashboardData,
    refreshing,
    onRefresh,
    toggleAvailability,
  } = useDashboard();
  // console.log("dashboardData?.recent_deliveries0", dashboardData?.recent_deliveries)
  // console.log("dashboardData?.summary", dashboardData?.summary)
  return (
    <SafeAreaView style={styles.container}>
      <LoadingModal visible={loading} />
      <StatusBar barStyle="light-content" />

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
            <Text style={styles.userName}>Hello {userData?.name || 'Alex'} 👋</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.NotificationsScreen as never)}
            >
              <Icon name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate(ScreenNameEnum.ProfileSetup as never)}>
              {userData?.profile_image_url || userData?.profile_image ? (
                <Image
                  source={{
                    uri: (() => {
                      const img = userData.profile_image_url || userData.profile_image;
                      if (img.startsWith('http://') || img.startsWith('https://')) return img;
                      return `${IMAGE_URL}${img.startsWith('/') ? img : '/' + img}`;
                    })()
                  }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
              ) : (
                <Icon name="person-outline" size={24} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
          onSwipeSuccess={async () => {
            const nextStatus = selectedDuty.status === 'on_duty' ? 'off_duty' : 'on_duty';
            const duty = DUTY_OPTIONS.find(d => d.status === nextStatus);
            if (duty) {
              const isOnline = nextStatus === 'on_duty';
              await toggleAvailability(isOnline, false);
              selectDuty(duty);
            }
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={color.primary}
            colors={[color.primary]}
          />
        }
      >


        {/* Stats Section */}
        <View style={styles.statsRow}>
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate(ScreenNameEnum.RECENT_DELIVERIES as never, { status: 'assigned' } as never)}
          >
            <Image source={imageIndex.assigned} style={styles.statImage} />
            <View>
              <Text style={styles.statLabel}>Assigned</Text>
              <Text style={styles.statValue}>{dashboardData?.summary?.assigned ?? '0'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate(ScreenNameEnum.RECENT_DELIVERIES as never, { status: 'in_progress' } as never)}
          >
            <Image source={imageIndex.inProgress} style={styles.statImage} />
            <View>
              <Text style={styles.statLabel}>In Progress</Text>
              <Text style={styles.statValue}>{dashboardData?.summary?.in_progress ?? '0'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate(ScreenNameEnum.RECENT_DELIVERIES as never, { status: 'delivered' } as never)}
          >
            <Image source={imageIndex.completed} style={styles.statImage} />
            <View>
              <Text style={styles.statLabel}>Completed</Text>
              <Text style={styles.statValue}>{dashboardData?.summary?.completed ?? '0'}</Text>
            </View>
          </TouchableOpacity>
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
          <TouchableOpacity
            style={[styles.actionCard, { opacity: dashboardData?.recent_deliveries?.length > 0 ? 1 : 0.5 }]}
            disabled={!(dashboardData?.recent_deliveries?.length > 0)}
            onPress={() => {
              const firstDelivery = dashboardData?.recent_deliveries?.[0].shipment_status === 'completed' ? dashboardData?.recent_deliveries?.find((d: any) => d.shipment_status !== 'completed') : dashboardData?.recent_deliveries?.[0];
              if (firstDelivery) {

                navigation.navigate(ScreenNameEnum.MapScreen as never, { delivery: firstDelivery } as never);
              } else {
                navigation.navigate(ScreenNameEnum.RECENT_DELIVERIES as never, { status: 'in_progress' } as never);
              }
            }}
          >
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
        {dashboardData?.recent_deliveries?.length > 0 ? (
          dashboardData.recent_deliveries?.slice(0, 3).map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(ScreenNameEnum.DELIVERY_DETAIL as never, { deliveryId: item.id } as never)}
            >
              <DeliveryCard
                id={item.tracking_number}
                date={item.expected_delivery}
                status={item.shipment_status_label}
                fromAddress={item.origin?.address}
                toAddress={item.destination?.address}
                clientName={item?.client_name}
                saplername={item?.supplier_name}
                companyName={item?.company_name}
                boxcount={item?.box_count}
              />
            </TouchableOpacity>
          ))
        ) : (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#6F767E' }}>No recent deliveries</Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView >
  );
};

export default DashboardScreen;
