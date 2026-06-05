import React from 'react';
import { StatusBar } from 'react-native';

type StatusBarComponentProps = {
  barStyle?: 'default' | 'light-content' | 'dark-content';
  backgroundColor?: string;
  translucent?: boolean;
};

const StatusBarComponent: React.FC<StatusBarComponentProps> = ({
  barStyle = 'light-content',
  backgroundColor = 'transparent',
  translucent = true,
}) => {
  return (
    <StatusBar
      barStyle={barStyle}
      backgroundColor={backgroundColor}
      translucent={translucent}
    />
  );
};

export default StatusBarComponent;
