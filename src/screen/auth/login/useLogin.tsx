import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { authForgotPassword, authLogin } from '../../../api/authApi/AuthApi';
import { errorToast, successToast } from '../../../utils/customToast';

interface Credentials {
  email: string;
  phone: string;
  password: string;
}

const useLogin = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    // email: '',
    email: __DEV__ ? 'gs@yopmail.com' : '',
    phone: '',
    // password: '',
    password: __DEV__ ? '12345678' : '',
  });

  const [errors, setErrors] = useState<Partial<Credentials>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleChange = (field: keyof Credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  const validateFields = (activeTab: 'email' | 'phone') => {
    const validationErrors: Partial<Credentials> = {};
    if (activeTab === 'email' && !credentials.email) {
      validationErrors.email = 'Email is required';
    }
    if (activeTab === 'phone' && !credentials.phone) {
      validationErrors.phone = 'Phone number is required';
    }
    if (!credentials.password) {
      validationErrors.password = 'Password is required';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const validateLoginTarget = (activeTab: 'email' | 'phone') => {
    const validationErrors: Partial<Credentials> = {};
    if (activeTab === 'email' && !credentials.email) {
      validationErrors.email = 'Email is required';
    }
    if (activeTab === 'phone' && !credentials.phone) {
      validationErrors.phone = 'Phone number is required';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = async (activeTab: 'email' | 'phone') => {
    if (!validateFields(activeTab)) return;

    try {
      const body = {
        login: activeTab === 'email' ? credentials.email : credentials.phone,
        password: credentials.password,
        role: 'driver',
      };

      const response = await authLogin(body, setIsLoading);

      if (response?.success) {
        successToast(response?.message || 'OTP sent successfully');
        navigation.navigate(ScreenNameEnum.OtpScreen, {
          loginData: response.data
        });
      } else {
        errorToast(response?.message || 'Login failed');
      }
    } catch (error: any) {
      errorToast(error?.message || 'Login Error');
    }
  };

  const handleForgotPassword = async (activeTab: 'email' | 'phone') => {
    if (!validateLoginTarget(activeTab)) return;

    try {
      const body = {
        login: activeTab === 'email' ? credentials.email : credentials.phone,
        role: 'driver',
      };

      const response = await authForgotPassword(body, setIsLoading);

      if (response?.success) {
        successToast(response?.message || 'OTP sent successfully');
        navigation.navigate(ScreenNameEnum.OtpScreen, {
          type: 'forgot_password',
          loginData: body,
        });
      } else {
        errorToast(response?.message || 'Failed to send OTP');
      }
    } catch (error: any) {
      errorToast(error?.message || 'Forgot password failed');
    }
  };

  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleLogin,
    handleForgotPassword,
    clearErrors,
    navigation,
  };
};

export default useLogin;
