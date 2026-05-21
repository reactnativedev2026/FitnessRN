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
import TextInputField from '../../../component/TextInputField';
import CustomButton from '../../../component/CustomButton';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../component/StatusBarCompoent';
import CustomHeader from '../../../component/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../../../utils/Loader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useProfileScreen from './useProfileScreen';
import { pickProfileImage } from './imagePicker';

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
      handleChange('profileImage', result.path);
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
                source={credentials.profileImage ? { uri: credentials.profileImage } : imageIndex.profile}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B18',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  photoSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#0066FF',
    backgroundColor: '#1E293B',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#0066FF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#050B18',
  },
  formContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: 30,
  },
  errorText: {
    color: '#FF4B4B',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 4,
  },
});