import { createNavigationContainerRef } from '@react-navigation/native';
import ScreenNameEnum from './screenName.enum';

export const navigationRef = createNavigationContainerRef<any>();

export const resetToLogin = () => {
  if (!navigationRef.isReady()) return;

  navigationRef.reset({
    index: 0,
    routes: [{ name: ScreenNameEnum.Login }],
  });
};

export const resetToMainTabs = () => {
  if (!navigationRef.isReady()) return;

  navigationRef.reset({
    index: 0,
    routes: [{ name: ScreenNameEnum.TabNavigator }],
  });
};
