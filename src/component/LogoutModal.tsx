import React, { memo } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import font from '../theme/font';
import { color } from '../theme/colors';

const LogoutModal = ({ visible, onLogout, onCancel }: any) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <Text allowFontScaling={false} style={styles.title}>
            Log Out
          </Text>
          <Text allowFontScaling={false} style={styles.message}>
            Are you sure want to log out?
          </Text>

          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text allowFontScaling={false} style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.logoutButton}
              onPress={onLogout}>
              <Text allowFontScaling={false} style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#1C1F2E',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
    backgroundColor: 'red',
    height: 25,
    width: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeText: {
    fontSize: 22,
    color: '#fff',
    lineHeight: 25
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
    fontFamily: font.TrialBold,
    marginTop: 20
  },
  message: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    fontWeight: '500',
    fontFamily: font.TrialRegular,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoutButton: {
    flex: 1,
    backgroundColor: color.primary,
    paddingVertical: 12,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: color.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: font.TrialBold,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 14,
    marginRight: 12,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cancelText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: font.TrialRegular,
    fontWeight: '600',
  },
});

export default memo(LogoutModal);



