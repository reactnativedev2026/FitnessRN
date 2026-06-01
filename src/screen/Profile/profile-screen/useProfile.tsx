// useSignup.ts
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UpdteProfileApi } from '../../../api/authApi/AuthApi';
import { errorToast } from '../../../utils/customToast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/feature/authSlice';

interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  phoneCode: string;
  address: string;
  profileImage: any;
}

interface ValidationErrors {
  [key: string]: string;
}

const useProfileScreen = () => {
  const { userData, token } = useSelector((state: any) => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState<Credentials>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    phoneCode: '',
    address: '',
    profileImage: null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setCredentials({
        firstName: userData.first_name ?? '',
        lastName: userData.last_name ?? '',
        email: userData.email ?? '',
        mobile: userData.mobile_number ?? '',
        phoneCode: userData.phone_code ?? '+91',
        address: userData.address ?? '',
        profileImage: userData.profile_image_url || userData.profile_image || null,
      });
    }
  }, [userData]);

  const handleChange = (field: keyof Credentials, value: any) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateFields = (): boolean => {
    const validationErrors: ValidationErrors = {};
    if (!credentials.firstName.trim()) validationErrors.firstName = 'First name is required';
    if (!credentials.lastName.trim()) validationErrors.lastName = 'Last name is required';
    // if (!credentials.address.trim()) validationErrors.address = 'Address is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const handleUpdateProfile = async () => {
    if (!validateFields()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const body: any = {
        first_name: credentials.firstName.trim(),
        last_name: credentials.lastName.trim(),
        email: credentials.email.trim(),
        phone_code: credentials.phoneCode,
        mobile_number: credentials.mobile,
        address: credentials.address.trim(),
      };

      if (credentials.profileImage && typeof credentials.profileImage === 'object') {
        body.profile_image = credentials.profileImage;
      }

      const response = await UpdteProfileApi(body, token, setIsLoading);
      console.log('Profile Update API Response:', response);

      if (response.success) {
        dispatch(
          loginSuccess({
            userData: response.data,
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