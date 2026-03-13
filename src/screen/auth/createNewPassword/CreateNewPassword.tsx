import {
  View,
  Text,
   StyleSheet,
  ScrollView,

} from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import LoadingModal from '../../../utils/Loader';
import useCreateNewPassword from './useCreateNewPassword';
import TextInputField from '../../../compoent/TextInputField';
import ResponsiveSize from '../../../utils/ResponsiveSize';
import CustomButton from '../../../compoent/CustomButton';
import { wp } from '../../../utils/Constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordSuccessfullyModal from '../../../compoent/PasswordSuccessfullyModal';

export default function CreateNewPassword() {
  const { credentials,
    errors,
    isLoading,
    handleChange,
    handleResetPass,
    navigation, } = useCreateNewPassword();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarComponent />
      <View style={{ marginTop: 5 }}>
        {/* <CustomHeader label="Back" /> */}
        <CustomHeader label='Back' menuIcon={imageIndex.back} leftPress={() => navigation.goBack()} showRight={false} />

      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        {isLoading ? <LoadingModal /> : null}

        <View
          style={{
            backgroundColor: '#FFF',        // White background
            marginTop: hp(4),               // Responsive top margin
            marginHorizontal: 15,           // Horizontal margin
            borderColor: '#ccc',            // Add border color for better visibility
            borderRadius: 20,               // Rounded corners (optional but recommended)
            shadowColor: '#000',            // iOS shadow
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.12,
            shadowRadius: 3.84,
            elevation: 8,
          }}>

          <View style={{ marginTop: 5, }}>
            <Text style={{
              fontWeight: '700',
              fontSize: 24,
              lineHeight: 36,
              color: 'rgba(0, 0, 0, 1)',
              textAlign: 'center',
              marginTop: 8
            }}>Create New Password</Text>
            <Text style={{
              fontWeight: '400',
              fontSize: 16,
              color: '#9DB2BF',
              marginTop: 5,
              lineHeight: 20,
              textAlign: 'center'
            }}>
              Your new password must be different from previous used passwords.
            </Text>
          </View>
          <View style={{ marginHorizontal: 15, marginTop: ResponsiveSize.marginTop(18), paddingVertical: hp(2), }}>
            <TextInputField
              lable={"Password"}
              text={credentials.password}
              placeholder={'Password'}
              onChangeText={(value: string) => handleChange('password', value)} // Handles email input dynamically

              firstLogo={true}
              showEye={true}
              img={imageIndex.lock}
            />
            {errors.password ? <Text style={{ color: 'red', fontSize: 14, marginTop: 8 }}>{errors.password}</Text> : null}
            <View style={{ marginTop: 12 }}>
              <TextInputField
                lable={"Confirm Password"}
                text={credentials.confirmPassword}
                onChangeText={(value: string) => handleChange('confirmPassword', value)} // Handles email input dynamically
                placeholder={'Confirm Password'}
                firstLogo={true}
                showEye={true}
                img={imageIndex.lock}
              />
            </View>
            {errors.confirmPassword ? <Text style={{ color: 'red', fontSize: 14, marginTop: 10 }}>{errors.confirmPassword}</Text> : null}
          </View>

          <View style={{
            justifyContent: 'flex-start', marginBottom: 10,
            marginHorizontal: 15,

          }}>
            <CustomButton
              title={'Save'}
              onPress={() => {
               handleResetPass()
               }}

            />

          </View>
        </View>

        <PasswordSuccessfullyModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onOpenChat={() => {
            setModalVisible(false);

            handleResetPass()
          }}
        />
      </ScrollView>


    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: 'rgba(255, 77, 76, 1)',
    bottom: 2
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#E8442E',
    height: 55,

    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    width: wp(90),
  },
});


