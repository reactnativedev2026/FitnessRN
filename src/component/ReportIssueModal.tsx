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
import ImagePicker from 'react-native-image-crop-picker';
import { requestCameraPermissions } from '../api';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface ReportIssueModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { issue: string; issue_photo: string | null }) => void;
}

const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ visible, onClose, onSubmit }) => {
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const handleTakePhoto = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 1000,
        height: 1000,
        cropping: true,
        includeBase64: true,
        compressImageQuality: 0.5,
      });

      if (image && image.data) {
        setPhoto(`data:${image.mime};base64,${image.data}`);
      }
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
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
              <TouchableOpacity style={styles.photoContainer} onPress={handleTakePhoto}>
                {photo ? (
                  <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: photo }} style={styles.previewImage} />
                    <Text style={styles.photoActionText}>Tap to retake</Text>
                  </View>
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Icon name="camera-outline" size={32} color="#9CA3AF" />
                    <Text style={styles.photoActionText}>Tap to take photo</Text>
                  </View>
                )}
              </TouchableOpacity>

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
    marginBottom: 8,
  },
  photoActionText: {
    color: '#9CA3AF',
    fontSize: 13,
    fontFamily: font.MonolithRegular,
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
