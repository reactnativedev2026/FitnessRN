import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { authForgotPassword } from '../../../Api/authApi/AuthApi';
import { errorToast, successToast } from '../../../utils/customToast';
import ScreenNameEnum from '../../../routes/screenName.enum';

interface Credentials {
  email: string;
}

const useForgot = () => {
  const [credentials, setCredentials] = useState<Credentials>({ email: '' });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleForgot = async () => {
    const { email } = credentials;
    const validationErrors: any = {};

    if (!email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Enter a valid email address.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const body = {
        login: email,
        role: 'driver'
      };

      const response = await authForgotPassword(body, setIsLoading);

      if (response.success) {
        successToast(response.message || 'OTP sent successfully');
        navigation.navigate(ScreenNameEnum.CreateNewPassword, {
          loginData: body,
        });
      } else {
        errorToast(response.message || 'Failed to send OTP');
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
    handleForgot,
    navigation,
  };
};

export default useForgot;
