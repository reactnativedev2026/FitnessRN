import React, { PropsWithChildren } from 'react';
import {
  Dimensions,
  Modal,
  ModalProps,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { AppThemeColors } from '../../theme/colors';
import { useAppTheme } from '../../theme/ThemeProvider';
import spacing from '../../theme/spacing';
import sizes from '../../theme/sizes';

type CommonModalProps = PropsWithChildren<{
  visible: boolean;
  onClose?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  animationType?: ModalProps['animationType'];
  align?: 'center' | 'bottom';
}>;

const { width } = Dimensions.get('window');

const CommonModal = ({
  visible,
  onClose,
  children,
  contentStyle,
  animationType = 'fade',
  align = 'center',
}: CommonModalProps) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  return (
    <Modal visible={visible} transparent animationType={animationType} onRequestClose={onClose}>
      <Pressable style={[styles.overlay, align === 'bottom' && styles.bottomOverlay]} onPress={onClose}>
        <Pressable style={[styles.content, align === 'bottom' && styles.bottomContent, contentStyle]}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  bottomOverlay: {
    justifyContent: 'flex-end',
    padding: 0,
  },
  content: {
    width: width * 0.86,
    backgroundColor: colors.modal,
    borderColor: colors.borderSoft,
    borderRadius: sizes.radius.xxl,
    borderWidth: 1,
    padding: spacing.xxl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 10,
  },
  bottomContent: {
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default CommonModal;
