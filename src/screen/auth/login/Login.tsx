  import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image } from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomButton from '../../../compoent/CustomButton';
import LoadingModal from '../../../utils/Loader';
import useLogin from './useLogin';
import TextInputField from '../../../compoent/TextInputField';
import styles from './style';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';
import ScreenNameEnum from '../../../routes/screenName.enum';

export default function Login() {
  const {
    credentials,
    errors,
    isLoading,
    navigation,
    handleChange,
    handleLogin,
  } = useLogin();
// K@gmail.com
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <LoadingModal visible={isLoading} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.card}>
          {/* Logo */}
          <Image
            source={imageIndex.appLogo}
            style={{ height: 100, width: '90%', alignSelf: 'center' }}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subTitle}>Enter your Email and password</Text>

          {/* Email Input */}
          <TextInputField
            placeholder="Email"
            text={credentials.email}
            onChangeText={(value: string) => handleChange('email', value)}
            firstLogo={true}
            img={imageIndex.Textphone}
            autoFocus
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Password Input */}
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

          <Text
            style={{ color: '#000', textAlign: 'center', marginVertical: 10 }}
            onPress={() => navigation.navigate(ScreenNameEnum.PasswordReset)}
          >
            Forgot your password?
          </Text>

          {/* Login Button */}
          <View style={{ marginTop: 15 }}>
            <CustomButton title="Login" onPress={handleLogin} style={styles.loginBtn} />
          </View>
        </View>
      </ScrollView>

      {/* Sign Up */}
      <Text
        style={{ color: '#909090', textAlign: 'center', marginBottom: 40 }}
        onPress={() => navigation.navigate(ScreenNameEnum.Sinup)}
      >
        Don't have an account? <Text style={{ color: color.primary }}>Sign Up</Text>
      </Text>
    </SafeAreaView>
  );
}
