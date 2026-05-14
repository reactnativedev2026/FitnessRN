import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';

import CustomButton from '../../../compoent/CustomButton';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import LoadingModal from '../../../utils/Loader';
import { useOtpVerification } from './useOTPVerification';
import { styles as otpStyles } from './style';
import loginStyles from '../login/style';
import { color } from '../../../constant';
import imageIndex from '../../../assets/imageIndex';

export default function OtpScreen() {
  const {
    value,
    isLoading,
    errorMessage,
    timer,
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyOTP,
    handleResendOTP,
    navigation
  } = useOtpVerification();

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const isLandscape = windowWidth > windowHeight;
  const screenHeight = Dimensions.get('screen').height;
  const logoSectionHeight = isLandscape ? windowHeight * 0.4 : screenHeight * 0.35;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.background }}>
      <StatusBarComponent />
      <LoadingModal visible={isLoading} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo Section with Background Image */}
            <ImageBackground
              source={imageIndex.loginTop}
              style={{
                height: logoSectionHeight,
                width: '100%',
                justifyContent: 'flex-end',
                paddingBottom: 20
              }}
              resizeMode="cover"
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}
              >
                <Image source={imageIndex.back} style={{ width: 24, height: 24, }} />
              </TouchableOpacity>

              <Image
                source={imageIndex.appLogo}
                style={{ height: 100, width: '90%', alignSelf: 'center', marginBottom: 20 }}
                resizeMode="contain"
              />
              <Text style={loginStyles.title}>Verify OTP</Text>
            </ImageBackground>

            {/* Form Section */}
            <View style={{ paddingHorizontal: 20, flex: 1, marginTop: 20 }}>
              <Text style={loginStyles.subTitle}>
                A verification code was sent to the address. Enter the code received below.
              </Text>

              <View style={otpStyles.otpFieldContainer}>
                <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  returnKeyType="done"
                  onChangeText={handleChangeText}
                  cellCount={6}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <View key={index} style={otpStyles.cellWrapper}>
                      <Text
                        style={[otpStyles.cell, isFocused && otpStyles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}
                      >
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  )}
                />
                {errorMessage ? <Text style={otpStyles.errorText}>{errorMessage}</Text> : null}
              </View>

              <Text style={[loginStyles.subTitle, { marginTop: 20 }]}>
                {timer > 0 ? (
                  `You can resend the code in ${timer} sec.`
                ) : (
                  <Text style={loginStyles.subTitle}>
                    Didn't receive the code?{' '}
                    <Text style={[loginStyles.subTitle, { color: color.primary, fontWeight: '700' }]} onPress={handleResendOTP}>
                      Resend OTP
                    </Text>
                  </Text>
                )}
              </Text>

              <View style={{ marginTop: 30, marginBottom: 30 }}>
                <CustomButton title="Continue" onPress={handleVerifyOTP} style={loginStyles.loginBtn} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
