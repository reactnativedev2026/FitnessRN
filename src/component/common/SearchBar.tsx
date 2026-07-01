import React from 'react';
import { Image, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import imageIndex from '../../assets/imageIndex';
import { AppThemeColors } from '../../theme/colors';
import { useAppTheme } from '../../theme/ThemeProvider';
import spacing from '../../theme/spacing';
import sizes from '../../theme/sizes';

interface SearchBarProps {
  placeholder?: string;
  onSearchChange?: (text: string) => void;
  value?: string;
  searchBar1?: StyleProp<ViewStyle>;
}

const SearchBar = ({
  searchBar1,
  placeholder = 'Search',
  onSearchChange,
  value,
}: SearchBarProps) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme.colors);

  return (
    <View style={[styles.searchBar, searchBar1]}>
      <Image source={imageIndex.search} style={styles.icon} resizeMode="contain" />
      <TextInput
        allowFontScaling={false}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        onChangeText={onSearchChange}
        value={value}
      />
    </View>
  );
};

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  searchBar: {
    alignItems: 'center',
    backgroundColor: colors.input,
    borderColor: colors.border,
    borderRadius: sizes.radius.md,
    borderWidth: 1,
    elevation: 4,
    flexDirection: 'row',
    height: 55,
    marginBottom: spacing.xl,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xxxl,
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3.5,
  },
  icon: {
    height: 22,
    tintColor: colors.iconMuted,
    width: 22,
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    marginLeft: spacing.lg,
  },
});

export default SearchBar;
