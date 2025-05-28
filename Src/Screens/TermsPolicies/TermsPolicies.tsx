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

const TermsPolicies = () => {
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
             <TouchableOpacity onPress={()=>navigation.goBack()} >
                      <Image
      source={BACKICON}
      style={{
       width: ms(18),
       height: mvs(16),
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
    Terms and Policies
    </Text>
     <View style={{ width: ms(18), height: mvs(16) }} />
    </View>

   <Text
  allowFontScaling={true}
  style={{
    fontSize: ms(10),
    fontWeight: '400',
    color: '#000',
    paddingHorizontal: 20,
    marginTop: mvs(20),
    lineHeight: 18
  }}>
  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
  The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, 
  as opposed to using 'Content here, content here', making it look like readable English. 
  Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, 
  and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

  {"\n"}
  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
  The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, 
  as opposed to using 'Content here, content here', making it look like readable English. 
  Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, 
  and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

  {"\n"}
  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
  The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, 
  as opposed to using 'Content here, content here', making it look like readable English. 
  Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, 
  and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
  Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

  {"\n\n"}
  Contact Us For More:
  {"\n"}Email: email@gmail.com
  {"\n"}Phone: 9874563210
</Text>


    


 

  

   

    
    
   </View>
  </SafeAreaView>
 );
};

export default TermsPolicies;