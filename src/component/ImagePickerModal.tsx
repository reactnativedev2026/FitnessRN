import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CommonModal from './common/CommonModal';
import CustomButton from './common/CustomButton';
import { AppThemeColors } from '../theme/colors';
import { useAppTheme } from '../theme/ThemeProvider';
import fonts from '../theme/fonts';
import spacing from '../theme/spacing';
import sizes from '../theme/sizes';

interface ImagePickerModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  pickImageFromGallery: () => void;
  takePhotoFromCamera: () => void;
}

const ImagePickerModal = ({
  modalVisible,
  setModalVisible,
  pickImageFromGallery,
}: ImagePickerModalProps) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  const handleSelectGallery = useCallback(() => {
    setModalVisible(false);
    pickImageFromGallery();
  }, [pickImageFromGallery, setModalVisible]);

  const handleCancel = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  return (
    <CommonModal
      visible={modalVisible}
      onClose={handleCancel}
      align="bottom"
      animationType="slide"
      contentStyle={styles.sheet}
    >
      <View style={styles.handleBar} />
      <Text allowFontScaling={false} style={styles.title}>Choose an Option</Text>

      <TouchableOpacity style={styles.optionButton} onPress={handleSelectGallery}>
        <Text allowFontScaling={false} style={styles.optionText}>Select from Gallery</Text>
      </TouchableOpacity>

      <CustomButton
        title="Cancel"
        onPress={handleCancel}
        bgColor={theme.colors.primary}
        txtcolor={theme.colors.textInverse}
        style={styles.cancelButton}
      />
    </CommonModal>
  );
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  sheet: {
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  handleBar: {
    backgroundColor: colors.primary,
    borderRadius: 3,
    height: 4,
    marginBottom: spacing.sm,
    width: 40,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 15,
    marginBottom: spacing.sm,
  },
  optionButton: {
    alignItems: 'center',
    backgroundColor: colors.chip,
    borderRadius: sizes.radius.md,
    justifyContent: 'center',
    paddingVertical: 15,
    width: '100%',
  },
  optionText: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 15,
    textAlign: 'center',
  },
  cancelButton: {
    marginBottom: 0,
    marginTop: spacing.sm,
    width: '100%',
  },
});

export default memo(ImagePickerModal);
