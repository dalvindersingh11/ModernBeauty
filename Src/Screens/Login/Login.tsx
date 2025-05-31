import React from 'react';
import {
 SafeAreaView,
 View,
 Text,
 TextInput,
 TouchableOpacity,
 StyleSheet,
 Image,
 ScrollView
} from 'react-native';
import colors from '../../Constant/colors';
import { APP_LOGO } from '../../Constant/Icons';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
 const navigation = useNavigation<any>();
 return (
  <SafeAreaView style={Styles.container}>
   <Image style={Styles.logoStyle} source={APP_LOGO} />
   <View style={Styles.inputContainer}>
    <Text allowFontScaling={false} style={[Styles.label, { marginTop: '3%' }]}>
     Username
    </Text>
    <TextInput
     allowFontScaling={false}
     placeholder="Enter Username"
     style={[Styles.input]}
     placeholderTextColor={colors.gray}
    />
   </View>

   <View style={Styles.inputContainer}>
    <Text allowFontScaling={false} style={Styles.label}>
     Password
    </Text>
    <TextInput
     allowFontScaling={false}
     placeholder="Enter Password"
     style={Styles.input}
     placeholderTextColor={colors.gray}
     secureTextEntry
    />
   </View>

   <TouchableOpacity
    onPress={() => navigation?.navigate('OtpScreen')}
    style={Styles.loginButton}>
    <Text allowFontScaling={false} style={Styles.loginText}>
     Log In
    </Text>
   </TouchableOpacity>

   <Text allowFontScaling={false} style={Styles.orText}>
    OR
   </Text>
   <TouchableOpacity onPress={() => navigation?.navigate('SignUp')}>
    <Text allowFontScaling={false} style={Styles.registerText}>
     New Register User
    </Text>
   </TouchableOpacity>
   <TouchableOpacity onPress={() => navigation?.navigate('Settings')}>
    <Text allowFontScaling={false} style={Styles.registerText}>
     GO TO SETTINGS TESTING BUTTON
    </Text>
   </TouchableOpacity>
  </SafeAreaView>
 );
}
