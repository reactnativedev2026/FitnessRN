import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';

import CustomButton from '../../../compoent/CustomButton';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import LoadingModal from '../../../utils/Loader';
import { useOtpVerification } from './useOTPVerification';
import { styles } from './style';
import { hp } from '../../../utils/Constant';
import { color } from '../../../constant';
import imageIndex from '../../../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';

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
  } = useOtpVerification();

  const nav = useNavigation();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const isLandscape = windowWidth > windowHeight;
  const screenHeight = Dimensions.get('screen').height;

  // Stable height for header section
  const headerHeight = isLandscape ? windowHeight * 0.2 : screenHeight * 0.15;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.background }}>
      <StatusBarComponent />
      <CustomHeader
        label='Verify your email'
        menuIcon={imageIndex.back}
        leftPress={() => nav.goBack()}
        showRight={false}
      />

      <LoadingModal visible={isLoading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ flexGrow: 1 }}
            removeClippedSubviews={false}
          >
            <View style={{ flex: 1 }}>
              <View style={[styles.headerSection, { height: headerHeight }]}>
                <Text style={styles.txtDes}>
                  A verification code was sent to the address. Enter the code received below.
                </Text>
                
                <Text style={[styles.txtDes, { marginTop: 30 }]}>
                  {timer > 0 ? (
                    `You can resend the code in ${timer} sec.`
                  ) : (
                    <Text style={styles.txtDes}>
                      Didn't receive the code?{' '}
                      <Text style={styles.resendText} onPress={handleResendOTP}>
                        Resend OTP
                      </Text>
                    </Text>
                  )}
                </Text>
              </View>

              <View style={styles.otpFieldContainer}>
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
                    <View key={index} style={styles.cellWrapper}>
                      <Text
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}
                      >
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  )}
                />
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
              </View>

              <View style={{ marginTop: 30 }}>
                <CustomButton title="Continue" onPress={handleVerifyOTP} />
              </View>
            </View>

            {/* Footer Text */}
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.footerText}>
                By signing up, you agree to our privacy policy and terms of use and confirm that you are not a citizen of Iran, Cuba, North Korea, Syria
              </Text>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
