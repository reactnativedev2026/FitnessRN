import React from 'react';
import { StatusBar } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';

type StatusBarComponentProps = {
  barStyle?: 'default' | 'light-content' | 'dark-content';
  backgroundColor?: string;
  translucent?: boolean;
};

const StatusBarComponent: React.FC<StatusBarComponentProps> = ({
  barStyle = "light-content",
  backgroundColor = "transparent",
  translucent = true,
}) => {
  const { theme } = useAppTheme();

  return (
    <StatusBar
      barStyle={barStyle || theme.colors.statusBarStyle}
      backgroundColor={backgroundColor || theme.colors.statusBar}
      translucent={translucent}
    />
  );
};

export default StatusBarComponent;
