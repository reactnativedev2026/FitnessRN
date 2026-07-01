import { View, TextInput, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import imageIndex from '../../assets/imageIndex';
import CountryFlag from "react-native-country-flag";
import { useAppTheme } from '../../theme/ThemeProvider';
import { AppThemeColors } from '../../theme/colors';

export default function TextInputField({ ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onChangeText = (value: string) => {
    if (props.onChangeText) {
      props.onChangeText(value);
    }
  };

  return (
    <View style={styles.outerContainer}>
      {/* Label positioned on the border */}
      {props.placeholder && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{props.placeholder}</Text>
        </View>
      )}

      <View
        style={[
          styles.innerContainer,
          isFocused && styles.focusedBorder,
          props.style,
        ]}
      >
        {/* Left Section (Flag/Logo) */}
        {props.firstLogo && (
          <View style={styles.leftSection}>
            {props.countryCode ? (
              <TouchableOpacity
                style={styles.phoneSection}
                onPress={props.onPrefixPress}
                disabled={!props.onPrefixPress}
              >
                <CountryFlag
                  isoCode={props.countryCode || 'US'}
                  size={14}
                  style={{ borderRadius: 2 }}
                />
                <Text style={styles.prefixText}> {props.prefix || '+1'}</Text>
                <View style={styles.separator} />
              </TouchableOpacity>
            ) : (
              <Image
                source={props.img}
                style={[
                  { width: 20, height: 20, tintColor: theme.colors.iconMuted },
                  props.imgStyle,
                ]}
                resizeMode="contain"
              />
            )}
          </View>
        )}

        {/* Input Section */}
        <TextInput
          {...props}
          placeholderTextColor={theme.colors.placeholder}
          style={[
            styles.textInput,
            props.textStyle,
          ]}
          onChangeText={onChangeText}
          value={props.text || props.value}
          placeholder={props.placeholder || ""} // Placeholder is now the floating label
          secureTextEntry={props.secureTextEntry && !showPassword}
          maxLength={props.maxLength}
          keyboardType={props.type || props.keyboardType}
          returnKeyType='done'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={props.editable}
        />

        {/* Right Section (Eye Icon) */}
        {props.showEye && (
          <TouchableOpacity
            onPress={PasswordVisibility}
            style={styles.eyeButton}
          >
            <Image
              source={showPassword ? imageIndex.eye : imageIndex.hide}
              style={{ width: 22, height: 22 }}
              tintColor={theme.colors.iconMuted}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  outerContainer: {
    marginVertical: 15,
    width: '100%',
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: colors.background,
    paddingHorizontal: 5,
    zIndex: 1,
  },
  labelText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  innerContainer: {
    flexDirection: 'row',
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: colors.transparent,
  },
  focusedBorder: {
    borderColor: colors.primary,
  },
  leftSection: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
    marginLeft: 10,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
    height: '100%',
  },
  eyeButton: {
    padding: 5,
  },
});
