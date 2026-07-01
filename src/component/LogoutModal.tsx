import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonModal from './common/CommonModal';
import CustomButton from './common/CustomButton';
import { AppThemeColors } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeProvider';
import fonts from '../theme/fonts';
import spacing from '../theme/spacing';
import sizes from '../theme/sizes';

const LogoutModal = ({ visible, onLogout, onCancel }: any) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  return (
    <CommonModal visible={visible} onClose={onCancel}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.closeButton}
        onPress={onCancel}>
        <Icon name="close" size={18} color={theme.colors.text} />
      </TouchableOpacity>

      <View style={styles.iconCircle}>
        <Icon name="log-out-outline" size={34} color={theme.colors.danger} />
      </View>

      <Text allowFontScaling={false} style={styles.title}>
        Log Out?
      </Text>

      <Text allowFontScaling={false} style={styles.message}>
        Are you sure you want to log out from your account?
      </Text>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Logout"
          onPress={onLogout}
          bgColor={theme.colors.text}
          txtcolor={theme.colors.textInverse}
          style={styles.logoutButton}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.cancelButton}
          onPress={onCancel}>
          <Text allowFontScaling={false} style={styles.cancelText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </CommonModal>
  );
};

const makeStyles = (colors: AppThemeColors) =>
  StyleSheet.create({
    closeButton: {
      position: 'absolute',
      right: spacing.lg,
      top: spacing.lg,
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: colors.backgroundSecondary || 'rgba(0,0,0,0.06)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },

    iconCircle: {
      alignSelf: 'center',
      width: 78,
      height: 78,
      borderRadius: 39,
      backgroundColor: 'rgba(255,59,48,0.12)',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.xl,
      marginBottom: spacing.lg,
      borderWidth: 1,
      borderColor: 'rgba(255,59,48,0.22)',
    },

    title: {
      color: colors.text,
      fontFamily: fonts.bold,
      fontSize: 24,
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: spacing.sm,
    },

    message: {
      color: colors.textSecondary,
      fontFamily: fonts.regular,
      fontSize: 15,
      fontWeight: '500',
      lineHeight: 22,
      textAlign: 'center',
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.xl,
    },

    buttonContainer: {
      width: '100%',
      gap: 12,
    },

    logoutButton: {
      marginBottom: 0,
      borderRadius: 14,
      height: 54,
    },

    cancelButton: {
      height: 52,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.backgroundSecondary || 'rgba(0,0,0,0.06)',
      borderWidth: 1,
      borderColor: colors.border || 'rgba(0,0,0,0.08)',
    },

    cancelText: {
      color: colors.text,
      fontFamily: fonts.bold,
      fontSize: 15,
      fontWeight: '700',
    },
  });

export default memo(LogoutModal);