import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_API } from '../api/APIRequest';
import { ENDPOINT } from '../api/endpoints';
import { logout } from '../redux/feature/authSlice';
import ScreenNameEnum from '../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';

const ProfileWatcher = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: any) => state.auth);
  const navigation = useNavigation<any>();
  const isLoggingOut = useRef(false);

  useEffect(() => {
    let interval: any;

    const checkProfileStatus = async () => {
      if (isLoggingOut.current || !isLogin) return;

      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const response = await GET_API(
          ENDPOINT.GET_PROFILE,
          token,
          "POST"
        );

        if (response?.success) {
          const approvalStatus = response?.data?.user_data?.approval_status || response?.data?.approval_status;

          if (approvalStatus !== "Approved") {
            console.log("❌ User not approved. Logging out...");
            isLoggingOut.current = true;
            dispatch(logout());
            navigation.reset({
              index: 0,
              routes: [{ name: ScreenNameEnum.Login }],
            });
          } else {

            // dispatch(
            //   loginSuccess({
            //     userData: response.data,
            //     token: token,
            //   })
            // );
          }
        }
      } catch (error) {
        console.log("❌ Profile polling error:", error);
      }
    };

    if (isLogin) {
      isLoggingOut.current = false;
      // Start interval
      interval = setInterval(checkProfileStatus, 5000);
      // Also check immediately
      checkProfileStatus();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLogin, dispatch, navigation]);

  return null;
};

export default ProfileWatcher;
