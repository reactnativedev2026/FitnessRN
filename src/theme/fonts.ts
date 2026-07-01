import font from './font';

export const fonts = {
  regular: font.TrialRegular,
  medium: font.TrialMedium,
  semiBold: font.TrialSemiBold,
  bold: font.TrialBold,
  extraBold: font.TrialExtraBold,
  mono: font.MonolithRegular,
} as const;

export default fonts;
