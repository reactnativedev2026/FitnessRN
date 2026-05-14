import React, { useEffect, useRef } from 'react';
import { Animated, ImageBackground, View, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { color } from '../../../constant';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import { styles } from './style';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { restoreLogin } from '../../../redux/feature/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RegistrationStackParamList>>();
  const dispatch = useDispatch();

  // Animation reference
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Timer for navigation
    const timer = setTimeout(async () => {
      try {
        const authData = await AsyncStorage.getItem('authData');

        if (authData) {
          const parsedData = JSON.parse(authData);
          if (parsedData?.token) {
            dispatch(restoreLogin(parsedData));
            console.log('[Splash] User session restored, navigating to Home');
            navigation.replace(ScreenNameEnum.DashBoardScreen as any);
            return;
          }
        }

        console.log('[Splash] No session found, navigating to Login');
        navigation.replace(ScreenNameEnum.Login as any);
      } catch (error) {
        console.error('Splash check failed:', error);
        navigation.replace(ScreenNameEnum.Login as any);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation, dispatch]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: color.primary }}
    >
      <StatusBarComponent backgroundColor={color.white} />

      {/* Center content */}
      <View style={styles.centerContent}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <FastImage
            style={styles.logo}
            source={imageIndex.appLogo1}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
