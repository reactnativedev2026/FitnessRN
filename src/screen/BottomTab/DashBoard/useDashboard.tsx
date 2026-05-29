import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../../redux/feature/authSlice";
import { ENDPOINT } from "../../../Api/endpoints";
import { GET_API, POST_API } from "../../../Api/APIRequest";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenNameEnum from "../../../routes/screenName.enum";

const STORAGE_KEYS = {
  DRIVER_TYPE: "driver_type",
  DASHBOARD_RATING: "dashboard_rating",
  DASHBOARD_RPM: "dashboard_rpm",
  DASHBOARD_START_ADDRESS: "dashboard_start_address",
  DASHBOARD_END_ADDRESS: "dashboard_end_address",
  DASHBOARD_DUTY_STATUS: "dashboard_duty_status",
  DASHBOARD_TOTAL_DRIVER: "dashboard_total_driver",
};

export const DUTY_OPTIONS = [
  { id: 1, label: "On Duty", icon: "checkmark-circle", color: "#34C759", status: "on_duty" },
  { id: 2, label: "Off Duty", icon: "close-circle", color: "#FF3B30", status: "off_duty" },
  { id: 3, label: "Break", icon: "close-circle", color: "#FF9500", status: "break" },
  { id: 4, label: "Home", icon: "home", color: "#FF3B30", status: "home" },
];

const useDashboard = () => {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedAddress2, setSelectedAddress2] = useState<any>(null);
  const [loadingCount, setLoadingCount] = useState(0);
  const loading = loadingCount > 0;
  const setLoading = (val: boolean) => {
    setLoadingCount((prev) => (val ? prev + 1 : Math.max(0, prev - 1)));
  };
  const { userData } = useSelector((state: any) => state.auth);
  const [selectedRatingValue, setSelectedRatingState] = useState<any>(null);
  const [selectedDutyState, setSelectedDutyState] = useState(DUTY_OPTIONS[0]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  // New helper to directly toggle driver online/offline
  const toggleAvailability = async (isOnline: boolean, isSilent = false) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;
    const loaderFunc = isSilent ? () => { } : setLoading;
    const param = { is_online: isOnline };
    console.log("🚀 CALLING DRIVER_AVAILABILITY API:", param);
    const res = await POST_API(token, param, ENDPOINT.DRIVER_AVAILABILITY, loaderFunc, false);
    console.log("✅ DRIVER_AVAILABILITY RESPONSE:", res);
  };

  // Helper to update selected duty state
  const selectDuty = (duty) => {
    setSelectedDutyState(duty);
    // Optionally persist duty status
    AsyncStorage.setItem(STORAGE_KEYS.DASHBOARD_DUTY_STATUS, duty.status);
  };

  const setSelectedRating = (value: any) => {
    setSelectedRatingState(value);
    const toSave = value?.rating ?? (typeof value === "string" ? value : null);
    if (toSave != null) AsyncStorage.setItem(STORAGE_KEYS.DASHBOARD_RATING, String(toSave));
  };


  const fetchDashboardData = async (isSilent = false) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("❌ Token not found");
        dispatch(logout());
        navigation.navigate(ScreenNameEnum.LoginScreen as never);
        return;
      }
      const loaderFunc = isSilent ? () => { } : setLoading;
      const response = await GET_API(ENDPOINT.DASHBOARD, token, "GET", loaderFunc);
      if (response && response.success) {
        setDashboardData(response.data);
      } else {
        console.log("❌ DASHBOARD API FAILED:", response?.message);
        if (response?.message === "Unauthenticated.") {
          dispatch(logout());
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchDashboardData(true),
      ]);
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);


  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [dutyModalVisible, setDutyModalVisible] = useState(false);

  return {
    userData,
    loading,
    setLoading,
    selectedAddress,
    setSelectedAddress,
    selectedAddress2,
    setSelectedAddress2,
    insets,
    navigation,
    selectedDuty: selectedDutyState,
    selectDuty,
    setDutyModalVisible,
    dutyModalVisible,
    toggleAvailability,
    DUTY_OPTIONS,
    setSelectedRating,
    dashboardData,
    refreshing,
    onRefresh,
  };
};

export default useDashboard;
