import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
   Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from './StatusBarCompoent';
import CustomButton from './CustomButton';
import imageIndex from '../assets/imageIndex';
  
const  PasswordSuccessfullyModal = ({ visible, onClose, userName, userImage, onOpenChat }:any) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <StatusBarComponent />
        <View style={styles.modalView}>
          {/* User Image */}
          <Image 
        //   source={{ uri: userImage }} 
          
            source={imageIndex.succesfuly}
          style={styles.userImage} />

          
          {/* Booking Text */}
          <Text style={styles.title}> Password Successfully Changed!</Text>
          <Text style={styles.subTitle}>
            Password updated successfully. You can now log in.
           </Text>

            <CustomButton title="Back to Login"  
          onPress={onOpenChat}
         />
         
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // semi-transparent background
  },
  modalView: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 5, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 5,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF1E8B',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default  PasswordSuccessfullyModal;
