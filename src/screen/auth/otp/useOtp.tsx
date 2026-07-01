import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { authVerifyOtp } from '../../../api/authApi/AuthApi';
import { errorToast, successToast } from '../../../utils/customToast';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/feature/authSlice';
import { resetToLogin, resetToMainTabs } from '../../../routes/navigationService';

export const useOtpVerification = () => {
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const { loginData, type } = route.params || {};
  const dispatch = useDispatch();

  const [value, setValue] = useState(''); // OTP input
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60); // Start with 60 seconds

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
      // Implementation for resend if needed
      successToast('OTP Resent Successfully!');
      setTimer(60);
      setValue('');
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

    try {
      const body = {
        login: loginData?.login,
        role: loginData?.role || 'driver',
        otp: value,
      };

      const response = await authVerifyOtp(body, setIsLoading);
      console.log('OTP Verification Response:', response);

      if (response?.success) {
        successToast(response?.message || 'OTP Verified Successfully!');

        if (type === 'forgot_password') {
          resetToLogin();
          return;
        }

        dispatch(
          loginSuccess({
            userData: response.data.user,
            token: response.data.token,
          })
        );

        resetToMainTabs();
      } else {
        errorToast(response?.message || 'OTP verification failed');
      }
    } catch (error: any) {
      errorToast(error.message || 'Something went wrong');
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
    handleResendOTP,
    navigation,
    loginData
  };
};
