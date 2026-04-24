import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginSuccess } from "../../../redux/feature/authSlice";
import { ENDPOINT } from "../../../api/endpoints";
import { GET_API, POST_API } from "../../../api/APIRequest";
import { getLocation } from "../../../compoent/location";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MAP_API_KEY } from "@env";


const STORAGE_KEYS = {
  DRIVER_TYPE: "driver_type",
  DASHBOARD_RATING: "dashboard_rating",
  DASHBOARD_RPM: "dashboard_rpm",
  DASHBOARD_START_ADDRESS: "dashboard_start_address",
  DASHBOARD_END_ADDRESS: "dashboard_end_address",
  DASHBOARD_DUTY_STATUS: "dashboard_duty_status",
};

export const DUTY_OPTIONS = [
  { id: 1, label: "On Duty", icon: "checkmark-circle", color: "#34C759", status: "on_duty" },
  { id: 2, label: "Off Duty", icon: "close-circle", color: "#FF3B30", status: "off_duty" },
  { id: 3, label: "Break", icon: "close-circle", color: "#FF9500", status: "break" },
  { id: 4, label: "Home", icon: "home", color: "#FF3B30", status: "home" },
];

const useDashboard = () => {
  const dispatch = useDispatch();
  const [trip, setTrip] = useState<any>(undefined);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedAddress2, setSelectedAddress2] = useState<any>(null);
  const [loadingCount, setLoadingCount] = useState(0);
  const loading = loadingCount > 0;
  const setLoading = (val: boolean) => {
    setLoadingCount((prev) => (val ? prev + 1 : Math.max(0, prev - 1)));
  };
  const [start, setStart] = useState(false);
  const { userData } = useSelector((state: any) => state.auth);
  const [selectedRatingValue, setSelectedRatingState] = useState<any>(null);
  const [rpm, setRpmState] = useState<string>("0.00");
  const [driverType, setDriverTypeState] = useState<"Solo" | "Team" | null>(null);
  const [totalDriver, setTotalDriver] = useState("0");
  const [persistedLoaded, setPersistedLoaded] = useState(false);
  const [selectedDutyState, setSelectedDutyState] = useState(DUTY_OPTIONS[0]);

  const ChangeStatus = async (status: string, id: string, isSilent = false) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    const loaderFunc = isSilent ? () => { } : setLoading;
    const param: any = {
      user_id: userData?.user_data?.id,
      duty_request_id: id || trip?.id,
      status: status || selectedDutyState.status,
      rating: selectedRatingValue?.rating,
      driver_type: driverType,
    };

    console.log("🚀 CALLING CHANGE_STATUS API:", param);

    const stChange = await POST_API(
      token,
      param,
      ENDPOINT.CHANGE_STATUS,
      loaderFunc,
    );
    console.log("✅ CHANGE_STATUS API RESPONSE:", stChange);
  };

  const UpdateRatingType = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    const param = {
      request_id: trip?.id,
      rating: selectedRatingValue?.rating,
      type: driverType,
    };


    console.log("🚀 CALLING CHANGE_RATING_STATUS API:", param);

    const res = await POST_API(
      token,
      param,
      ENDPOINT.CHANGE_RATING_STATUS,
      () => { } // Silent
    );
    console.log("✅ CHANGE_RATING_STATUS API RESPONSE:", res);
  };

  // Persist selected rating when user selects (so it shows after app close)
  const setSelectedRating = (value: any) => {
    setSelectedRatingState(value);
    const toSave = value?.rating ?? (typeof value === "string" ? value : null);
    if (toSave != null) AsyncStorage.setItem(STORAGE_KEYS.DASHBOARD_RATING, String(toSave));
  };


  // Persist rpm when user changes it (so it shows after app close)
  const setRpm = (value: string | ((prev: string) => string)) => {
    setRpmState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      if (next != null && next !== "") {
        AsyncStorage.setItem(STORAGE_KEYS.DASHBOARD_RPM, String(next));
      }
      return next;
    });
  };

  // Load all persisted values first so fields show what user had set (after app close)
  useEffect(() => {
    (async () => {
      try {
        const [savedDriverType, savedRating, savedRpm, savedStart, savedEnd, savedDutyStatus] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.DRIVER_TYPE),
          AsyncStorage.getItem(STORAGE_KEYS.DASHBOARD_RATING),
          AsyncStorage.getItem(STORAGE_KEYS.DASHBOARD_RPM),
          AsyncStorage.getItem(STORAGE_KEYS.DASHBOARD_START_ADDRESS),
          AsyncStorage.getItem(STORAGE_KEYS.DASHBOARD_END_ADDRESS),
          AsyncStorage.getItem(STORAGE_KEYS.DASHBOARD_DUTY_STATUS),
        ]);
        if (savedDriverType === "Solo" || savedDriverType === "Team") {
          setDriverTypeState(savedDriverType);
        }
        if (savedRating != null && savedRating !== "") {
          setSelectedRatingState({ rating: savedRating });
        }
        if (savedRpm != null && savedRpm !== "") {
          setRpmState(savedRpm);
        }
        if (savedStart) {
          try {
            const parsed = JSON.parse(savedStart);
            if (parsed && (parsed.address || parsed.latitude)) setSelectedAddress(parsed);
          } catch (_) { }
        }
        if (savedEnd) {
          try {
            const parsed = JSON.parse(savedEnd);
            if (parsed && (parsed.address || parsed.latitude)) setSelectedAddress2(parsed);
          } catch (_) { }
        }
        if (savedDutyStatus) {
          const dutyOption = DUTY_OPTIONS.find((o) => o.status === savedDutyStatus);
          if (dutyOption) setSelectedDutyState(dutyOption);
        }
      } catch (_) { }
      setPersistedLoaded(true);
    })();
  }, []);

  // Load all persisted values first so fields show what user had set (after app close)
  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_API_KEY}`;
      const response = await fetch(url);
      const result = await response.json();
      if (result.results && result.results.length > 0) {
        return result.results[0].formatted_address;
      }
    } catch (error) {
      console.log("Error fetching address:", error);
    }
    return null;
  };

  useEffect(() => {
    if (!persistedLoaded) return;
    getCurrentTripApi();
    getRatingApi();
    getLocation().then(async (res) => {
      getDriver(res);
      // If start address is not set, use current location
      if (!selectedAddress?.address) {
        const address = await fetchAddress(res.latitude, res.longitude);
        if (address) {
          const location = {
            latitude: res.latitude,
            longitude: res.longitude,
            address: address,
          };
          setSelectedAddress(location);
          AsyncStorage.setItem(STORAGE_KEYS.DASHBOARD_START_ADDRESS, JSON.stringify(location));
        }
      }
    });
  }, [persistedLoaded]);
  const [ratingData, setRatingData] = useState([]);
  const getRatingApi = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("❌ Token not found");
        return;
      }
      const rating = await GET_API(ENDPOINT.GET_RATING, "", "GET", setLoading);
      if (rating.success) {
        console.log(rating?.data, "this is ratting");
        setRatingData(rating?.data);
      }

      const response = await GET_API(
        ENDPOINT.GET_PROFILE,
        // loader
        token,
        "POST",
      );

      if (response?.success) {
        setLoading(false);
        console.log(response.data.user_data.rating, " response.data  response.data");
        // setSelectedRating({rating:response.data.user_data.rating})
        // console.log( response.data, ' response.data  response.data')
        dispatch(
          loginSuccess({
            userData: response.data,
            token: token,
          }),
        );
      }
    } catch (error) {
      setLoading(false);

      console.log("❌ Profile API error:", error);
    }
  };
  const getDriver = async (res: { latitude?: number; longitude?: number }) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;
    const param = {
      latitude: res?.latitude,
      longitude: res?.longitude,
      user_id: userData?.user_data?.id,
    };
    const dd = await POST_API(
      token,
      param,
      "user/get_nearby_users",
      setLoading,
    );
    // console.log(dd, 'driverdata')
    setTotalDriver(dd?.data?.total_nearby_users);
  };

  const getCurrentTripApi = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("❌ Token not found");
        return;
      }
      const rating = await GET_API(
        ENDPOINT.GET_CURRENT_TRIP,
        token,
        "POST",
        setLoading,
      );
      if (rating.success) {
        if (rating?.data) {
          setTrip(rating?.data);
          setStart(true);
          const startAddr = {
            address: rating?.data?.start_location,
            latitude: rating?.data?.start_location_lat,
            longitude: rating?.data?.start_location_lon,
          };
          const endAddr = {
            address: rating?.data?.end_location,
            latitude: rating?.data?.end_location_lat,
            longitude: rating?.data?.end_location_lon,
          };
          setSelectedAddress(startAddr);
          setSelectedAddress2(endAddr);

          // Only overwrite local RPM if it's currently at default value
          // This prevents stale server data from reverting a newly set local RPM on reload
          if (rating?.data?.rpm && (rpm === "0.00" || rpm === "0")) {
            setRpmState(rating?.data?.rpm);
          }

          setSelectedRatingState({
            rating:
              rating?.data?.rating == null ? userData?.user_data?.rating : rating?.data?.rating,
          });
          if (rating?.data?.driver_type === "Solo" || rating?.data?.driver_type === "Team") {
            setDriverTypeState(rating.data.driver_type);
          }
        }
      }

    } catch (error) {
      setLoading(false);

      console.log("❌ Profile API error:", error);
    }
  };

  const CreateTrip = async (isSilent = false) => {
    // Create body object with only fields that have data
    // Alert.alert('selectedRating?.rating', selectedRating?.rating)
    const body: any = {
      company_id: 1,

    };
    if (selectedRatingValue != null && selectedRatingValue.rating != null) {
      body.rating = selectedRatingValue?.rating;
    }

    // Add rpm if it exists and is not empty
    if (rpm && rpm.trim() !== "") {
      body.rpm = rpm;
    }

    // Add start location data only if it exists
    if (selectedAddress?.address) {
      body.start_location = selectedAddress.address;
    }
    // When user has not selected, API still needs a value → default "Solo"
    body.driver_type = driverType ?? "";

    // Add start coordinates only if they exist
    if (selectedAddress?.latitude) {
      body.start_location_lat = selectedAddress.latitude;
    }

    if (selectedAddress?.longitude) {
      body.start_location_lon = selectedAddress.longitude;
    }

    // Add end location data only if it exists
    if (selectedAddress2?.address) {
      body.end_location = selectedAddress2.address;
    }

    // Add end coordinates only if they exist
    if (selectedAddress2?.latitude) {
      body.end_location_lat = selectedAddress2.latitude;
    }

    if (selectedAddress2?.longitude) {
      body.end_location_lon = selectedAddress2.longitude;
    }

    // Optional: Validate required fields
    const requiredFields = ['start_location', 'end_location'];
    // const missingFields = requiredFields.filter(field => !body[field]);

    // if (missingFields.length > 0) {
    //   Alert.alert('Missing Information', 
    //     `Please fill in: ${missingFields.join(', ').replace(/_/g, ' ')}`);
    //   return;
    // }
    console.log(body, 'this is body')
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    const loaderFunc = isSilent ? () => { } : setLoading;
    if (!isSilent) setLoading(true);
    try {
      const res = await POST_API(token, body, ENDPOINT.CREATE_TRIP, loaderFunc);

      if (res?.success) {
        setTrip(res?.data);
        const tripId = res?.data?.id != null ? String(res.data.id) : "";
        await ChangeStatus(selectedDutyState.status, tripId, isSilent);
        setStart(true);
        // Removed: AsyncStorage.setItem(STORAGE_KEYS.DASHBOARD_RPM, String(res.data.rpm)); 
        // We rely on the local setter (setRpm) to keep storage in sync. 
        // Overwriting it here from the API response often reverts it to old data if the server hasn't updated its record yet.
        if (res?.data?.rating != null)
          AsyncStorage.setItem(STORAGE_KEYS.DASHBOARD_RATING, String(res.data.rating));
      }
    } catch (error) {
      console.log("CreateTrip Error:", error);
    } finally {
      if (!isSilent) setLoading(false);
    }
  };
  // const CreateTrip = async () => {
  //   console.log(selectedAddress);
  //   // if (!selectedAddress.latitude) {
  //   //   Alert.alert('Please select start location')
  //   //   return

  //   // }
  //   // if (!selectedAddress2.latitude) {
  //   //   Alert.alert('Please select End location')
  //   //   return
  //   // }
  //   const body = {
  //     company_id: 1,
  //     rating: "A",
  //     // start_location: selectedAddress?.address  ?? null,
  //     // end_location: selectedAddress2?.address  ?? null,
  //     rpm: rpm,
  //     // start_location_lat: selectedAddress?.latitude ?? null,
  //     // start_location_lon: selectedAddress?.longitude ?? null,
  //     // end_location_lat: selectedAddress2?.latitude ?? null,
  //     // end_location_lon: selectedAddress2?.longitude ?? null,
  //   };
  //   console.log(body, 'this is body');
  //   console.log(selectedAddress);
  //   const token = await AsyncStorage.getItem("token");
  //   const res = await POST_API(token, body, ENDPOINT.CREATE_TRIP, setLoading);

  // console.log(res, 'this is res')
  //   if (res.success) {

  //     setCurrentRequest(res?.data);
  //     ChangeStatus("on_duty", res?.data?.id);
  //     // setStart(true);
  //   }
  //   // setStart(true)
  // };

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [dutyModalVisible, setDutyModalVisible] = useState(false);
  const badgeRef = useRef(null);
  const ratingRef = useRef(null);
  const ratingRef1 = useRef(null);
  const STEP = 0.05; // 🔁 change step here

  const increaseRpm = () => {
    const value = parseFloat(rpm) || 0;
    setRpm((value + STEP).toFixed(2));
  };

  const decreaseRpm = () => {
    const value = parseFloat(rpm) || 0;
    const next = value - STEP;
    setRpm((next < 0 ? 0 : next).toFixed(2));
  };
  const handleRpmChange = (text: string) => {
    // allow only numbers and one decimal
    if (!/^\d*\.?\d*$/.test(text)) return;

    setRpm(text);
  };

  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [ratingModalVisible1, setRatingModalVisible1] = useState(false);
  const [ratingLayout, setRatingLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [ratingLayout1, setRatingLayout1] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [locationModal, setLocationModal] = useState(false);
  const [locationModal2, setLocationModal2] = useState(false);

  const handleLocationSelected = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setSelectedAddress(location);
    AsyncStorage.setItem(STORAGE_KEYS.DASHBOARD_START_ADDRESS, JSON.stringify(location));
    handleModalSubmit();
  };
  const handleModalSubmit = () => {
    setLocationModal(false);
  };
  const handleLocationSelected2 = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setSelectedAddress2(location);
    AsyncStorage.setItem(STORAGE_KEYS.DASHBOARD_END_ADDRESS, JSON.stringify(location));
    handleModalSubmit2();
  };
  const handleModalSubmit2 = () => {
    setLocationModal2(false);
  };

  // Persist driver_type so selected value shows after app close
  const setDriverType = (value: "Solo" | "Team") => {
    setDriverTypeState(value);
    AsyncStorage.setItem(STORAGE_KEYS.DRIVER_TYPE, value);
  };


  const [currentRequest, setCurrentRequest] = useState();

  // const [dutyModalVisible, setDutyModalVisible] = useState(false);
  const [badgeLayout, setBadgeLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const selectDuty = (option: (typeof DUTY_OPTIONS)[number]) => {
    setSelectedDutyState(option);
    AsyncStorage.setItem(STORAGE_KEYS.DASHBOARD_DUTY_STATUS, option.status);
  };


  // Replace multiple redundant effects with a single debounced-like effect or at least guarded one
  useEffect(() => {
    if (!persistedLoaded) return;
    UpdateRatingType();
  }, [selectedRatingValue, driverType]);


  return {
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
    selectedRating: selectedRatingValue,
    selectedDuty: selectedDutyState,
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
    DUTY_OPTIONS,
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
    ratingModalVisible1,
    setRatingModalVisible1,
    driverType,
    setDriverType,
  };
};

export default useDashboard;
