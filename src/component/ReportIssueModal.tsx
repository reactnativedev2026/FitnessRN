import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { color } from '../theme/colors';
import font from '../theme/font';
import CustomButton from './common/CustomButton';
import Toast from 'react-native-toast-message';
import toastConfig from '../utils/customToast';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageSourceSheet from './common/ImageSourceSheet';
import { ImageSourceType, isImagePickerCancelled, pickImageFromSource } from '../utils/imagePicker';

const { width } = Dimensions.get('window');

interface ReportIssueModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { issue: string; issue_photo: string | null }) => void;
}

const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ visible, onClose, onSubmit }) => {
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [imageSheetVisible, setImageSheetVisible] = useState(false);

  const handlePickPhoto = async (source: ImageSourceType) => {
    try {
      const image = await pickImageFromSource(source, {
        width: 1000,
        height: 1000,
        cropping: false,

        includeBase64: true,
        compressImageQuality: 0.5,
      });

      if (image && image.data) {
        setPhoto(`data:${image.mime};base64,${image.data}`);
      }
    } catch (error: any) {
      if (!isImagePickerCancelled(error)) {
        console.error('Photo capture error:', error);
      }
    }
  };

  const handleSubmit = () => {
    if (note.trim()) {
      onSubmit({ issue: note, issue_photo: photo });
      setNote('');
      setPhoto(null);
      Toast.show({
        type: 'success',
        text1: 'Issue Reported',
        text2: 'Your issue has been submitted successfully.',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please provide a note describing the issue.',
      });
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Report Issue</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <Text style={styles.label}>Issue Note <Text style={{ color: 'red' }}>*</Text></Text>
              <TextInput
                style={styles.textArea}
                placeholder="Describe your issue here (e.g., door locked, customer not available)..."
                placeholderTextColor="#6F767E"
                multiline={true}
                numberOfLines={5}
                value={note}
                onChangeText={setNote}
                textAlignVertical="top"
              />

              <Text style={styles.label}>Issue Photo (Optional)</Text>
              <View style={styles.photoContainer}>
                {photo ? (
                  <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: photo }} style={styles.previewImage} />
                    <TouchableOpacity
                      style={styles.changePhotoButton}
                      onPress={() => setImageSheetVisible(true)}
                      activeOpacity={0.85}
                    >
                      <Icon name="swap-horizontal-outline" size={17} color="#fff" />
                      <Text style={styles.changePhotoText}>Change Photo</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View style={styles.photoEmptyIcon}>
                      <Icon name="image-outline" size={30} color="#9CA3AF" />
                    </View>
                    <Text style={styles.photoHintText}>Attach an issue photo from camera or gallery</Text>
                    <View style={styles.photoActionRow}>
                      <TouchableOpacity
                        style={styles.photoActionButton}
                        onPress={() => handlePickPhoto('camera')}
                        activeOpacity={0.85}
                      >
                        <Icon name="camera-outline" size={20} color="#fff" />
                        <Text style={styles.photoActionText}>Camera</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.photoActionButton}
                        onPress={() => handlePickPhoto('gallery')}
                        activeOpacity={0.85}
                      >
                        <Icon name="images-outline" size={20} color="#fff" />
                        <Text style={styles.photoActionText}>Gallery</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>

              <View style={styles.buttonWrapper}>
                <CustomButton
                  title="Submit Issue"
                  onPress={handleSubmit}
                  style={styles.submitBtn}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <Toast config={toastConfig} />
        <ImageSourceSheet
          visible={imageSheetVisible}
          title="Add Issue Photo"
          onClose={() => setImageSheetVisible(false)}
          onSelect={handlePickPhoto}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    width: '100%',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: '#1C1F26',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: font.TrialBold,
    color: color.white,
    letterSpacing: 0.5,
  },
  closeButton: {
    backgroundColor: '#393B48',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 16,
    color: color.white,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 15,
    fontFamily: font.TrialBold,
    color: '#9CA3AF',
    marginBottom: 8,
    marginTop: 10,
  },
  textArea: {
    backgroundColor: '#1C2533',
    borderRadius: 16,
    padding: 16,
    height: 120,
    fontSize: 15,
    fontFamily: font.MonolithRegular,
    color: color.white,
    borderWidth: 1,
    borderColor: '#393B48',
  },
  photoContainer: {
    backgroundColor: '#1C2533',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#393B48',
    borderStyle: 'dashed',
    marginTop: 5,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#111827',
  },
  photoEmptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
    marginBottom: 10,
  },
  photoHintText: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 14,
    fontFamily: font.MonolithRegular,
  },
  photoActionRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  photoActionButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: color.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  photoActionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: color.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  changePhotoText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  buttonWrapper: {
    marginTop: 30,
    marginBottom: 10,
  },
  submitBtn: {
    borderRadius: 15,
    backgroundColor: color.primary,
    height: 56,
  }
});

export default ReportIssueModal;
