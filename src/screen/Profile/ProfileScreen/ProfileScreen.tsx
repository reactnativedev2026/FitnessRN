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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
 import TextInputField from '../../../compoent/TextInputField';
import CustomButton from '../../../compoent/CustomButton';
import imageIndex from '../../../assets/imageIndex';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import LoadingModal from '../../../utils/Loader';
import { color } from '../../../constant';
 import Icon from 'react-native-vector-icons/MaterialIcons';
import useProfileScreen from './useProfileScreen';

export default function ProfileScreen() {
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
  } = useProfileScreen();

 
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
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      
      <CustomHeader 
        menuIcon={imageIndex.back} 
        leftPress={() => navigation.goBack()}  
        showRight={false}
      />
      
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
            <View style={styles.formContainer}>
               <Text style={styles.sectionTitle}>Personal Information</Text>

              <TextInputField
                placeholder="Full Name"
                value={credentials.fullName}
                onChangeText={(text) => handleChange('fullName', text)}
                firstLogo
                img={imageIndex.Textprofile}
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
              {/* <TextInputField
                placeholder="issued State"
                value={credentials.issuedState}
                onChangeText={(text) => handleChange('issuedState', text)}
                firstLogo
                img={imageIndex.driver}
                error={!!errors.issuedState}
              />
              {renderError('issuedState')} */}

              {/* Issued State Dropdown */}
 
              {/* Date Picker */}
              

              {/* Language Dropdown */} 
              {/* <Text style={{
                color:"black" ,
              
                marginBottom:10,
                marginTop:19 ,
                fontWeight:"500"
              }}>Language</Text>
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
                    <Text style={styles.dropdownPlaceholder}>Language</Text>
                  )}
                  <Icon name="keyboard-arrow-down" size={24} color="#666" />
                </View>
              </TouchableOpacity>
              {renderError('language')} */}

              {/* Contact Details Section */}
              <Text style={styles.sectionTitle}>Contact Details</Text>
 

              <TextInputField
                placeholder="Phone Number"
                value={credentials.mobile}
                onChangeText={(text) => handleChange('mobile', text)}
                firstLogo
                img={imageIndex.Textphone}
                keyboardType="phone-pad"
                error={!!errors.mobile}
                maxLength={15}
              />
              {renderError('mobile')}

                <TextInputField
                placeholder="Email"
                value={credentials.email}
                onChangeText={(text) => handleChange('email', text)}
                firstLogo
                img={imageIndex.Textphone}
                // keyboardType="phone-pad"
                error={!!errors.mobile}
                maxLength={15}
              />
              {renderError('email')}

              {/* FMCSA Verification Section */}
              <Text style={styles.sectionTitle}>FMCSA Verification</Text>
              
        
              <TextInputField
                placeholder="MC Number"
                value={credentials.mcNumber}
                onChangeText={(text) => handleChange('mcNumber', text)}
                firstLogo={false}
                error={!!errors.mcNumber}
                editable={false}
              />
              {renderError('mcNumber')}

                    <TextInputField
                placeholder="DOT Number"
                value={credentials.dotNumber}
                onChangeText={(text) => handleChange('dotNumber', text)}
                firstLogo={false}
                error={!!errors.dotNumber}
                  editable={false}
              />
              {renderError('dotNumber')}


              {/* Company Details Section */}
              <Text style={styles.sectionTitle}>Company Details</Text>
              
              <TextInputField
                placeholder="Thompson Freight Logistics LLC"
                firstLogo={false}
                value={credentials.companyName}
                onChangeText={(text) => handleChange('companyName', text)}
                error={!!errors.companyName}
              />
              {renderError('companyName')}
 
            </View>

            {/* Submit Button */}
            <CustomButton
              title="Save"
              onPress={handleSignup}
            />
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
                <Text style={styles.modalTitle}>Select Language</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  formWrapper: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
     shadowOffset: { width: 0, height: 2 },
  
  },
  logo: {
    height: 44,
    width: 120,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 18,
    color: "black"
  },
  subtitle: {
    fontSize: 16,
    color: '#9DB2BF',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 5,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#F7F8F8',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#F7F8F8',
  },
  dropdownError: {
    borderColor: '#FF3B30',
  },
  dropdownInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 15,
    paddingHorizontal: 5,
  },
  checkboxOuter: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 2,
    backgroundColor: color.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  signUpText: {
    fontSize: 16,
    color: '#909090',
    fontWeight: '500'
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: '700',
    color: color.primary
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 10,
  },
  checkboxError: {
    borderColor: '#FF3B30',
  },
  generalError: {
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  generalErrorText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
});