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
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { color } from '../constant';
import font from '../theme/font';
import imageIndex from '../assets/imageIndex';

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
  button1?:any
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  txtcolor = '#FFFFFF',
  bgColor = color.primary,
  leftIcon,
  alignItm = 'center',
  style,
  button1,
  textStyle,
  height = 54,
  onPress,
  disabled = false,
}) => {
  const alignment = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  } as const;

  return (
 
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
style={[
  styles.button,
  { height: height },
  button1,
  style
]}
        activeOpacity={0.7}
      >
        <View style={[styles.content, { justifyContent: alignment[alignItm] }]}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

          <Text
            allowFontScaling={false}
            style={[styles.text, { color: txtcolor }, textStyle]}
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
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor:color.primary,
    height:50,
    borderRadius:10,
    alignSelf:'center'
    
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
    fontSize: 16,
     color:"white",
    fontWeight:"bold"
  },
});

export default CustomButton;
