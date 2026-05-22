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
import Video from 'react-native-video';
import StatusBarComponent from '../../../component/common/StatusBarCompoent';
import CustomButton from '../../../component/common/CustomButton';
import TextInputField from '../../../component/common/TextInputField';
import LoadingModal from '../../../utils/Loader';
import useForgot from './useForgot';
import imageIndex from '../../../assets/imageIndex';
import styles from '../login/style';
import { useIsFocused } from '@react-navigation/native';

export default function PasswordReset() {
  const { credentials, errors, isLoading, handleChange, handleForgot, navigation } = useForgot();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const isLandscape = windowWidth > windowHeight;
  const screenHeight = Dimensions.get('screen').height;
  const logoSectionHeight = isLandscape ? windowHeight * 0.4 : screenHeight * 0.30;
  const isFocused = useIsFocused();

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
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}
              >
                <Image source={imageIndex.back} style={{ width: 40, height: 40, }} />
              </TouchableOpacity>

              <Image
                source={imageIndex.appLogo}
                style={{ height: 100, width: '90%', alignSelf: 'center', marginBottom: 20 }}
                resizeMode="contain"
              />
              <Text style={styles.title}>Forgot Password</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formBox}>
              <Text style={styles.subTitle}>
                Please enter your email to reset your password
              </Text>

              <View style={{ marginTop: 15 }}>
                <TextInputField
                  placeholder="Email"
                  text={credentials.email}
                  onChangeText={(value: string) => handleChange('email', value)}
                  firstLogo={true}
                  img={imageIndex.email}
                  keyboardType="email-address"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>
              <View style={{ marginTop: 0, marginBottom: 30 }}>
                <CustomButton title="Send" onPress={handleForgot} style={styles.loginBtn} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
