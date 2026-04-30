import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import imageIndex from "../../../assets/imageIndex";
import { color } from "../../../constant";
import { Modal, Pressable } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import useDashboard, { DUTY_OPTIONS } from "./useDashboard";
import LoadingModal from "../../../utils/Loader";
import CustomButton from "../../../compoent/CustomButton";
import LocationPicker from "./locationPicker";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { MAP_API_KEY } from "@env";

const DashboardScreen = () => {
  const {
    userData,
    loading,
    ratingData,
    setLoading,
    trip,
    start,
    setStart,
    selectedAddress,
    setSelectedAddress,
    selectedAddress2,
    setSelectedAddress2,
    rpm,
    setRpm,
    totalDriver,
    insets,
    navigation,
    ratingRef,
    ratingRef1,
    setRatingLayout,
    setRatingLayout1,
    setRatingModalVisible,
    selectedRating,
    selectedDuty,
    selectDuty,
    setBadgeLayout,
    setDutyModalVisible,
    setLocationModal,
    setLocationModal2,
    handleRpmChange,
    increaseRpm,
    decreaseRpm,
    dutyModalVisible,
    badgeLayout,
    ChangeStatus,
    currentRequest,
    ratingModalVisible,
    ratingLayout,
    ratingLayout1,
    setSelectedRating,
    badgeRef,
    locationModal,
    handleModalSubmit,
    handleLocationSelected,
    locationModal2,
    handleModalSubmit2,
    handleLocationSelected2,
    CreateTrip,
    ratingModalVisible1, setRatingModalVisible1,
    driverType,
    setDriverType,
  } = useDashboard();
  const drivingModes: ("Solo" | "Team")[] = ["Solo", "Team"];

  return (
    <SafeAreaView style={styles.container}>
      <LoadingModal visible={loading} />
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <LinearGradient
        colors={[color.primary, color.primary]}
        style={[
          styles.header,
          {
            paddingTop: Platform.OS === "android" ? insets.top + 10 : 10,
          },
        ]}
      >
        <View
          style={[
            styles.headerRow,
            {
              marginBottom: 20,
              marginHorizontal: 10,
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Image
                source={imageIndex.menu}
                style={{ height: 45, width: 45, marginRight: 15 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.welcome}>Hello, Welcome 👋</Text>
              <Text style={styles.userName}>
                {userData?.user_data?.user_name}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.AnnouncementsScreen as never)}>
            <Image
              source={imageIndex.no1}
              style={{
                height: 30,
                width: 30,
                marginRight: 0,
                tintColor: "#fff",
              }}
            />

          </TouchableOpacity>
        </View>
      </LinearGradient>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>

            <View style={{
              flexDirection: "row",
              justifyContent: "space-between", alignItems: "center", marginBottom: 10
            }} >
              {/* Dropdown */}
              <TouchableOpacity
                ref={ratingRef}
                style={styles.dropdown}
                activeOpacity={0.8}
                onPress={() => {
                  ratingRef.current?.measureInWindow(
                    (x: any, y: any, width: any, height: any) => {
                      setRatingLayout({ x, y, width, height });
                      setRatingModalVisible(true);
                    },
                  );
                }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    selectedRating && { color: "#000" },
                  ]}
                >
                  {selectedRating
                    ? selectedRating.rating
                    : "Select Company Rating"}
                </Text>
                <Icon name="chevron-down" size={20} color="#777" />
              </TouchableOpacity>

              <TouchableOpacity
                ref={ratingRef1}
                style={styles.dropdown}
                activeOpacity={0.8}
                onPress={() => {
                  ratingRef1.current?.measureInWindow(
                    (x: any, y: any, width: any, height: any) => {
                      setRatingLayout1({ x, y, width, height });
                      setRatingModalVisible1(true);
                    },
                  );
                }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    driverType && { color: "#000" },
                  ]}
                >
                  {driverType || "Select Team"}
                </Text>
                <Icon name="chevron-down" size={20} color="#777" />
              </TouchableOpacity>
            </View>
            {/* Driver Card */}
            <View
              style={[
                styles.redCard,
                {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  marginBottom: 10,
                },
              ]}
            >
              {/* <View style={styles.iconCircle}> */}
              <Image source={imageIndex.user} style={styles.iconCircle} />

              <View>
                <Text style={styles.cardLabel}>Driver</Text>
                <Text style={styles.cardTitle}>
                  {userData?.user_data?.user_name}
                </Text>
              </View>
            </View>

            {/* Company Card */}
            <View
              style={[
                styles.redCard,
                { borderTopLeftRadius: 0, borderTopRightRadius: 0, },
              ]}
            >
              <Image source={imageIndex.company} style={styles.iconCircle} />
              <View>
                <Text style={styles.cardLabel}>Company</Text>
                <Text style={styles.cardTitle}>
                  {userData?.user_data?.company_name}
                </Text>
              </View>
            </View>
            {/* Duty Status */}
            <View style={styles.whiteCard}>
              <View style={styles.statusRow}>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name={selectedDuty.icon}
                    size={100}
                    color={selectedDuty.color}
                    style={{ marginRight: 6 }}
                  />
                  <View
                    style={{
                      justifyContent: "center",
                      paddingTop: 20,
                      marginLeft: 5,
                    }}
                  >
                    <Text style={styles.sectionTitle}>Duty Status</Text>
                    <Text style={styles.statusText}>
                      {selectedDuty.label}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  ref={badgeRef}
                  activeOpacity={0.8}
                  style={styles.badge}
                  onPress={() => {
                    badgeRef.current?.measureInWindow(
                      (x: any, y: any, width: any, height: any) => {
                        setBadgeLayout({ x, y, width, height });
                        setDutyModalVisible(true);
                      },
                    );
                  }}
                >
                  <View
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Icon
                      name={selectedDuty.icon}
                      size={16}
                      color={selectedDuty.color}
                      style={{ marginRight: 6 }}
                    />
                    <Text
                      style={[
                        styles.badgeText,
                        { color: selectedDuty.color },
                      ]}
                    >
                      {selectedDuty.label}
                    </Text>
                    <Icon name="chevron-down" size={16} color="#333" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.whiteCard}>
              <Text style={styles.sectionTitle}>Location</Text>

              <TouchableOpacity
                onPress={() => {
                  setLocationModal(true);
                }}
              >
                <View style={styles.locationRow}>
                  <Icon
                    name="location-outline"
                    size={24}
                    color={color.primary}
                  />
                  <Text style={styles.locationText}>
                    {selectedAddress?.address || "Start Location"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {

                  setLocationModal2(true);

                }}
              >
                <View style={styles.locationRow}>
                  <Icon
                    name="radio-button-on"
                    size={24}
                    color={color.primary}
                  />
                  <Text style={styles.locationText}>
                    {selectedAddress2?.address || "Destination"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* RPM */}
            <View style={styles.whiteCard}>
              <Text style={styles.sectionTitle}>RPM (Rate Per Mile)</Text>

              <View style={styles.rpmRow}>
                <FontAwesome name="dollar" size={18} color={color.primary} />

                <TextInput
                  value={rpm}
                  keyboardType="decimal-pad"
                  style={styles.rpmInput}
                  onChangeText={handleRpmChange}
                  // editable={!start}
                  onBlur={() => {
                    const value = parseFloat(rpm);
                    setRpm(isNaN(value) ? "0.00" : value.toFixed(2));
                  }}
                />

                <View style={{ marginRight: 10 }}>
                  <TouchableOpacity
                    disabled={start}
                    onPress={increaseRpm}
                    hitSlop={10}
                  >
                    <FontAwesome
                      name="caret-up"
                      size={18}
                      color={color.primary}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled={start}
                    onPress={decreaseRpm}
                    hitSlop={10}
                  >
                    <FontAwesome
                      name="caret-down"
                      size={18}
                      color={color.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <CustomButton
              onPress={() => CreateTrip()}
              title="Submit"
              style={{ marginVertical: 20 }}
            />
            <View style={[styles.redCard, { marginBottom: 20 }]}>
              <Image source={imageIndex.multiUser} style={styles.iconCircle} />
              <View>
                <Text style={styles.cardLabel}>Active Drivers</Text>
                <Text style={[styles.cardTitle, { fontSize: 40 }]}>
                  {totalDriver}
                </Text>
                <Text style={styles.cardTitle}>Drivers in your city</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={dutyModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDutyModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDutyModalVisible(false)}
        />

        <View
          style={[
            styles.dutyDropdown,
            {
              top: badgeLayout.y + badgeLayout.height + 8,
              left: badgeLayout.x + badgeLayout.width - 200,
            },
          ]}
        >
          {DUTY_OPTIONS.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.dutyItem}
              onPress={() => {
                selectDuty(item);
                ChangeStatus(item?.status, trip?.id ?? "");
                setDutyModalVisible(false);
              }}
            >
              <Icon
                name={item.icon}
                size={22}
                color={item.color}
                style={{ marginRight: 12 }}
              />
              <Text style={styles.dutyLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <Modal
        visible={ratingModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => {
            setRatingModalVisible(false)
          }
          }
        />

        <View
          style={[
            styles.ratingDropdown,
            {
              top: ratingLayout.y + ratingLayout.height + 8,
              left: ratingLayout.x,
              width: ratingLayout.width,
            },
          ]}
        >
          {ratingData?.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.ratingItem}
              onPress={() => {
                setSelectedRating(item);

                setRatingModalVisible(false);
              }}
            >
              <Text style={styles.ratingText}>{item?.rating}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <Modal
        visible={ratingModalVisible1}
        transparent
        animationType="fade"
        onRequestClose={() => setRatingModalVisible1(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => {
            setRatingModalVisible1(false)
          }

          }
        />

        <View
          style={[
            styles.ratingDropdown,
            {
              top: ratingLayout1.y + ratingLayout1.height + 8,
              left: ratingLayout1.x,
              width: ratingLayout1.width,
            },
          ]}
        >
          {drivingModes?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.ratingItem}
              onPress={() => {
                setDriverType(item);
                setRatingModalVisible1(false);
              }}
            >
              <Text style={styles.ratingText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <LocationPicker
        visible={locationModal}
        apiKey={MAP_API_KEY} // replace with actual key
        onClose={() => setLocationModal(false)}
        onSumit={handleModalSubmit}
        onLocationSelected={handleLocationSelected}
      />
      <LocationPicker
        visible={locationModal2}
        apiKey={MAP_API_KEY} // replace with actual key
        onClose={() => setLocationModal2(false)}
        onSumit={handleModalSubmit2}
        onLocationSelected={handleLocationSelected2}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcome: {
    color: "#fff",
    fontSize: 14,
  },

  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },

  content: {
    padding: 16,
  },

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    width: "45%",
    marginRight: 10,
  },

  dropdownText: {
    color: "#888",
  },

  redCard: {
    backgroundColor: "#ff3b3b",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  iconCircle: {
    // backgroundColor: '#fff',
    width: 60,
    height: 60,
    // borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  cardLabel: {
    color: "#ffdede",
    fontSize: 12,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  whiteCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 0,
    flex: 1,
  },

  badge: {
    backgroundColor: "#eafaf1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "#2ecc71",
    fontSize: 12,
    fontWeight: "600",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#F7F8F8",
    padding: 20,
    borderRadius: 10,
  },

  locationText: {
    marginLeft: 8,
    color: "#555",
    flex: 1,
  },

  rpmRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 10,
  },

  currency: {
    fontSize: 16,
    marginRight: 6,
  },

  rpmInput: {
    flex: 1,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  dutyDropdown: {
    position: "absolute",
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 8,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 12,
  },

  dutyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  dutyLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },
  ratingDropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },

  ratingItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
});
