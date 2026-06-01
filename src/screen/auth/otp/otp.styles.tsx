import { Platform, StyleSheet } from "react-native";
import { hp } from "../../../utils/Constant";
import { color, } from "../../../theme/colors";
import font from "../../../theme/font";


export const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 15,
  },
  backButton: {
    marginTop: 8,
    width: '15%',
  },
  backIcon: {
    height: 32,
    width: 32,
  },
  txtHeading: {
    fontSize: 24,
    lineHeight: 36,
    color: color.white,
    marginTop: 10,
    fontWeight: "500",
    textAlign: 'center'
  },
  txtDes: {
    color: color.grey,
    fontSize: 16,
    fontFamily: font.MonolithRegular,
    textAlign: 'center',
    marginTop: 5
  },
  headerSection: {
    height: hp(15),
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: color.white,
    lineHeight: 36,
    marginTop: 40,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(157, 178, 191, 1)',
    lineHeight: 24,
    marginTop: 10,
  },
  otpFieldContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20
  },
  cellWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
  },
  cell: {
    width: 45,
    alignItems: "center",
    height: 55,
    fontSize: 22,
    lineHeight: Platform.OS === 'ios' ? 52 : 52,
    borderWidth: 1.5,
    borderColor: '#393B48',
    textAlign: 'center',
    color: color.white,
    borderRadius: 12,
    includeFontPadding: false,
    backgroundColor: '#393B48',
  },
  focusCell: {
    borderColor: color.primary,
    textAlignVertical: 'center',
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: 'red',
    marginTop: 18,
    textAlign: 'center'
  },
  bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(30),
    marginTop: 30,
  },
  bannerImage: {
    height: '100%',
    width: '100%',
  },
  submitButton: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center'
  },
  footerText: {
    color: '#6F767E',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
    lineHeight: 18,
  },
  resendText: {
    color: color.primary,
    fontWeight: '700',
  },
});
