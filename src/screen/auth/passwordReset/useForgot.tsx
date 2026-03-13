import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ApiCall, } from '../../../api/authApi/AuthApi';
import { errorToast } from '../../../utils/customToast';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { ENDPOINT } from '../../../api/endpoints';

interface Credentials {
  email: string;
}

const useForgot = () => {
  const [credentials, setCredentials] = useState<Credentials>({ email: '' });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));

    if (field === 'email') {
      if (!value.trim()) {
        setErrors(prev => ({ ...prev, email: 'Email is required.' }));
      } else if (!emailRegex.test(value)) {
        setErrors(prev => ({ ...prev, email: 'Enter a valid email address.' }));
      }
    }
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
      let endPonit =ENDPOINT.FORGOT_PASSWORD
      const params :any = { email , };
      const response = await ApiCall(endPonit,params, setIsLoading);
      if (response.success) {
        // Navigate to OTP screen if needed
       navigation.navigate(ScreenNameEnum.OtpScreen, { response: response?.data });
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
