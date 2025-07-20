import React from 'react';
import {
 View,
 Text,
 SafeAreaView,
 TextInput,
 TouchableOpacity
} from 'react-native';

import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import fonts from '../../Constant/Fonts';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../Constant/colors';

const RequetsAccess = () => {
 const navigation = useNavigation();

 return (
  <SafeAreaView style={Styles.safeArea}>
   <View style={Styles.container}>
    <View style={{ height: responsiveScreenHeight(9) }} />
    <Text
     style={{ textAlign: 'center', fontFamily: fonts.regular, fontSize: 15 }}>
     Please submit a request for enrollment {'\n'} information at IMB:
    </Text>
    <View style={{ height: responsiveScreenHeight(1) }} />
    <Text allowFontScaling style={Styles.label}>
     Subject
    </Text>
    <TextInput placeholder="Enter subject" style={Styles.inputBox} />

    {/* Message */}
    <Text allowFontScaling style={Styles.label}>
     Message
    </Text>
    <View style={Styles.messageBox}>
     <TextInput placeholder="Enter message" multiline />
    </View>
    <TouchableOpacity
     style={{
      width: moderateScale(210),
      padding: 14,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.black,
      alignSelf: 'center',
      marginTop: responsiveScreenHeight(3),
      borderRadius: 12
     }}>
     <Text
      allowFontScaling
      style={{ color: colors.white, fontFamily: fonts.medium, fontSize: 14 }}>
      Submit
     </Text>
    </TouchableOpacity>
   </View>
  </SafeAreaView>
 );
};

export default RequetsAccess;
