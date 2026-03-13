import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HTML from 'react-native-render-html';

import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import CustomHeader from '../../compoent/CustomHeader'; 
import { hp } from '../../utils/Constant';
import font from '../../theme/font'; 
import { GET_API } from '../../api/APIRequest';
import { ENDPOINT } from '../../api/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const AboutUs = () => {
  const [isLoading, setLoading] = useState(false);
  const [content, setContent] = useState<string>('');
  const { width } = useWindowDimensions();

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  const getPrivacyPolicy = async () => {
    try {
       const token = await AsyncStorage.getItem('token');

      const response = await GET_API(ENDPOINT.ABOUT_US, token,"GET",setLoading);
console.log("response?.data",response?.data)
      if (
        response?.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setContent(response.data[0]?.about_us_text || '');
      } else {
        setContent('<p>No content available</p>');
      }
    } catch (error) {
      console.log('Privacy Policy Error:', error);
      setContent('<p>No content available</p>');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      {/* <LoadingModal visible={isLoading} /> */}

      <CustomHeader label="About Us" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.illustrationWrapper}>
          <Image
            source={imageIndex.aboutus}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {content ? (
          <HTML
            source={{ html: content }}
            contentWidth={width}
            tagsStyles={styles.htmlStyles}
          />
        ) : (
          <Text style={styles.bodyText}>No About Us available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 12,
  },
  illustrationWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  illustration: {
    width: '80%',
    height: hp(30),
  },
  htmlStyles: {
    p: {
      fontSize: 14,
      color: '#333',
      lineHeight: 24,
      fontWeight: '500',
      marginTop: 8,
      fontFamily: font.MonolithRegular,
    },
    h1: {
      fontSize: 22,
      color: '#000',
      marginBottom: 10,
      fontFamily: font.MonolithRegular,
    },
    h2: {
      fontSize: 18,
      color: '#222',
      marginBottom: 8,
      fontFamily: font.MonolithRegular,
    },
    a: {
      color: '#007bff',
    },
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    fontFamily: font.MonolithRegular,
  },
});
