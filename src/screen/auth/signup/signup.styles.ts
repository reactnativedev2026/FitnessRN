import { StyleSheet } from "react-native";
import { hp } from "../../../utils/Constant";
import { color } from "../../../theme/colors";

export const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  formWrapper: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    marginTop: hp(2),
    marginBottom: 20,
  },
  logo: {
    height: 44,
    width: 120,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 18,
    color: "black"
  },
  subtitle: {
    fontSize: 16,
    color: '#9DB2BF',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 5,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#F7F8F8',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#F7F8F8',
  },
  dropdownError: {
    borderColor: '#FF3B30',
  },
  dropdownInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 15,
    paddingHorizontal: 5,
  },
  checkboxOuter: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  signUpText: {
    fontSize: 16,
    color: '#909090',
    fontWeight: '500'
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: -5,
    marginBottom: 10,
    marginLeft: 10,
  },
  checkboxError: {
    borderColor: '#FF3B30',
  },
  generalError: {
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  generalErrorText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },

  
//   // FMCSA TILES STYLE
  fmcsaWrapper: { marginVertical: 10 },
  verifyTile: {
    backgroundColor: '#F8F9FA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  tileLabel: { fontSize: 15, color: '#666', fontWeight: '500' },
  statusText: { fontSize: 14, fontWeight: 'bold' },
  tileRight: { flexDirection: 'row', alignItems: 'center' },

});

