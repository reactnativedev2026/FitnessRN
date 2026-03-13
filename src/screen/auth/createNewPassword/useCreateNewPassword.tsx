import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
  import ScreenNameEnum from '../../../routes/screenName.enum';
import { Alert } from 'react-native';
import { ApiCall } from '../../../api/authApi/AuthApi';
import { errorToast, successToast } from '../../../utils/customToast';
import { ENDPOINT } from '../../../api/endpoints';
// import { updatePassword } from '../../../api/apiRequest';
 
const useCreateNewPassword = () => {
  const [credentials, setCredentials] = useState<any>({
    password: '',
    confirmPassword: '',
  });
  const route: any = useRoute();
  const { userId } = route.params || {}; // Make sure userId exists
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleChange = (field: string, value: string) => {
    setCredentials((prev: any) => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: '' }));

    if (field === "password" && value.length < 5) {
      setErrors((prev: any) => ({ ...prev, password: "Password must be at least 5 characters." }));
    }
    if (field === "confirmPassword" && value !== credentials.password) {
      setErrors((prev: any) => ({ ...prev, confirmPassword: "Passwords do not match." }));
    }
  };

  const handleResetPass = async () => {
    const { password, confirmPassword } = credentials;

    let validationErrors: any = {};
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
      setIsLoading(true);
      const endPoint = ENDPOINT.CREATE_NEW_PASSWORD;
      const params = {
        password: password,
        c_password: confirmPassword,
        user_id: userId,
      };

      const res = await ApiCall(endPoint, params, setIsLoading);

      if (res.success) {
        successToast('Password created successfully!');
        navigation.navigate(ScreenNameEnum.Login); // Navigate to login or wherever needed
      } else {
        errorToast(res.message || 'Password reset failed');
      }
    } catch (error: any) {
      errorToast(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
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
