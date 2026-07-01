import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import imageIndex from '../../../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useAppTheme } from '../../../theme/ThemeProvider';


export default function CoachlyLogin() {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const navigation = useNavigation<any>()

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#05070D" />

      <ImageBackground
        source={imageIndex.introBag}
        style={styles.bgImage}
        resizeMode="cover">

        <View style={styles.overlay} />

        <View style={styles.content}>
          <View style={styles.centerContent}>
            <Text style={styles.logo}>Coachly</Text>
            <Text style={styles.subtitle}>Small Steps. Massive Results.</Text>

            <TouchableOpacity

              onPress={() => {
                navigation.navigate(ScreenNameEnum.ActivityFocusScreen)
              }}

              style={styles.appleBtn}>
              <FontAwesome name="google" size={16} color="white" />
              <Text  style={styles.appleText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity


              onPress={() => {
                navigation.navigate(ScreenNameEnum.ActivityFocusScreen)
              }}
              style={styles.appleBtn}>
              <Ionicons name="logo-apple" size={18} color="#fff" />
              <Text style={styles.appleText}>Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              navigation.navigate(ScreenNameEnum.ActivityFocusScreen)
            }}>
              <Text style={styles.guestText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.Login as never)}>
            <Text style={styles.emailLogin}>LOG IN WITH EMAIL AND PASSWORD</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070D',
  },

  bgImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },

  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
    paddingBottom: 42,
  },

  centerContent: {
    alignItems: 'center',
    marginBottom: 45,
  },

  logo: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 14,
  },

  subtitle: {
    color: theme.colors.text,
    fontSize: 13,
    marginBottom: 38,
  },

  googleBtn: {
    width: '100%',
    height: 58,
    borderRadius: 29,
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  googleText: {
    color: '#111',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },

  appleBtn: {
    width: '100%',
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  appleText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },

  guestText: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: '400',
  },

  emailLogin: {
    color: theme.colors.text,
    fontSize: 10,
    letterSpacing: 2,
    textAlign: 'center',
    fontWeight: '600',
  },
});
