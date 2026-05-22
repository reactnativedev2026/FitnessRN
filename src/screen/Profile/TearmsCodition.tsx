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
import StatusBarComponent from '../../component/common/StatusBarCompoent';
import CustomHeader from '../../component/common/CustomHeader';
import LoadingModal from '../../utils/Loader';
import { hp } from '../../utils/Constant';
import font from '../../theme/font';
import { Termsconditions } from '../../api/authApi/AuthApi';
import { color } from '../../constant';
import { useNavigation } from '@react-navigation/native';

const TearmsCodition = () => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [content, setContent] = useState<string>('');
  const { width } = useWindowDimensions();

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  const getPrivacyPolicy = async () => {
    try {
      const response = await Termsconditions(setLoading);

      if (
        response?.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        console.log("response.data", response.data)
        setContent(response.data[0]?.tac_text || '');
      } else {
        // setContent('<p>No content available</p>');
      }
    } catch (error) {
      console.log('Privacy Policy Error:', error);
      // setContent('<p>No content available</p>');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <LoadingModal visible={isLoading} />

      <CustomHeader label="Terms and Condition" menuIcon={imageIndex.back} leftPress={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.illustrationWrapper}>
          <Image
            source={imageIndex.helpPrva}
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
          <Text style={styles.bodyText}>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TearmsCodition;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
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
      color: '#9CA3AF',
      lineHeight: 24,
      fontWeight: '500',
      marginTop: 8,
      fontFamily: font.TrialRegular,
    },
    h1: {
      fontSize: 22,
      color: '#fff',
      marginBottom: 10,
      fontFamily: font.TrialBold,
    },
    h2: {
      fontSize: 18,
      color: '#fff',
      marginBottom: 8,
      fontFamily: font.TrialBold,
    },
    a: {
      color: '#0066FF',
    },
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
    fontFamily: font.MonolithRegular,
  },
});
