import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Animated,
  Easing,
  Image
} from 'react-native';
import imageIndex from '../../assets/imageIndex';
import font from '../../theme/font';

const LoadingModal = ({ visible = true, message = "Loading..." }: any) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        // Continuous rotation for the outer ring
        Animated.loop(
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ),
        // Pulse effect for the white logo
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseValue, {
              toValue: 1.2,
              duration: 800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseValue, {
              toValue: 1,
              duration: 800,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ),
        // Fade in modal
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      spinValue.setValue(0);
      pulseValue.setValue(1);
      fadeValue.setValue(0);
    }
  }, [visible]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!visible) return null;
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, { opacity: fadeValue }]}>
          <View style={styles.loaderWrapper}>
            {/* Outer Spinning Ring */}
            <Animated.View
              style={[
                styles.outerRing,
                { transform: [{ rotate: spin }] }
              ]}
            >
              <View style={styles.ringSegment} />
            </Animated.View>

            {/* Inner Glowing Logo */}
            <Animated.View style={[styles.logoContainer, { transform: [{ scale: pulseValue }] }]}>
              <Image
                source={imageIndex.appLogo} // Using appLogo1 which is typically the icon/logo
                resizeMode="contain"
                style={styles.logo}
              />
            </Animated.View>
          </View>
          {message && <Text style={styles.loadingText}>{message}</Text>}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Deep dark overlay for premium feel
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderWrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.1)', // Subtle white ring
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringSegment: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: '#FFFFFF', // Bright white spinning segment
    position: 'absolute',
  },
  logoContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 45,
    height: 45,
    tintColor: '#FFFFFF', // Ensure icon is pure white
  },
  loadingText: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.2,
    fontFamily: font.TrialMedium,
    opacity: 0.8,
  },
});

export default LoadingModal;