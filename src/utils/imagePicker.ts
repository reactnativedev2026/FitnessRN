import ImagePicker from 'react-native-image-crop-picker';
import { Alert, Linking, Platform } from 'react-native';
import { check, checkMultiple, PERMISSIONS, request, requestMultiple, RESULTS } from 'react-native-permissions';

export type ImageSourceType = 'camera' | 'gallery';

type PickImageOptions = {
  width?: number;
  height?: number;
  cropping?: boolean;
  includeBase64?: boolean;
  compressImageQuality?: number;
};

const defaultOptions = {
  width: 1000,
  height: 1000,
  cropping: true,
  mediaType: 'photo' as const,
  compressImageQuality: 0.75,
};

const openPermissionSettings = () => {
  Alert.alert(
    'Permission Required',
    'Please allow permission from settings to continue.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => Linking.openSettings() },
    ],
  );
};

const getPermission = (source: ImageSourceType) => {
  if (Platform.OS === 'ios') {
    return source === 'camera'
      ? PERMISSIONS.IOS.CAMERA
      : PERMISSIONS.IOS.PHOTO_LIBRARY;
  }

  if (source === 'camera') {
    return PERMISSIONS.ANDROID.CAMERA;
  }

  return Number(Platform.Version) >= 33
    ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
};

const getGalleryPermissions = () => {
  if (Platform.OS === 'ios') {
    return [PERMISSIONS.IOS.PHOTO_LIBRARY];
  }

  if (Number(Platform.Version) >= 34) {
    return [
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED,
    ];
  }

  if (Number(Platform.Version) >= 33) {
    return [PERMISSIONS.ANDROID.READ_MEDIA_IMAGES];
  }

  return [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
};

const isAllowedStatus = (status?: string) => {
  return status === RESULTS.GRANTED || status === RESULTS.LIMITED;
};

const ensureGalleryPermission = async () => {
  const permissions = getGalleryPermissions();
  let statuses = await checkMultiple(permissions);

  if (permissions.some(permission => isAllowedStatus(statuses[permission]))) {
    return true;
  }

  const needsRequest = permissions.filter(permission => statuses[permission] === RESULTS.DENIED);

  if (needsRequest.length > 0) {
    statuses = {
      ...statuses,
      ...(await requestMultiple(needsRequest)),
    };
  }

  if (permissions.some(permission => isAllowedStatus(statuses[permission]))) {
    return true;
  }

  if (permissions.some(permission => statuses[permission] === RESULTS.BLOCKED)) {
    openPermissionSettings();
  }

  return false;
};

const ensureImagePermission = async (source: ImageSourceType) => {
  if (source === 'gallery') {
    return ensureGalleryPermission();
  }

  const permission = getPermission(source);
  let status = await check(permission);

  if (status === RESULTS.DENIED) {
    status = await request(permission);
  }

  if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
    return true;
  }

  if (status === RESULTS.BLOCKED) {
    openPermissionSettings();
  }

  return false;
};

export const pickImageFromSource = async (
  source: ImageSourceType,
  options: PickImageOptions = {},
) => {
  const pickerOptions = {
    ...defaultOptions,
    ...options,
  };

  if (Platform.OS === 'ios') {
    if (source === 'camera') {
      return ImagePicker.openCamera(pickerOptions);
    }

    return ImagePicker.openPicker(pickerOptions);
  }

  const hasPermission = await ensureImagePermission(source);

  if (!hasPermission) {
    return null;
  }

  if (source === 'camera') {
    return ImagePicker.openCamera(pickerOptions);
  }

  return ImagePicker.openPicker(pickerOptions);
};

export const isImagePickerCancelled = (error: any) => {
  return error?.code === 'E_PICKER_CANCELLED' || error?.message?.includes('cancelled');
};
