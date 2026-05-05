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
} from 'react-native';
import { color } from '../constant';
import font from '../theme/font';
import CustomDropdown from './CustomDropdown';
import CustomButton from './CustomButton';
import Toast from 'react-native-toast-message';
import toastConfig from '../utils/customToast';

const { width } = Dimensions.get('window');

interface ReportIssueModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { issueType: string; description: string }) => void;
}

const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ visible, onClose, onSubmit }) => {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');

  const issueCategories = [
    { label: 'Technical Issue', value: 'Technical Issue' },
    { label: 'Delivery Issue', value: 'Delivery Issue' },
    { label: 'App Crash', value: 'App Crash' },
    { label: 'Payment Problem', value: 'Payment Problem' },
    { label: 'Other', value: 'Other' },
  ];

  const handleSubmit = () => {
    if (issueType && description) {
      onSubmit({ issueType, description });
      setIssueType('');
      setDescription('');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please fill all details before submitting.',
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
              <Text style={styles.label}>Category</Text>
              <CustomDropdown
                data={issueCategories}
                placeholder="Select issue category"
                onSelect={(val) => setIssueType(val)}
                isDark={true}
              />

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Describe your issue here..."
                placeholderTextColor="#6F767E"
                multiline={true}
                numberOfLines={5}
                value={description}
                onChangeText={setDescription}
                textAlignVertical="top"
              />

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
    height: 140,
    fontSize: 15,
    fontFamily: font.MonolithRegular,
    color: color.white,
    borderWidth: 1,
    borderColor: '#393B48',
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
