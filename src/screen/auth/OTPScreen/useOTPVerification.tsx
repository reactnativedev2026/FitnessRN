import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { ApiCall } from '../../../api/authApi/AuthApi';
import { errorToast, successToast } from '../../../utils/customToast';
import { ENDPOINT } from '../../../api/endpoints';

export const useOtpVerification = () => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const { response } = route.params || {};

  const [value, setValue] = useState(''); // OTP input
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60); // Start with 60 seconds
  const [userId, setUserId] = useState<string | null>(null);

  const cellCount = 6; // Number of OTP digits

  // OTP input helpers from react-native-confirmation-code-field
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  // Timer effect
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input changes
  const handleChangeText = (text: string) => {
    setValue(text);
    if (text.length < cellCount) {
      setErrorMessage(`Please enter ${cellCount}-digit OTP`);
    } else {
      setErrorMessage('');
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (timer > 0) return;

    try {
      setIsLoading(true);
      const endPoint = ENDPOINT.RESEND_OTP || ENDPOINT.LOGIN; // Fallback to login if resend not defined
      const params = {
        email: response?.email, // Assuming email is available in response
        user_id: response?.user_id
      };

      // Mocking resend or using login api if that's how it works
      // const res = await ApiCall(endPoint, params, setIsLoading);
      // if (res.success) {
      successToast('OTP Resent Successfully!');
      setTimer(60);
      setValue('');
      // }
    } catch (error: any) {
      errorToast(error.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    if (value.length < cellCount) {
      setErrorMessage(`Please enter ${cellCount}-digit OTP`);
      return;
    }
    navigation.navigate(ScreenNameEnum.DashBoardScreen)
    // try {
    //   setIsLoading(true);
    //   const endPoint = ENDPOINT.VERIFY_OTP;
    //   const params = {
    //     otp: value,               // OTP entered by the user
    //     user_id: response?.user_id // user ID from previous API response
    //   };

    //   const res = await ApiCall(endPoint, params, setIsLoading);
    //   if (res.success) {
    //     successToast('OTP Verified Successfully!');
    //     navigation.navigate(ScreenNameEnum.CreateNewPassword, { userId: response?.user_id });
    //   } else {
    //     errorToast(res.message || 'OTP verification failed');
    //   }
    // } catch (error: any) {
    //   errorToast(error.message || 'Something went wrong');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return {
    value,
    setValue,
    isLoading,
    errorMessage,
    timer,
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyOTP,
    handleResendOTP,
    navigation,
    response
  };
};
