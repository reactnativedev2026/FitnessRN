import React, { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Easing,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenNameEnum from '../../../routes/screenName.enum';
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
import { restoreLogin } from '../../../redux/feature/authSlice';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../theme';

const Splash: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(45)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const bgScale = useRef(new Animated.Value(1.12)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.timing(bgScale, {
        toValue: 1,
        duration: 2600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    const timer = setTimeout(async () => {
      try {
        const authData = await AsyncStorage.getItem('authData');
        if (authData) {
          const parsedData = JSON.parse(authData);
          if (parsedData?.token) {
            dispatch(restoreLogin(parsedData));
            navigation.replace(ScreenNameEnum.TabNavigator as any);
            return;
          }
        }
        navigation.replace(ScreenNameEnum.IntroScreen as any);
      } catch (error) {
        navigation.replace(ScreenNameEnum.IntroScreen as any);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{ scale: bgScale }],
          },
        ]}>
        <ImageBackground source={imageIndex.gymBag} style={styles.bgImage} />
      </Animated.View>

      <View style={styles.darkOverlay} />
      <View style={styles.orangeOverlay} />

      <AppSafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[
            styles.centerContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}>
          <Animated.View
            style={[
              styles.logoCircle,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}>
            <Image source={imageIndex.bag} />

          </Animated.View>

          <Text style={styles.topLabel}>WELCOME TO</Text>

          <View style={styles.titleBox}>
            <Text style={styles.title}>FITNESS</Text>
            <Text style={styles.titleOrange}>PRO</Text>
          </View>



        </Animated.View>

        <Animated.View
          style={[
            styles.bottomBox,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}>
          <Text style={styles.subtitle}>Strong Body • Strong Mind</Text>
          <Text style={styles.description}>
            Build your discipline, track your progress and unlock your best version.
          </Text>
        </Animated.View>
      </AppSafeAreaView>
    </View>
  );
};

export default Splash;

const ORANGE = '#E09A45';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color?.background || '#070707',
  },
  bgImage: {
    flex: 1,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.58)',
  },
  orangeOverlay: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(224,154,69,0.22)',
    top: 100,
    alignSelf: 'center',
  },
  safeArea: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2,
    borderColor: ORANGE,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
  },
  logoText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
  },
  topLabel: {
    color: ORANGE,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 4,
    marginBottom: 10,
  },
  titleBox: {
  },
  title: {
    color: '#fff',
    fontSize: 55,
    fontWeight: '900',
    letterSpacing: 4,
    lineHeight: 62,
  },
  titleOrange: {
    color: ORANGE,
    fontSize: 60,
    fontWeight: '900',
    letterSpacing: 8,
    lineHeight: 68,
    textShadowColor: 'rgba(224,154,69,0.45)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 18,
  },
  lineBox: {
    width: 190,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 20,
    marginTop: 22,
    overflow: 'hidden',
  },
  lineFill: {
    height: '100%',
    backgroundColor: ORANGE,
    borderRadius: 20,
  },
  loadingText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 14,
  },
  bottomBox: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 36 : 30,
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  description: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
    width: '90%',
  },
});