import React from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputField from '../../../component/common/TextInputField';
import CustomButton from '../../../component/common/CustomButton';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../component/common/StatusBarCompoent';
import CustomHeader from '../../../component/common/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../../../component/LoadingModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useProfileScreen from './useProfile';
import { pickProfileImage } from './imagePicker';
import { styles } from './profile.styles';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleUpdateProfile,
  } = useProfileScreen();

  const handleImagePick = async () => {
    const result = await pickProfileImage();
    if (result) {
      handleChange('profileImage', result);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />

      <CustomHeader
        label="Edit Profile"
        menuIcon={imageIndex.back}
        leftPress={() => navigation.goBack()}
        showRight={false}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <LoadingModal visible={isLoading} />
          <View style={styles.photoSection}>
            <View style={styles.avatarWrapper}>
              <Image
                source={
                  credentials.profileImage
                    ? {
                      uri: typeof credentials.profileImage === 'string'
                        ? (credentials.profileImage.startsWith('http://') || credentials.profileImage.startsWith('https://')
                          ? credentials.profileImage
                          : `${'https://kimbo.aitechnotech.in'}${credentials.profileImage.startsWith('/') ? credentials.profileImage : '/' + credentials.profileImage}`)
                        : credentials.profileImage.path
                    }
                    : imageIndex.profile
                }
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editButton} onPress={handleImagePick}>
                <Icon name="camera-alt" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formContainer}>
            <TextInputField
              placeholder="First Name"
              text={credentials.firstName}
              onChangeText={(text: string) => handleChange('firstName', text)}
              firstLogo
              img={imageIndex.Textprofile}
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

            <TextInputField
              placeholder="Last Name"
              text={credentials.lastName}
              onChangeText={(text: string) => handleChange('lastName', text)}
              firstLogo
              img={imageIndex.Textprofile}
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

            <TextInputField
              placeholder="Email"
              text={credentials.email}
              editable={false}
              firstLogo
              img={imageIndex.email}
            />

            <TextInputField
              placeholder="Mobile Number"
              text={credentials.mobile}
              editable={false}
              firstLogo
              img={imageIndex.Textphone}
            />

            {/* <TextInputField
              placeholder="Address"
              text={credentials.address}
              onChangeText={(text: string) => handleChange('address', text)}
              firstLogo
              img={imageIndex.box}
            />
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>} */}
          </View>

          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Save Changes"
              onPress={handleUpdateProfile}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
