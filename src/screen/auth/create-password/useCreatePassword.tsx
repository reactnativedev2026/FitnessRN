import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { Alert } from 'react-native';
import { authResetPassword } from '../../../api/authApi/AuthApi';
import { errorToast, successToast } from '../../../utils/customToast';

const useCreateNewPassword = () => {
  const [credentials, setCredentials] = useState<any>({
    otp: '',
    password: '',
    confirmPassword: '',
  });
  const route: any = useRoute();
  const { loginData } = route.params || {};
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleChange = (field: string, value: string) => {
    setCredentials((prev: any) => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: '' }));
  };

  const handleResetPass = async () => {
    const { otp, password, confirmPassword } = credentials;

    let validationErrors: any = {};
    if (!otp.trim()) validationErrors.otp = 'OTP is required.';
    if (!password.trim()) validationErrors.password = 'Password is required.';
    if (!confirmPassword.trim()) validationErrors.confirmPassword = 'Confirm Password is required.';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const body = {
        login: loginData?.login,
        role: loginData?.role || 'driver',
        otp: otp,
        password: password,
        password_confirmation: confirmPassword,
      };

      const res = await authResetPassword(body, setIsLoading);

      if (res.success) {
        successToast(res.message || 'Password reset successfully!');
        navigation.navigate(ScreenNameEnum.Login);
      } else {
        errorToast(res.message || 'Password reset failed');
      }
    } catch (error: any) {
      errorToast(error.message || 'Something went wrong');
    }
  };

  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleResetPass,
    navigation,
  };
};

export default useCreateNewPassword;
