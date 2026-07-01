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
} from 'react-native';
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
import TextInputField from '../../../component/common/TextInputField';
import CustomButton from '../../../component/common/CustomButton';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../component/common/StatusBarCompoent';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../../../component/LoadingModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useProfileScreen from './useProfile';
import { pickProfileImage } from './imagePicker';
import { makeStyles } from './profile.styles';
import ImageSourceSheet from '../../../component/common/ImageSourceSheet';
import { ImageSourceType } from '../../../utils/imagePicker';
import { useAppTheme } from '../../../theme/ThemeProvider';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [imageSheetVisible, setImageSheetVisible] = useState(false);
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);
  const {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleUpdateProfile,
  } = useProfileScreen();

  const handleImagePick = async (source: ImageSourceType) => {
    const result = await pickProfileImage(source);
    if (result) {
      handleChange('profileImage', result);
    }
  };

  return (
    <AppSafeAreaView style={styles.container}>
      <StatusBarComponent />

      <ScreenHeader title="Edit Profile" showNotification={false} />

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
                    : imageIndex.prfile
                }
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editButton} onPress={() => setImageSheetVisible(true)}>
                <Icon name="camera-alt" size={20} color={theme.colors.textInverse} />
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

      <ImageSourceSheet
        visible={imageSheetVisible}
        title="Update Profile Photo"
        onClose={() => setImageSheetVisible(false)}
        onSelect={handleImagePick}
      />
    </AppSafeAreaView>
  );
}
