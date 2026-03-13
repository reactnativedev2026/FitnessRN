import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import TextCompoent, { Size } from './Text';
 
const toastConfig = {
  successResponse: ({text1}:any) => (
    <View style={styles.container}>
      <TextCompoent
        style={styles.titleStyle}
        size={Size.Small}
        color={'#000'}
        fontWeight="700">
        {text1}
      </TextCompoent>
    </View>
  ),
  errorResponse: ({text1} : any) => (
    <View style={styles.errorContainer}>
      <TextCompoent
        fontWeight="700"
        style={styles.titleStyle}
        size={Size.Small}
        color={'#fff'}>
        {text1}
      </TextCompoent>
    </View>
  ),
  normalResponse: ({text1}:any) => (
    <View style={styles.normalContainer}>
      <TextCompoent
        fontWeight="700"
        style={styles.titleStyle}
        size={Size.Small}
        color={'#000'}>
        {text1}
      </TextCompoent>
    </View>
  ),
};

export const successToast = (message, time = 2000) => {
  Toast.show({
    type: 'successResponse',
    text1: message,
    position: 'top',
    visibilityTime: time,
    topOffset: 50,
  });
};

export const errorToast = (message, time = 2000,position = 'top') => {
  Toast.show({
    type: 'errorResponse',
    text1: message,
    position: position,
    visibilityTime: time,
    topOffset: 50,
  });
};
export const normalToast = (message, time = 2000) => {
  Toast.show({
    type: 'normalResponse',
    text1: message,
    position: 'top',
    visibilityTime: time,
    topOffset: 50,
  });
};

export default toastConfig;
const styles = StyleSheet.create({
  titleStyle: {
    marginLeft: 12,
  },

  container: {
    minHeight: 52,
    width: '92%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderLeftWidth: 6,
    borderLeftColor: '#2ECC71', // success green
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  errorContainer: {
    minHeight: 52,
    width: '92%',
    backgroundColor: '#E74C3C', // red
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  normalContainer: {
    minHeight: 52,
    width: '92%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderLeftWidth: 6,
    borderLeftColor: '#5B5FEF', // primary blue
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});
