import Snackbar from 'react-native-snackbar';
import { color } from '../theme/colors';

export const Toast = (
  text: string,
  backgroundColor?: string,
  marginBottom?: number,
  textColor?: string
) => {
  Snackbar.show({
    text,
    backgroundColor: backgroundColor ?? color.cardBackground,
    textColor: textColor ?? color.white,
    duration: Snackbar.LENGTH_SHORT,
    marginBottom: marginBottom ?? 10,
  });
};
export const RedToast = (
  text: string,
  backgroundColor?: string,
  marginBottom?: number,
  textColor?: string
) => {
  Snackbar.show({
    text,
    backgroundColor: backgroundColor ?? color.danger,
    textColor: textColor ?? color.white,
    duration: Snackbar.LENGTH_SHORT,
    marginBottom: marginBottom ?? 10,
  });

};
