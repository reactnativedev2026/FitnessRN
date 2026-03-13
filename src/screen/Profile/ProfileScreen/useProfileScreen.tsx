// useSignup.ts
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { signupApi, UpdteProfileApi } from '../../../api/authApi/AuthApi';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { errorToast } from '../../../utils/customToast';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/feature/authSlice';

interface Credentials {
  email: string;
  password: string;
  cpassword?: string;
  fullName: string;
  mobile: string;
  driverLicenseNumber: string;
  issuedState: string;
  issuedDate: string;
  language: string;
  dotNumber: string;
  mcNumber: string;
  companyName: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const useProfileScreen = () => {
  const { userData } = useSelector((state: any) => state.auth);

  const navigation = useNavigation();
  const [credentials, setCredentials] = useState<Credentials>({
    fullName: '',
    mobile: '',
    driverLicenseNumber: '',
    issuedState: '',
    issuedDate: '',
    language: '',
    dotNumber: '',
    mcNumber: '',
    companyName: '',
  });

  // useEffect(() => {
  //   if (userData?.user_data) {
  //     setCredentials({
  //       fullName: userData.user_data.user_name || 'dddd',
  //       mobile: userData.user_data.mobile_number || '',
  //       driverLicenseNumber: userData.user_data.driver_license_number || '',
  //       issuedState: userData.user_data.issued_state || '',
  //       issuedDate: userData.user_data.issued_date || '',
  //       language: userData.user_data.language || '',
  //       dotNumber: userData.user_data.dot_number || '',
  //       mcNumber: userData.user_data.mc_number || '',
  //       companyName: userData.user_data.company_name || '',
  //     });
  //   }
  // }, [userData?.user_data]);


  useEffect(() => {
    console.log("Updated credentials 👉", credentials);
  }, [credentials]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  useEffect(() => {
    if (userData?.user_data) {
      setCredentials({
        fullName: userData.user_data.user_name ?? '',
        mobile: userData.user_data.mobile_number ?? '',
        email: userData.user_data.email ?? '',
        driverLicenseNumber: userData.user_data.driver_license_number ?? '',
        issuedState: userData.user_data.issuedState ?? '',
        // issuedDate: userData.user_data.issuedDate ?? '',
        language: userData.user_data.language ?? '',
        dotNumber: userData.user_data.dot_number ?? '',
        mcNumber: userData.user_data.mc_number ?? '',
        companyName: userData.user_data.company_name ?? '',
      });

    }
  }, [userData?.user_data]);
  // US States list
  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  // Languages list
  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Hindi',
    'Arabic',
    'Russian',
    'Portuguese',
    'Japanese'
  ];

  const handleChange = (field: keyof Credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    // Clear specific field error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    // Clear general error when user interacts with any field
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: '' }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  const validateFields = (): boolean => {
    const validationErrors: ValidationErrors = {};
    const {
      email,
      password,
      cpassword,
      mobile,
      fullName,
      driverLicenseNumber,
      issuedState,
      issuedDate,
      language,
      dotNumber,
      mcNumber,
      companyName
    } = credentials;

    // Required field validations
    if (!fullName.trim()) validationErrors.fullName = 'Full name is required';

    if (!email.trim()) validationErrors.email = 'Email is required';
    else if (!validateEmail(email)) validationErrors.email = 'Please enter a valid email';

    if (!mobile.trim()) validationErrors.mobile = 'Mobile number is required';

    // if (!driverLicenseNumber.trim()) validationErrors.driverLicenseNumber = 'Driver License Number is required';
    // if (!issuedState.trim()) validationErrors.issuedState = 'Issued State is required';
    //  if (!language.trim()) validationErrors.language = 'Language is required';
    if (!dotNumber.trim()) validationErrors.dotNumber = 'DOT Number is required';
    if (!mcNumber.trim()) validationErrors.mcNumber = 'MC Number is required';
    if (!companyName.trim()) validationErrors.companyName = 'Company Name is required';
    console.log(validationErrors, 'validationErrors')

    if (Object.keys(validationErrors).length > 0) {

      setErrors(validationErrors);
      return false;
    }

    return true;
  };
  const dispatch = useDispatch()
  const handleSignup = async () => {
    if (!validateFields()) return;

    setIsLoading(true);
    setErrors({});
    const token = await AsyncStorage.getItem('token');
    try {
      const signupData = {
        email: credentials.email.trim(),
        user_name: credentials.fullName.trim(),
        mobile_number: credentials.mobile.trim(),
        driver_license_number: credentials.driverLicenseNumber.trim(),
        issued_date: credentials.issuedState,
        // language: credentials.language.trim(),
        dot_number: credentials.dotNumber.trim(),
        mc_number: credentials.mcNumber.trim(),
        company_name: credentials.companyName.trim(),
        // token: token
      };

      const response = await UpdteProfileApi(signupData, token, setIsLoading);
console.log('this is response for ', response.data)
      if (response.success) {
        dispatch(
          loginSuccess({
            userData: {user_data : response.data},          // ✅ full user object
            token: token,
          })
        );
        navigation.goBack()
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
    termsAccepted,
    showDatePicker,
    showStateModal,
    showLanguageModal,
    usStates,
    languages,
    setTermsAccepted,
    setShowDatePicker,
    setShowStateModal,
    setShowLanguageModal,
    handleChange,
    handleSignup,
  };
};

export default useProfileScreen;