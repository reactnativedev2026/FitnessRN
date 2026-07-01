import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { AppThemeColors } from '../../theme/colors';
import { useAppTheme } from '../../theme/ThemeProvider';

type AppSafeAreaViewProps = {
  children: React.ReactNode;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
};

const AppSafeAreaView = ({
  children,
  edges = ['top', 'bottom'],
  style,
}: AppSafeAreaViewProps) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  return (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default AppSafeAreaView;
