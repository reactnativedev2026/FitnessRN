
import { StyleSheet } from 'react-native';
import { hp } from '../../../utils/Constant';
import { color } from '../../../constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },


  logoText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: color.white,
  },

  subTitle: {
    fontSize: 14,
    color: color.grey,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  countryCode: {
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: color.primary,
    justifyContent: 'center',
    marginRight: 10,
  },

  codeText: {
    fontSize: 16,
    fontWeight: '600',
  },

  loginBtn: {
    marginTop: 25,
    // borderRadius: 25,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10
  },

  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },

  signUpText: {
    fontSize: 15,
    color: color.grey,
  },

  signUpLink: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3D5AFE',
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#0E101F',
    borderRadius: 15,
    padding: 5,
    marginVertical: 20,
    width: '100%',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#2E303D',
  },
  tabText: {
    color: '#6F767E',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: color.white,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)', // Added overlay
  },
  formBox: {
    backgroundColor: 'rgba(1, 10, 22, 0.6)',
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    // marginBottom: 80,
  },
});
export default styles;
