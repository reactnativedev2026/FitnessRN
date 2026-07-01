import React from 'react';
import { StyleSheet, Text, PixelRatio, TextProps, StyleProp, TextStyle } from 'react-native';
import { color } from '../theme/colors';

export const Size = {
  XXXSmall: 12,
  XXSmall: 14,
  XSmall: 16,
  Small: 16,
  Medium: 20,
  Large: 24,
  XLarge: 28,
  XXLarge: 30,
  XXXLarge: 34,
};

type TextComponentProps = TextProps & {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  size?: number;
  fontWeight?: TextStyle['fontWeight'];
  color?: string;
  lineHeight?: number;
};

const TextCompoent = ({
  children,
  onTextLayout,
  numberOfLines,
  lineBreakMode,
  style,
  size = 14,
  fontWeight = '400',
  color: textColor = color.textPrimary,
  ellipsizeMode,
  adjustsFontSizeToFit = false,
  lineHeight,
}: TextComponentProps) => {
  const fs = PixelRatio.getFontScale();
  return (
    <Text
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      onTextLayout={onTextLayout}
      numberOfLines={numberOfLines}
      lineBreakMode={lineBreakMode}
      ellipsizeMode={ellipsizeMode}
      style={[
        styles.text,
        style,
        {
          fontSize: size / fs,
          color: textColor,
          fontWeight: fontWeight,
          lineHeight: lineHeight
            ? lineHeight
            : size && size > 0
              ? size + 8
              : undefined,
        },
      ]}>
      {children}
    </Text>
  );
};

export default TextCompoent;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'opensans',
  },
});
