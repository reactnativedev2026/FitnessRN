import React from 'react';
import {
  View,
  Text,
  ScrollView,
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
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyOTP,
 
 
   } = useOtpVerification();
const nav = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarComponent />
      {/* <CustomHeader label="Back" /> */}
         <CustomHeader label='Back' menuIcon={imageIndex.back} leftPress={()=>nav.goBack()}  showRight={false}/>
    
      <LoadingModal visible={isLoading} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#FFF',
              marginTop: hp(4),
              borderRadius: 15,
              padding: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.22,
              shadowRadius: 3.7,
              elevation: 8,
            }}
          >
            <View style={styles.headerSection}>
              <Text style={styles.txtHeading}>Enter the verification code</Text>
              <Text style={styles.txtDes}>
                We sent you a 4-digit code to Email
                {/* We sent you a 4-digit code to +91 8305611387 */}
                 {/* {phone} {country_code}  */}
               </Text>
              <Text style={[styles.txtDes,{
                fontSize:20
              }]}>
             
                {/* otp: {response?.data?.otp} */}
              </Text>
            </View>

            <View style={styles.otpFieldContainer}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                      // blurOnSubmit={true}  // Keyboard dismiss on done
  returnKeyType="done" 
                onChangeText={handleChangeText}
                cellCount={4}
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

            <View style={{ marginTop: 15 }}>
              <CustomButton title="OTP Verify" onPress={handleVerifyOTP} />
            </View>
{/* <Text style={[styles.txtDes, {marginVertical:20, marginTop:30}]}>
                Didn't receive the code? (00:15)
                </Text> */}

          </View>
           {/* <Text style={[styles.txtDes, {marginVertical:20, marginTop:30, color:color.primary}]}>Resend OTP</Text> */}
        </ScrollView>
       
      </View>
    </SafeAreaView>
  );
}
