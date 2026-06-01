import React from 'react';
import { StatusBar, SafeAreaView, View, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default StatusBarComponent;
