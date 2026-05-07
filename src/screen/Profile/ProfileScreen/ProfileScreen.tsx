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
import TextInputField from '../../../compoent/TextInputField';
import CustomButton from '../../../compoent/CustomButton';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
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
              placeholder="Full Name"
              text={credentials.fullName}
              onChangeText={(text: string) => handleChange('fullName', text)}
              firstLogo
              img={imageIndex.Textprofile}
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

            <TextInputField
              placeholder="Email"
              text={credentials.email}
              onChangeText={(text: string) => handleChange('email', text)}
              firstLogo
              img={imageIndex.email}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
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
  label: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: '500',
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