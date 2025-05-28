import React from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 SafeAreaView,
 StyleSheet,
 TextInput
} from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import {
 APP_LOGO,
 BACKICON,
 EDITPROFILEICON,
 HELPPLUS,
 SAMPLEIMAGE,
 USER
} from '../../Constant/Icons';
import colors from '../../Constant/colors';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';

const HelpSupport = () => {
 const navigation = useNavigation();
 return (
  <SafeAreaView
   style={{
    flex: 1,
    backgroundColor: colors.backgrounColor
   }}>
   <View style={{ gap: mvs(10), padding: ms(12) }}>
    {/* Top branding */}
    <View
     style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
     }}>
     <Image
      style={{ height: moderateScale(20), width: moderateScale(76) }}
      source={APP_LOGO}
     />
     <Image
      source={USER}
      style={{
       width: 40,
       height: 40,
       borderRadius: 20
      }}
     />
    </View>
    <View
     style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
     }}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
       source={BACKICON}
       style={{
        width: ms(18),
        height: mvs(16)
       }}
      />
     </TouchableOpacity>

     <Text
      allowFontScaling={true}
      style={{
       fontSize: ms(24),
       fontWeight: '700',
       color: '#000'
      }}>
   Help & Support
     </Text>
        <TouchableOpacity onPress={() => navigation?.navigate('AddTicket')} >

      <Image
       source={HELPPLUS}
       style={{
        width: ms(24.22),
        height: ms(24.22),resizeMode:'contain'
       }}
      />
     </TouchableOpacity>
    </View>


   </View>
   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
     <Text
       allowFontScaling={true}
       style={{
        fontSize: ms(12),
        fontWeight: '400',
        color: '#000'
       }}>
       No Ticket Found
      </Text>
</View>
  </SafeAreaView>
 );
};

export default HelpSupport;
