import React from 'react';
import { Switch, SwitchProps } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';

const CommonToggleSwitch = (props: SwitchProps) => {
  const { theme } = useAppTheme();

  return (
    <Switch
      trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
      thumbColor={theme.colors.surface}
      ios_backgroundColor={theme.colors.disabled}
      {...props}
    />
  );
};

export default CommonToggleSwitch;
