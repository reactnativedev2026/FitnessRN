import React from 'react';
import { Linking, Platform, StyleSheet, Text } from 'react-native';
import CommonModal from './common/CommonModal';
import CustomButton from './common/CustomButton';
import { AppThemeColors } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeProvider';
import fonts from '../theme/fonts';
import spacing from '../theme/spacing';

type Props = {
  isConnected?: boolean | null;
  modalVisible: boolean;
  onlineText?: string;
  offlineText?: string;
  checkingText?: string;
};

const NetworkStatusModal = ({
  isConnected,
  modalVisible,
  onlineText,
  offlineText,
  checkingText,
}: Props) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:root=MOBILE_DATA_SETTINGS_ID');
    } else {
      Linking.openSettings();
    }
  };

  const getStatusText = () => {
    if (isConnected === null) return checkingText || 'Checking connection...';
    return isConnected ? onlineText || 'You are Online' : offlineText || 'No Internet Connection';
  };

  return (
    <CommonModal visible={modalVisible}>
      <Text allowFontScaling={false} style={styles.text}>
        {getStatusText()}
      </Text>
      {!isConnected ? (
        <CustomButton
          title="Go to Settings"
          onPress={openSettings}
          bgColor={theme.colors.success}
          txtcolor={theme.colors.textInverse}
          style={styles.button}
        />
      ) : null}
    </CommonModal>
  );
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  text: {
    color: colors.text,
    fontFamily: fonts.medium,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  button: {
    marginBottom: 0,
  },
});

export default NetworkStatusModal;
