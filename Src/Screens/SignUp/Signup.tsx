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

export default function SignUpScreen() {
 const navigation = useNavigation<any>();
 return (
  <SafeAreaView style={Styles.container}>
   <Image style={Styles.logoStyle} source={APP_LOGO} />
   <View style={Styles.inputContainer}>
    <Text allowFontScaling={false} style={[Styles.label, { marginTop: '5%' }]}>
     FullName
    </Text>
    <TextInput
     allowFontScaling={false}
     placeholder="Enter Username"
     style={[Styles.input]}
     placeholderTextColor={colors.black}
    />
   </View>
   <View style={Styles.inputContainer}>
    <Text allowFontScaling={false} style={[Styles.label]}>
     Email
    </Text>
    <TextInput
     allowFontScaling={false}
     placeholder="Enter Username"
     style={[Styles.input]}
     placeholderTextColor={colors.black}
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
     placeholderTextColor={colors.black}
     secureTextEntry
    />
   </View>

   <TouchableOpacity
    onPress={() => navigation?.navigate('OtpScreen')}
    style={Styles.loginButton}>
    <Text allowFontScaling={false} style={Styles.loginText}>
     Sign Up
    </Text>
   </TouchableOpacity>

   <Text allowFontScaling={false} style={Styles.orText}>
    OR
   </Text>
   <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
    <Text allowFontScaling={false} style={Styles.registerText}>
     Log In
    </Text>
   </TouchableOpacity>
  </SafeAreaView>
 );
}
