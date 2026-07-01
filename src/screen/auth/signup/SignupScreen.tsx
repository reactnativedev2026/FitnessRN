// SignUpUI.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
 import TextInputField from '../../../component/common/TextInputField';
import CustomButton from '../../../component/common/CustomButton';
import imageIndex from '../../../assets/imageIndex';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarComponent from '../../../component/common/StatusBarCompoent';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import LoadingModal from '../../../component/LoadingModal';
import { color } from '../../../theme/colors';
import useSignup from './useSignup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './signup.styles';

export default function SignUpUI() {
  const navigation = useNavigation();
   
  const {
    credentials,
    errors,
    isLoading,
    termsAccepted,
 
    showLanguageModal,
    usStates,
    languages,
    setTermsAccepted,
    setShowDatePicker,
    setShowStateModal,
    setShowLanguageModal,
    handleChange,
    handleSignup,
    fmcsaData,
    verifyMCNumber
  } = useSignup();

 
  const renderError = (field: keyof typeof errors) => {
    if (errors[field]) {
      return <Text style={styles.errorText}>{errors[field]}</Text>;
    }
    return null;
  };

 
 

  const renderLanguageItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        handleChange('language', item);
        setShowLanguageModal(false);
      }}
    >
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <AppSafeAreaView style={styles.container}>
      <StatusBarComponent />
      
      <ScreenHeader title="Sign Up" showNotification={false} />
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <LoadingModal visible={isLoading} />
          
          <View style={styles.formWrapper}>
            <Image
              source={imageIndex.appLogo}
              resizeMode='contain'
              style={styles.logo}
            />

            <Text style={styles.title}>
              Create Account
            </Text>

            <Text style={styles.subtitle}>
              Sign up and take the first step towards your goals.
            </Text>
            <View style={styles.formContainer}>
               <Text style={styles.sectionTitle}>Personal Information</Text>

              <TextInputField
                placeholder="Full Name"
                value={credentials.fullName}
                onChangeText={(text) => handleChange('fullName', text)}
                firstLogo
                img={imageIndex.Textprofile}
                error={!!errors.fullName}
              />
              {renderError('fullName')}

              <TextInputField
                placeholder="Driver License Number"
                value={credentials.driverLicenseNumber}
                onChangeText={(text) => handleChange('driverLicenseNumber', text)}
                firstLogo
                img={imageIndex.driver}
                error={!!errors.driverLicenseNumber}
              />
              {renderError('driverLicenseNumber')}
              <TextInputField
                placeholder="issued State"
                value={credentials.issuedState}
                onChangeText={(text) => handleChange('issuedState', text)}
                firstLogo
                img={imageIndex.driver}
                error={!!errors.issuedState}
              />
              {renderError('issuedState')}

              {/* Issued State Dropdown */}
 
              {/* Date Picker */}
              

              {/* Language Dropdown */} 
              <Text style={{
                color:"black" ,
              
                marginBottom:10,
                marginTop:19 ,
                fontWeight:"500"
              }}>Native language</Text>
              <TouchableOpacity
                style={[
                  styles.dropdownContainer,
                  errors.language && styles.dropdownError
                ]}
                onPress={() => setShowLanguageModal(true)}
              >
                <View style={styles.dropdownInner}>
                  {credentials.language ? (
                    <Text style={styles.dropdownText}>{credentials.language}</Text>
                  ) : (
                    <Text style={styles.dropdownPlaceholder}>Native language</Text>
                  )}
                  <Icon name="keyboard-arrow-down" size={24} color="#666" />
                </View>
              </TouchableOpacity>
              {renderError('language')}

              {/* Contact Details Section */}
              <Text style={styles.sectionTitle}>Contact Details</Text>

              <TextInputField
                placeholder="Email Address"
                value={credentials.email}
                onChangeText={(text) => handleChange('email', text)}
                firstLogo
                img={imageIndex.mess}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={!!errors.email}
              />
              {renderError('email')}

              <TextInputField
                placeholder="Phone Number"
                value={credentials.mobile}
                onChangeText={(text) => handleChange('mobile', text)}
                firstLogo
                countryCode="US"
                keyboardType="phone-pad"
                error={!!errors.mobile}
                maxLength={10}
                prefix="+1"
              />



              {renderError('mobile')}

              {/* FMCSA Verification Section */}
              {/* <Text style={styles.sectionTitle}>FMCSA Verification</Text>
              
              <TextInputField
                placeholder="DOT Number"
                value={credentials.dotNumber}
                onChangeText={(text) => handleChange('dotNumber', text)}
                firstLogo={false}
                error={!!errors.dotNumber}
              />
              {renderError('dotNumber')}

              <TextInputField
                placeholder="MC Number"
                value={credentials.mcNumber}
                onChangeText={(text) => handleChange('mcNumber', text)}
                firstLogo={false}
                error={!!errors.mcNumber}
              />
              {renderError('mcNumber')} */}
      {/* MC Number Entry */}
              <Text style={styles.sectionTitle}>FMCSA Verification</Text>
              <TextInputField
                placeholder="MC Number"
                value={credentials.mcNumber}
                onChangeText={(text) => {
                  handleChange('mcNumber', text);
                  if (text.length > 5) verifyMCNumber(text);
                }}
                firstLogo={false}
                error={!!errors.mcNumber}
                keyboardType="number-pad"
              />
                {renderError('mcNumber')}
              {/* VERIFICATION TILES (Image Implementation) */}
              <View style={styles.fmcsaWrapper}>
                <View style={styles.verifyTile}>
                   <Text style={styles.tileLabel}>{fmcsaData.dotNumber || 'DOT Number'}</Text>
                   <View style={styles.tileRight}>
                      {fmcsaData.verifying ? <ActivityIndicator size="small" color={color.primary}/> : 
                      <Text style={[styles.statusText, {color: fmcsaData.isDotVerified ? '#4CAF50' : '#999'}]}>
                        {fmcsaData.isDotVerified ? 'Verified' : '---'}
                      </Text>}
                   </View>
                </View>

                <View style={styles.verifyTile}>
                   <Text style={styles.tileLabel}>MC Status</Text>
                   <View style={styles.tileRight}>
                      <Text style={[styles.statusText, {color: fmcsaData.isMcActive ? '#4CAF50' : '#FF3B30'}]}>
                        {fmcsaData.isMcActive ? 'Active' : 'Inactive'}
                      </Text>
                   </View>
                </View>
              </View>

              {/* <TextInputField
                placeholder="DOT Number"
                value={fmcsaData.dotNumber}
                editable={false} // DOT Number is auto-filled from API
                onChangeText={(text) => handleChange('dotNumber', text)}
                firstLogo={false}
                error={!!errors.dotNumber}
                style={{backgroundColor: '#F0F0F0'}} 
              /> */}

              {/* Company Details Section */}
              <Text style={styles.sectionTitle}>Company Details</Text>
              <Text style={styles.tileLabel}>Company Name</Text>
              
              <TextInputField
                placeholder="Company Name"
                firstLogo={false}
                value={fmcsaData.companyName}
                onChangeText={(text:string) => handleChange('companyName', text)}
                error={!!errors.companyName}
                editable={false}
              />
              {renderError('companyName')}

              {/* Password Section */}
              <Text style={styles.sectionTitle}>Security</Text>
              
              <TextInputField
                placeholder="Password"
                value={credentials.password}
                onChangeText={(text) => handleChange('password', text)}
                firstLogo
                img={imageIndex.lock}
                secureTextEntry
                error={!!errors.password}
              />
              {renderError('password')}

              <TextInputField
                placeholder="Confirm Password"
                value={credentials.cpassword}
                onChangeText={(text) => handleChange('cpassword', text)}
                firstLogo
                img={imageIndex.lock}
                secureTextEntry
                error={!!errors.cpassword}
              />
              {renderError('cpassword')}

              {/* Terms & Conditions Checkbox */}
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setTermsAccepted(!termsAccepted)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.checkboxOuter,
                  errors.general && styles.checkboxError
                ]}>
                  {termsAccepted && <View style={styles.checkboxInner} />}
                </View>
                <Text style={styles.checkboxLabel}>
                  I agree to the Terms & Conditions
                </Text>
              </TouchableOpacity>
              {renderError('general')}
            </View>

            {/* Submit Button */}
            <CustomButton
              title="Create Account"
              onPress={handleSignup}
            />
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Already have an account? </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate(ScreenNameEnum.Login as never)}
            >
              <Text style={styles.signUpLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    

      {/* State Selection Modal */}
   

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowLanguageModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Native Language</Text>
                <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                  <Icon name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={languages}
                renderItem={renderLanguageItem}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </AppSafeAreaView>
  );
}
