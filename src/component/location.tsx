import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

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
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        console.log('📍 Location:', latitude, longitude);
        return resolve({
          latitude,
          longitude,
        });
      },
      error => {
        console.log('❌ Location error:', error);
        requestLocationPermission();
        resolve({
          latitude: 0,
          longitude: 0,
        });
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
