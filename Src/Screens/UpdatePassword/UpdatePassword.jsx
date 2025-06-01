import React from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 SafeAreaView,
 TextInput
} from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import { APP_LOGO, BACKICON, USER } from '../../Constant/Icons';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';

const UpdatePassword = () => {
 const navigation = useNavigation();

 return (
  <SafeAreaView style={Styles.safeArea}>
   <View style={Styles.container}>
    <View style={Styles.headerRow}>
     {/* <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={BACKICON} style={Styles.backIcon} />
     </TouchableOpacity> */}

     <Text allowFontScaling style={Styles.title}>
      Update Password
     </Text>

    </View>
<View style={{height:mvs(20)}}/>
    <Text allowFontScaling style={Styles.label}>
    Current Password
    </Text>
    <TextInput placeholder="Enter current password" style={Styles.inputBox} />
    <Text allowFontScaling style={Styles.label}>
    New Password
    </Text>
    <TextInput placeholder="Enter new password" style={Styles.inputBox} />
   </View>
  </SafeAreaView>
 );
};

export default UpdatePassword;
