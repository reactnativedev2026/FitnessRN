// useSignup.ts
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UpdteProfileApi } from '../../../api/authApi/AuthApi';
import { errorToast } from '../../../utils/customToast';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/feature/authSlice';

interface Credentials {
  email: string;
  fullName: string;
  profileImage: string | null;
  mobile: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const useProfileScreen = () => {
  const { userData } = useSelector((state: any) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState<Credentials>({
    fullName: '',
    email: '',
    profileImage: null,
    mobile: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData?.user_data) {
      setCredentials({
        fullName: userData.user_data.user_name ?? '',
        email: userData.user_data.email ?? '',
        mobile: userData.user_data.mobile_number ?? '',
        profileImage: userData.user_data.profile_image ?? null,
      });
    }
  }, [userData?.user_data]);

  const handleChange = (field: keyof Credentials, value: any) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFields = (): boolean => {
    const validationErrors: ValidationErrors = {};
    const { email, fullName } = credentials;

    if (!fullName.trim()) validationErrors.fullName = 'Full name is required';
    if (!email.trim()) validationErrors.email = 'Email is required';
    else if (!validateEmail(email)) validationErrors.email = 'Please enter a valid email';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const handleUpdateProfile = async () => {
    if (!validateFields()) return;
    return;
    setIsLoading(true);
    setErrors({});
    const token = await AsyncStorage.getItem('token');

    try {
      const updateData = {
        email: credentials.email.trim(),
        user_name: credentials.fullName.trim(),
        // profile_image: credentials.profileImage, // Handle based on API requirements
      };

      const response = await UpdteProfileApi(updateData, token, setIsLoading);

      if (response.success) {
        dispatch(
          loginSuccess({
            userData: {
              user_data: {
                ...userData.user_data,
                ...updateData,
                // profile_image: credentials.profileImage // update if changed
              }
            },
            token: token,
          })
        );
        navigation.goBack();
      }
    } catch (error: any) {
      errorToast(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleUpdateProfile,
  };
};

export default useProfileScreen;