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
 SAMPLEIMAGE,
 USER
} from '../../Constant/Icons';
import colors from '../../Constant/colors';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';

const AddTicket = () => {
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
      Add Ticket
     </Text>
     <View style={{ width: ms(18), height: mvs(16) }} />
    </View>

    <Text
     allowFontScaling={true}
     style={{
      fontSize: ms(16),
      fontWeight: '700',
      color: '#000'
     }}>
     Subject
    </Text>
    <View
     style={{
      backgroundColor: '#fff',
      borderRadius: ms(6),
      gap: mvs(10),
      padding: mvs(10),
      alignItems: 'flex-start'
     }}>
     <TextInput placeholder="Enter subject" />
    </View>
    <Text allowFontScaling={true} style={{
    fontSize: ms(16),
    fontWeight: '700',
    color: '#000'
  }}>Message</Text>
     <View style={{
    backgroundColor: '#fff',
    borderRadius: ms(6),
    gap: mvs(10),
    padding: mvs(10),
    alignItems: 'flex-start',minHeight:mvs(161)
  }}><TextInput placeholder="Enter subject" /></View>
   </View>
  </SafeAreaView>
 );
};

export default AddTicket;
