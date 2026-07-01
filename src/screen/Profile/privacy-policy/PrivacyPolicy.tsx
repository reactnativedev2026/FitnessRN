import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';

import StatusBarComponent from '../../../component/common/StatusBarCompoent';
import ScreenHeader from '../../../component/common/ScreenHeader';
import font from '../../../theme/font';
import { Privacypolicy } from '../../../api/authApi/AuthApi';
import { useAppTheme } from '../../../theme/ThemeProvider';
import { AppThemeColors } from '../../../theme/colors';

const PrivacyPolicy = () => {
  const [isLoading, setLoading] = useState(false);
  const [content, setContent] = useState<string>('');
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  const getPrivacyPolicy = async () => {
    try {
      const response = await Privacypolicy(setLoading);
      console.log("response?.data", response?.data)
      if (response?.data?.content) {
        setContent(response.data.content);
      } else if (
        response?.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setContent(response.data[0]?.privacy_policy_text || '');
      }
    } catch (error) {
      console.log('Privacy Policy Error:', error);
    }
  };
  return (
    <AppSafeAreaView style={styles.container}>
      <StatusBarComponent />
      {/* <LoadingModal visible={isLoading} /> */}

      <ScreenHeader title="Privacy Policy" showNotification={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {content ? (
          // <HTML
          //   source={{ html: content }}
          //   contentWidth={width}
          //   tagsStyles={styles.htmlStyles}
          // />
          <Text style={styles.bodyText}>{content}</Text>
        ) : (
          <Text style={styles.bodyText}>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the</Text>
        )}
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default PrivacyPolicy;
const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 12,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
    fontFamily: font.MonolithRegular,
  },
});
