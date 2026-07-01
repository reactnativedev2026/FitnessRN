  import React from 'react';
  import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import Icon from 'react-native-vector-icons/Ionicons';
  import { AppThemeColors, color } from '../../theme/colors';
  import { useAppTheme } from '../../theme/ThemeProvider';
  import spacing from '../../theme/spacing';
  import sizes from '../../theme/sizes';
  import { ImageSourceType } from '../../utils/imagePicker';
  import CommonModal from './CommonModal';

  type ImageSourceSheetProps = {
    visible: boolean;
    title?: string;
    onClose: () => void;
    onSelect: (source: ImageSourceType) => void;
  };

  const ImageSourceSheet = ({
    visible,
    title = 'Choose Photo',
    onClose,
    onSelect,
  }: ImageSourceSheetProps) => {
    const { theme } = useAppTheme();
    const styles = makeStyles(theme.colors);

    const handleSelect = (source: ImageSourceType) => {
      onClose();
      setTimeout(() => onSelect(source), Platform.OS === 'ios' ? 650 : 250);
    };

    return (
      <CommonModal
        visible={visible}
        onClose={onClose}
        align="bottom"
        contentStyle={styles.sheet}
      >
        <View style={styles.handle} />
        <Text style={styles.title}>{title}</Text>

        <View style={styles.optionRow}>
          <TouchableOpacity
            style={styles.option}
            activeOpacity={0.85}
            onPress={() => handleSelect('camera')}
          >
            <View style={styles.iconCircle}>
              <Icon name="camera-outline" size={40} color={theme.colors.textInverse} />
            </View>
            <Text style={styles.optionTitle}>Camera</Text>
            <Text style={styles.optionSub}>Take new photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            activeOpacity={0.85}
            onPress={() => handleSelect('gallery')}
          >
            <View style={styles.iconCircle}>
              <Icon name="images-outline" size={40} color={theme.colors.textInverse} />
            </View>
            <Text style={styles.optionTitle}>Gallery</Text>
            <Text style={styles.optionSub}>Choose from phone</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </CommonModal>
    );
  };

  export default ImageSourceSheet;

  const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
    sheet: {
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.md,
      paddingBottom: 28,
    },
    handle: {
      alignSelf: 'center',
      width: 42,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.disabled,
      marginBottom: 18,
    },
    title: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 18,
    },
    optionRow: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    option: {
      flex: 1,
      alignItems: 'center',
      borderRadius: sizes.radius.lg,
      backgroundColor: "white",
      paddingVertical: 18,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconCircle: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    optionTitle: {
      color: "black",
      fontSize: 15,
      fontWeight: '700',
    },
    optionSub: {
      color: "black",
      fontSize: 12,
      marginTop: 4,
    },
    cancelButton: {
      height: 48,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "white",
      marginTop: 14,
    },
    cancelText: {
      color: "black",
      fontSize: 15,
      fontWeight: '600',
    },
  });
