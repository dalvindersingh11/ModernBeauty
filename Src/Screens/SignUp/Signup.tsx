import React, { useState } from 'react';
import {
 SafeAreaView,
 View,
 Text,
 TextInput,
 TouchableOpacity,
 StyleSheet,
 Image,
 ScrollView,
 Alert
} from 'react-native';
import colors from '../../Constant/colors';
import { APP_LOGO } from '../../Constant/Icons';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen() {
 const navigation = useNavigation<any>();
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [loading, setLoading] = useState(false);
 const [secureText, setSecureText] = useState(true);
 const handleSignUp = async () => {
  if (!email || !password || !name) {
   Alert.alert('All fields are required');
   return;
  }

  setLoading(true);
  try {
   const response = await axios.post(
    'http://api.digitaloldhand.com/api/register',
    {
     email,
     name,
     password,
     password_confirmation: password
    },
    {
     headers: {
      'Content-Type': 'application/json'
     }
    }
   );

   console.log('Login Success:', response.data);
   // Or store token, etc.
   await AsyncStorage.setItem('token', response?.data?.token);
   saveUser(response.data.user);
   navigation?.navigate('OtpScreen');
   Alert.alert('Successful!');
  } catch (error: any) {
   console.log('Login Error:', error);
   Alert.alert('SignUp Failed', 'Something went wrong');
  } finally {
   setLoading(false);
  }
 };
 const saveUser = async (user: object) => {
  try {
   const jsonValue = JSON.stringify(user);
   await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
   console.error('Failed to save user:', e);
  }
 };
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
     onChangeText={(text) => setName(text)}
    />
   </View>
   <View style={Styles.inputContainer}>
    <Text allowFontScaling={false} style={[Styles.label]}>
     Email
    </Text>
    <TextInput
     allowFontScaling={false}
     placeholder="Enter E-mail"
     style={[Styles.input]}
     placeholderTextColor={colors.black}
     onChangeText={(text) => setEmail(text)}
    />
   </View>
   <View style={Styles.inputContainer}>
    <Text allowFontScaling={false} style={Styles.label}>
     Password
    </Text>
    <View
     style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      backgroundColor: colors.white,
      padding: 5,
      borderRadius: 9
     }}>
     <TextInput
      allowFontScaling={false}
      placeholder="Password"
      style={[Styles.input, { width: '85%', height: moderateScale(36) }]}
      editable={loading == true ? false : true}
      placeholderTextColor={colors.gray}
      secureTextEntry={secureText}
      onChangeText={(text: string) => setPassword(text)}
     />
     <Entypo
      name={secureText ? 'eye-with-line' : 'eye'}
      color={colors.black}
      onPress={() => setSecureText(!secureText)}
      size={20}
      style={{ right: responsiveScreenWidth(3) }}
     />
    </View>
   </View>

   <TouchableOpacity onPress={() => handleSignUp()} style={Styles.loginButton}>
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
