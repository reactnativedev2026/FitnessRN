import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { loginApi } from '../../../api/authApi/AuthApi';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { errorToast, successToast } from '../../../utils/customToast';
import { loginSuccess } from '../../../redux/feature/authSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENDPOINT } from '../../../api/endpoints';
// import messaging from '@react-native-firebase/messaging';

interface Credentials {
  email: string;
  password: string;
}

const useLogin = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
    // email: 'A@gmail.com',
    // password: '123456',
  });

  const [errors, setErrors] = useState<Partial<Credentials>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleChange = (field: keyof Credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateFields = () => {
    const validationErrors: Partial<Credentials> = {};
    if (!credentials.email) validationErrors.email = 'Email is required';
    if (!credentials.password) validationErrors.password = 'Password is required';
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const dispatch = useDispatch()

  const handleLogin = async () => {
    if (!validateFields()) return;

    try {
      const fcmToken = await AsyncStorage.getItem('fcmToken') || '';

      const response = await loginApi(
        {
          url: ENDPOINT.LOGIN,
          body: {
            ...credentials,
            device_token: fcmToken,
          },
        },
        setIsLoading
      );
      if (response?.success) {
        dispatch(
          loginSuccess({
            userData: response.data,
            token: response.data.token,
          })
        );
        await AsyncStorage.setItem('token', response.data.token);
        successToast(response?.message || 'Login successful');
        navigation.navigate(ScreenNameEnum.DrawerNavgation);
      } else {
        errorToast(response?.message || 'Login failed');
      }
    } catch (error: any) {
      errorToast(error?.message || 'Login Error');
    }
  };

  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleLogin,
    navigation,
  };
};

export default useLogin;
