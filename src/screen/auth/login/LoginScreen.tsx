import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import StatusBarComponent from '../../../component/common/StatusBarCompoent';
import CustomButton from '../../../component/common/CustomButton';
import LoadingModal from '../../../component/LoadingModal';
import useLogin from './useLogin';
import TextInputField from '../../../component/common/TextInputField';
import { styles } from './login.styles';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../theme/colors';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useIsFocused } from '@react-navigation/native';

export default function Login() {
  const {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleLogin,
    clearErrors,
    navigation,
  } = useLogin();

  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [callingCode, setCallingCode] = useState<string>('1');
  const [visible, setVisible] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const isLandscape = windowWidth > windowHeight;

  // Use screen height for portrait to prevent jumping when keyboard opens
  const screenHeight = Dimensions.get('screen').height;
  const logoSectionHeight = isLandscape ? windowHeight * 0.4 : screenHeight * 0.30;

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <StatusBarComponent />
      <LoadingModal visible={isLoading} />

      {isFocused && (
        <Video
          source={imageIndex.kimboVideo}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode="cover"
          rate={1.0}
          ignoreSilentSwitch="obey"
          paused={!isFocused}
        />
      )}

      <View style={[styles.backgroundVideo, { backgroundColor: 'rgba(0,0,0,0.5)' }]} />

      <CountryPicker
        {...{
          countryCode,
          onSelect,
        }}
        visible={visible}
        onClose={() => setVisible(false)}
        withFilter
        withFlag
        withCallingCode
        theme={{
          backgroundColor: '#010A16',
          onBackgroundTextColor: '#fff',
          fontSize: 16,
          filterPlaceholderTextColor: '#6F767E',
          itemCountryNameTextStyle: { color: '#fff' }
        }}
        containerButtonStyle={{ display: 'none' }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            removeClippedSubviews={false}
          >
            {/* Logo Section */}
            <View
              style={{
                height: logoSectionHeight,
                width: '100%',
                justifyContent: 'flex-end',
                paddingBottom: 20
              }}
              resizeMode="cover"
            >
              <Image
                source={imageIndex.appLogo}
                style={{ height: 100, width: '90%', alignSelf: 'center', marginBottom: 20 }}
                resizeMode="contain"
              />
              <Text style={styles.title}>Login</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formBox}>
              {/* Tab Switcher */}
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[styles.tabButton, activeTab === 'email' && styles.activeTab]}
                  onPress={() => {
                    setActiveTab('email');
                    clearErrors();
                  }}
                >
                  <Text style={[styles.tabText, activeTab === 'email' && styles.activeTabText]}>
                    Email
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tabButton, activeTab === 'phone' && styles.activeTab]}
                  onPress={() => {
                    setActiveTab('phone');
                    clearErrors();
                  }}
                >
                  <Text style={[styles.tabText, activeTab === 'phone' && styles.activeTabText]}>
                    Phone number
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Conditional Input Fields */}
              {activeTab === 'email' ? (
                <>
                  <TextInputField
                    placeholder="Email"
                    text={credentials.email}
                    onChangeText={(value: string) => handleChange('email', value)}
                    firstLogo={true}
                    img={imageIndex.email}
                    keyboardType="email-address"
                  />
                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </>
              ) : (
                <>
                  <TextInputField
                    placeholder="Phone"
                    text={credentials.phone}
                    onChangeText={(value: string) => handleChange('phone', value)}
                    firstLogo={true}
                    countryCode={countryCode}
                    prefix={`+${callingCode}`}
                    onPrefixPress={() => setVisible(true)}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                  {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                </>
              )}

              <TextInputField
                placeholder="Password"
                text={credentials.password}
                onChangeText={(value: string) => handleChange('password', value)}
                firstLogo={true}
                img={imageIndex.lock}
                showEye={true}
                secureTextEntry
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TouchableOpacity
                onPress={() => navigation.navigate(ScreenNameEnum.PasswordReset)}
                style={{ alignSelf: 'flex-end', marginTop: 10 }}
              >
                <Text style={{ color: color.primary, fontWeight: '600', fontSize: 14 }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <View style={{ marginTop: 15, marginBottom: 30 }}>
                <CustomButton title="Login" onPress={() => handleLogin(activeTab)} style={styles.loginBtn} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
