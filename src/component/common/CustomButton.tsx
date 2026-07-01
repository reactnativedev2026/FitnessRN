import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';

type AlignType = 'left' | 'center' | 'right';

interface CustomButtonProps {
  title?: string;
  txtcolor?: string;
  bgColor?: string;
  leftIcon?: React.ReactNode;
  alignItm?: AlignType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  height?: number;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  button1?: any
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  txtcolor,
  bgColor,
  leftIcon,
  alignItm = 'center',
  style,
  button1,
  textStyle,
  height = 54,
  onPress,
  disabled = false,
}) => {
  const { theme } = useAppTheme();

  const alignment = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  } as const;

  return (

    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          height: height,
          backgroundColor: bgColor || theme.colors.button,
          shadowColor: theme.colors.shadow,
        },
        button1,
        style
      ]}
    >
      <View style={[styles.content, { justifyContent: alignment[alignItm] }]}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

        <Text
          allowFontScaling={false}
          style={[styles.text, { color: txtcolor || theme.colors.buttonText }, textStyle]}
        >
          {title}
        </Text>
      </View>


    </TouchableOpacity>
    // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
  },
  button: {

    height: 55,
    borderRadius: 12,
    marginBottom: Platform.OS === 'ios' ? 8 : 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',

  },
});

export default CustomButton;
