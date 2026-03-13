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
  const [timer, setTimer] = useState(0);
const [userId, setUserId] = useState<string | null>(null);

 console.log("response.data.userId",response?.user_id)
  const cellCount = 4; // Number of OTP digits

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
   // Verify OTP
  const handleVerifyOTP = async () => {
    if (value.length < cellCount) {
      setErrorMessage(`Please enter ${cellCount}-digit OTP`);
      return;
    }

    try {
      setIsLoading(true);
      const endPoint = ENDPOINT.VERIFY_OTP;
      const params = {
        otp: value,               // OTP entered by the user
        user_id: response?.user_id // user ID from previous API response
      };

      const res = await ApiCall(endPoint, params, setIsLoading);
      if (res.success) {
        successToast('OTP Verified Successfully!');
        // Navigate to Create New Password screen
        navigation.navigate(ScreenNameEnum.CreateNewPassword, { userId: response?.user_id  });
      } else {
        errorToast(res.message || 'OTP verification failed');
      }
    } catch (error: any) {
      errorToast(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
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
    navigation,
    response
  };
};
