import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import imageIndex from '../assets/imageIndex';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import { color } from '../constant';

interface RightIcon {
  icon: any;
  onPress: () => void;
  type?: string;
}

interface Props {
  navigation?: any;
  rightIcons?: RightIcon[];
  menuIcon?: any;
  label?: string;
  leftPress?: () => void;
  isSearch?:any
}

const CustomHeader: React.FC<Props> = ({ isSearch,rightIcons = [], menuIcon, label, leftPress , showRight = true }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Left Menu */}
      <TouchableOpacity 
      onPress={leftPress || (() => navigation.dispatch(DrawerActions.openDrawer()))}
      
      >
        <Image  
        source={menuIcon || imageIndex.menu} style={styles.leftIcon} resizeMode="contain" />
      </TouchableOpacity>

      {/* Label / Title */}
      {label && <Text style={styles.txtHeading}>{label}</Text>}

      {/* Right Icons */}
      <View style={styles.rightIconsContainer}>
        {/* {
          isSearch && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={imageIndex.search} style={styles.rightIcon} resizeMode="contain" />
          </TouchableOpacity>
          )
        } */}
    

        <TouchableOpacity onPress={() => {}}
          // navigation.navigate(ScreenNameEnum.Notification)}
          >
          { showRight &&
          <Image source={imageIndex.no1} style={styles.rightIcon} resizeMode="contain" />
}
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)}>
          <Image source={imageIndex.Avatar} style={styles.rightIconAvatar} resizeMode="contain" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
     flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:15
   },
  leftIcon: {
    height: 40,
    width: 40,
    // tintColor:"#5ED5DB"
  },
  txtHeading: {
    fontWeight: '700',
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    flex: 1,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    height: 25,
    width: 25,
    marginLeft: 15,
    tintColor:color.primary

  },
  rightIconAvatar: {
    height: 30,
    width: 30,
    marginLeft: 15,
    borderRadius: 15, // circular avatar
    tintColor:"#5ED5DB"

  },
});
