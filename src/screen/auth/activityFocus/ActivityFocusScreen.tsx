import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import imageIndex from '../../../assets/imageIndex';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../component/common/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
// Removed static color import;
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../theme/ThemeProvider';


export default function ActivityFocusScreen() {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<'gym' | 'home'>('gym');

  const options = [
    {
      id: 'gym',
      title: 'Gym Workout',
      desc: 'Weightlifting, bodybuilding, and high-intensity strength training programs.',
      image: imageIndex.gymBag,
    },
    {
      id: 'home',
      title: 'Home Workout',
      desc: 'Bodyweight, mobility, and high-intensity home training programs.',
      image: imageIndex.homeW,
    },
  ];

  return (
    <ImageBackground source={imageIndex.bag} style={styles.container} resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} translucent />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color="#fff" />
          </TouchableOpacity>

          <View style={styles.progress}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.step}>Step 1 of 3</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.smallTitle}>ACTIVITY FOCUS</Text>
          <Text style={styles.title}>What moves you?</Text>

          <Text style={styles.subtitle}>
            Select your primary exercise discipline to tailor your vibe & training experience.
          </Text>

          {options.map(item => {
            const isSelected = selected === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                onPress={() => setSelected(item.id as 'gym' | 'home')}
                style={[
                  styles.optionCard,
                  isSelected && styles.selectedCard,
                ]}>
                <ImageBackground
                  source={item.image}
                  style={styles.optionBg}
                  imageStyle={styles.optionImage}>
                  <View style={[styles.overlay, isSelected && styles.selectedOverlay]} />

                  <View style={styles.cardTop}>
                    <View style={styles.iconBox}>
                      <Ionicons
                        name={item.id === 'gym' ? 'barbell-outline' : 'home-outline'}
                        size={22}
                        color="#fff"
                      />
                    </View>

                    {isSelected && (
                      <View style={styles.checkBox}>
                        <Ionicons name="checkmark" size={18} color="#000" />
                      </View>
                    )}
                  </View>

                  <View style={styles.cardContent}>
                    <Text style={styles.optionTitle}>{item.title}</Text>
                    <Text style={styles.optionDesc}>{item.desc}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </View>

        <CustomButton
          title="Continue"
          onPress={() =>
            navigation.navigate(ScreenNameEnum.BiometricProfile, {
              activityFocus: selected,
            })
          }
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    flex: 1,
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.22)',
    marginHorizontal: 14,
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressFill: {
    width: '35%',
    height: '100%',
    backgroundColor: '#E09A45',
    borderRadius: 20,
  },
  step: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  content: {
    flex: 1,
    paddingTop: 34,
  },
  smallTitle: {
    color: '#E09A45',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 12,
  },
  title: {
    color: theme.colors.text,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -0.7,
  },
  subtitle: {
    color: '#C9C9C9',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 30,
  },
  optionCard: {
    height: 158,
    marginBottom: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  selectedCard: {
    borderColor: '#E09A45',
    borderWidth: 2,
    shadowColor: '#E09A45',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  optionBg: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  optionImage: {
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.52)',
  },
  selectedOverlay: {
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E09A45',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingBottom: 2,
  },
  optionTitle: {
    color: theme.colors.text,
    fontSize: 23,
    fontWeight: '900',
  },
  optionDesc: {
    color: '#E2E2E2',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
    width: '92%',
  },
});