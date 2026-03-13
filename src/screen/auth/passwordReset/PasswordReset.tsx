import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarCompoent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import CustomButton from '../../../compoent/CustomButton';
import TextInputField from '../../../compoent/TextInputField';
import LoadingModal from '../../../utils/Loader';
import useForgot from './useForgot';
import imageIndex from '../../../assets/imageIndex';

export default function PasswordReset() {
  const { credentials, errors, isLoading, handleChange, handleForgot, navigation } = useForgot();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarCompoent />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ marginTop: 18 }}>
          <CustomHeader
            label="Back"
            menuIcon={imageIndex.back}
            leftPress={() => navigation.goBack()}
            showRight={false}
          />
        </View>
               <LoadingModal visible={isLoading} />

        <View
          style={{
            backgroundColor: '#FFF',
            marginTop: hp(4),
            marginHorizontal: 15,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.12,
            shadowRadius: 3.84,
            elevation: 8,
            paddingVertical: 20,
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ fontWeight: '700', fontSize: 24, lineHeight: 36, textAlign: 'center' }}>
            Password Reset
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: '#9DB2BF',
              marginTop: 4,
              lineHeight: 20,
              textAlign: 'center',
            }}
          >
            Please enter your email to reset your password
          </Text>

          <View style={{ marginTop: 15 }}>
            <TextInputField
              placeholder="Email"
              text={credentials.email}
              img={imageIndex.mess}
              firstLogo
              onChangeText={value => handleChange('email', value)}
            />
            {errors.email && (
              <Text style={{ color: 'red', marginTop: 5, marginLeft: 5 }}>{errors.email}</Text>
            )}
          </View>

          <View style={{ marginTop: 20 }}>
            <CustomButton title="Send" onPress={handleForgot} />
          </View>
        </View>

        <Image
          source={imageIndex.resetPassword}
          resizeMode="contain"
          style={{ width: '70%', height: hp(50), alignSelf: 'center', marginVertical: 30 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
