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
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomButton from '../../../compoent/CustomButton';
import TextInputField from '../../../compoent/TextInputField';
import LoadingModal from '../../../utils/Loader';
import useCreateNewPassword from './useCreateNewPassword';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';
import styles from '../login/style';

export default function CreateNewPassword() {
  const {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleResetPass,
    navigation,
  } = useCreateNewPassword();

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
              <Text style={styles.title}>Create New Password</Text>
            </ImageBackground>

            {/* Form Section */}
            <View style={{ paddingHorizontal: 20, flex: 1, marginTop: 20 }}>
              <Text style={styles.subTitle}>
                Your new password must be different from previous used passwords.
              </Text>

              <View style={{ marginTop: 15 }}>
                <TextInputField
                  placeholder="Enter OTP"
                  text={credentials.otp}
                  onChangeText={(value: string) => handleChange('otp', value)}
                  firstLogo={true}
                  img={imageIndex.email}
                  keyboardType="number-pad"
                />
                {errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}

                <View style={{ marginTop: 15 }}>
                  <TextInputField
                    placeholder="New Password"
                    text={credentials.password}
                    onChangeText={(value: string) => handleChange('password', value)}
                    firstLogo={true}
                    img={imageIndex.lock}
                    showEye={true}
                    secureTextEntry
                  />
                  {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>

                <View style={{ marginTop: 15 }}>
                  <TextInputField
                    placeholder="Confirm Password"
                    text={credentials.confirmPassword}
                    onChangeText={(value: string) => handleChange('confirmPassword', value)}
                    firstLogo={true}
                    img={imageIndex.lock}
                    showEye={true}
                    secureTextEntry
                  />
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                </View>
              </View>

              <View style={{ marginTop: 30, marginBottom: 30 }}>
                <CustomButton title="Save" onPress={handleResetPass} style={styles.loginBtn} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
