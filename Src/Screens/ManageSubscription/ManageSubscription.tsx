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

const ManageSubscription = () => {
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
      My Subscription
     </Text>
     <View style={{ width: ms(18), height: mvs(16) }} />
    </View>

    <View
     style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: ms(20),marginTop:mvs(30)
     }}>
     <View style={{ gap:5 }}>
      <Text
       allowFontScaling={true}
       style={{
        fontSize: ms(10),
        fontWeight: '600',
        color: '#000'
       }}>
       Purchased on 21 Apr 2025
      </Text>
      <View style={{ flexDirection: 'row' }}>
       <Text
        allowFontScaling={true}
        style={{
         fontSize: ms(19),
         fontWeight: '600',
         color: '#000'
        }}>
        $500
       </Text>
       <Text
        allowFontScaling={true}
        style={{
         fontSize: ms(10),
         fontWeight: '600',
         color: '#000',
         marginLeft: ms(3)
        }}>
        per month
       </Text>
      </View>
     </View>
     <TouchableOpacity
      style={{
       backgroundColor: 'black',
       paddingVertical: mvs(2),
       paddingHorizontal: ms(8),
       borderRadius: ms(9)
      }}>
      <Text style={{ color: '#fff', fontSize: ms(11), fontWeight: '500' }}>
       Manage Subscription
      </Text>
     </TouchableOpacity>
    </View>
   </View>
  </SafeAreaView>
 );
};

export default ManageSubscription;
