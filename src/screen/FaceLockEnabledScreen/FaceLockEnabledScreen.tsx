import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
 import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import CustomButton from '../../compoent/CustomButton';
import ScreenNameEnum from '../../routes/screenName.enum';

const FaceLockcomplete = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
      <StatusBarComponent/>

            {/* Icon */}
            <View style={styles.iconContainer}>
                <Image source={imageIndex.lockSuffuly} 
                
                style={{
                    height:77,
                    width:77 ,
                resizeMode:"contain"
                }}
                />
            </View>

            {/* Title */}
            <Text style={styles.title}>Face Lock & Passcode Enabled</Text>

            {/* Description */}
            <Text style={styles.description}>
                Your security setup is complete successfully. You can now unlock the app using Face ID or your Passcode.
            </Text>

            {/* Continue Button */}

             <CustomButton
            title="Continue"
           onPress={() => navigation.navigate(ScreenNameEnum.TabNavigator)}
           />
          
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    icon: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 12,
        color: '#000',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        color: '#7C7C7C',
        marginBottom: 40,
        lineHeight: 20,
    },
    continueButton: {
        backgroundColor: '#2D32FF',
        paddingVertical: 16,
        borderRadius: 12,
        marginHorizontal: 24,
        alignItems: 'center',
    },
    continueText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default FaceLockcomplete;
