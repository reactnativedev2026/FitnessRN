import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import ScreenNameEnum from '../../../routes/screenName.enum';
import imageIndex from '../../../assets/imageIndex';
import { styles } from './style';

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  const { isLogin, isLoading } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: isLogin
              ? ScreenNameEnum.DrawerNavgation
              : ScreenNameEnum.Login,
          },
        ],
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLogin, isLoading]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarComponent backgroundColor="transparent" />

      <View style={styles.centerContent}>
        <Image
          source={imageIndex.appLogo}
          style={{ height: 150, width: '70%' }}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
