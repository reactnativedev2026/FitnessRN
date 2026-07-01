import { StyleSheet } from "react-native";
import { AppThemeColors, color } from "../../../theme/colors";

export const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  photoSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,

  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: color.secondary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',

  },
  formContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: 30,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 4,
  },
});
