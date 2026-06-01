import React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { color } from '../../theme/colors';
import { ImageSourceType } from '../../utils/imagePicker';

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
  const handleSelect = (source: ImageSourceType) => {
    onClose();
    setTimeout(() => onSelect(source), Platform.OS === 'ios' ? 650 : 250);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>{title}</Text>

          <View style={styles.optionRow}>
            <TouchableOpacity
              style={styles.option}
              activeOpacity={0.85}
              onPress={() => handleSelect('camera')}
            >
              <View style={styles.iconCircle}>
                <Icon name="camera-outline" size={28} color={color.white} />
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
                <Icon name="images-outline" size={28} color={color.white} />
              </View>
              <Text style={styles.optionTitle}>Gallery</Text>
              <Text style={styles.optionSub}>Choose from phone</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ImageSourceSheet;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  sheet: {
    backgroundColor: '#0B1220',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  handle: {
    alignSelf: 'center',
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#334155',
    marginBottom: 18,
  },
  title: {
    color: color.white,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 18,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#111827',
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    marginBottom: 10,
  },
  optionTitle: {
    color: color.white,
    fontSize: 15,
    fontWeight: '700',
  },
  optionSub: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4,
  },
  cancelButton: {
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    marginTop: 14,
  },
  cancelText: {
    color: color.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
