import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
  

// import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

type LocationResult = {
  latitude: number;
  longitude: number;
};

export type FarmerAddress = {
  village: string;
  post: string;
  teh: string;
  dist: string;
  state: string;
  pin: string;
  displayAddress: string;
};

export const getLocation = async (): Promise<LocationResult> => {
  const hasPermission = await requestLocationPermission();
  console.log(hasPermission, 'permsion');
  // const dispatch = useDispatch()
  // if (!hasPermission) {
  //   console.log("❌ Permission denied → Defaulting to Hyderabad");
  //   return {
  //     latitude: 17.3850,
  //     longitude: 78.4867,

  //   };
  // }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        console.log('📍 Location:', latitude, longitude);
        // dispatch(authAction.latLog({ data: { lat: latitude, log: longitude } }));
        return resolve({
          latitude,
          longitude,
        });

        // try {
        // //   const city = await getCityFromLatLong(latitude, longitude);
        //   resolve({
        //     latitude,
        //     longitude,
        //     // city: city || "Hyderabad", // fallback if city not found
        //   });
        // } catch (err) {
        //   console.log("⚠️ City fetch failed → Defaulting to Hyderabad");
        //   resolve({
        //     latitude: 17.3850,
        //     longitude: 78.4867,
        //     city: "Hyderabad",
        //   });
        // }
      },
      error => {
        console.log('❌ Location error:', error);
        requestLocationPermission()
        // Fallback to Hyderabad
        // resolve({
        //   latitude: 0.00,
        //   longitude: 0.00,
        //   city: 'Hyderabad',
        // });
      },
      {
        enableHighAccuracy: false,
        timeout: 60000,
        maximumAge: 20000,
      },
    );
  });
};

export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      const fine = result[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
      const coarse =
        result[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION];

      return (
        fine === PermissionsAndroid.RESULTS.GRANTED ||
        coarse === PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true;
  } catch (error) {
    console.log('Permission error:', error);
    return false;
  }
};
