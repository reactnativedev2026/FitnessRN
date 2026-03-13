import {
  View,
  Text,
  Image,
  ScrollView,

} from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarCompoent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import CustomButton from '../../../compoent/CustomButton';
import CustomHeader from '../../../compoent/CustomHeader';
  import ScreenNameEnum from '../../../routes/screenName.enum';
import { SafeAreaView } from 'react-native-safe-area-context';
 import { useNavigation } from '@react-navigation/native';

export default function UnderReview() {
 
const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarCompoent />
      <ScrollView showsVerticalScrollIndicator={false} >
       
        <View style={{ marginTop: 18 }}>
          <CustomHeader label='Back' />
        </View>
        <View
          style={{
     backgroundColor: '#FFF',        // White background
    marginTop: hp(4),               // Responsive top margin
    marginHorizontal: 15,           // Horizontal margin
     borderColor: '#ccc',            // Add border color for better visibility
    borderRadius: 20,               // Rounded corners (optional but recommended)
    shadowColor: '#000',            // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,        
          }}>
          <View style={{ marginTop: 6 }}>
            <Text style={{
              fontWeight: '700',
              fontSize: 24,
              lineHeight: 36,
              color: 'rgba(0, 0, 0, 1)',
              textAlign: 'center'
            }}>Password Reset</Text>
            <Text style={{
              fontWeight: '400',
              fontSize: 16,
              color: '#9DB2BF',
              marginTop: 4,
              lineHeight: 20,
              textAlign: 'center'

            }}>
             Please put your email to reset your password
            </Text>
          </View>
          <View
            // onPress={() => setType("SMS")}

            style={{
              flexDirection: 'row', alignItems: "center", justifyContent: "center", marginTop: 15,
marginHorizontal:10,
            }}>
              
          </View>
           
<View style={{
        justifyContent: 'flex-start', marginBottom: 20
        ,
        marginHorizontal: 15
      }}>
        <CustomButton
          title={'Send'}
          // onPress={() => handleForgot()

          // }
          onPress={() => navigation.navigate(ScreenNameEnum.OtpScreen)}
        />
      </View>
        </View>
          
          <Image resizeMode='contain' source={imageIndex.resetPassword} style={{ width: '70%', height: hp(50), alignSelf: 'center', marginBottom: 30 }} />  
        
      </ScrollView>
    
    </SafeAreaView>
  );
}



