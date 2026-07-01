// components/AppIcon.tsx
import React from 'react';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { color } from '../../theme/colors';

type IconProps = {
  source: ImageSourcePropType;
  size?: number;
  colorIcon?: string;
};

const Icon: React.FC<IconProps> = ({ source, size = 24, colorIcon = color.primary }) => {
  return (
    <Image
      source={source}
      style={[styles.icon, { width: size, height: size, tintColor: colorIcon }]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  icon: {},
});

export default Icon;
