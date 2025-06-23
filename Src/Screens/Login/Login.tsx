import React, { useEffect, useState } from 'react';
import {
 SafeAreaView,
 View,
 Text,
 TextInput,
 TouchableOpacity,
 StyleSheet,
 Image,
 ScrollView,
 Alert,
 ActivityIndicator
} from 'react-native';
import colors from '../../Constant/colors';
import { APP_LOGO } from '../../Constant/Icons';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import { moderateScale } from 'react-native-size-matters';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { showToast } from '../../Constant/showToast';
import { BASE_URL } from '../../Constant/apiUrl';
export default function LoginScreen() {
 const navigation = useNavigation<any>();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [loading, setLoading] = useState(false);
 const [secureText, setSecureText] = useState(true);
 const [token, setToken] = useState<string | null>(null);
 const [otpVerified, setOtpVerified] = useState<string | null>(null);
 const isAuthenticated = token && otpVerified === 'true';
 const [user, setUser] = useState(null);
 useEffect(() => {
  const checkStorage = async () => {
   const storedToken = await AsyncStorage.getItem('token');
   const storedOtp = await AsyncStorage.getItem('otpVerified');
   setToken(storedToken);
   setOtpVerified(storedOtp);
   setLoading(false);
  };
  checkStorage();
 }, []);
 const handleLogin = async () => {
  if (!email || !password) {
   showToast('Email and password are required');
   return;
  }

  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
   showToast('Please enter a valid email address');
   return;
  }

  setLoading(true);
  try {
   const response = await axios.post(
    BASE_URL + 'login',
    {
     email,
     password
    },
    {
     headers: {
      'Content-Type': 'application/json'
     }
    }
   );

   console.log('Login Success:', response.data);
   //    setUser(response.data.user_id); // Or store token, etc.
   await AsyncStorage.setItem('token', response?.data?.bearer_token);
   //    saveUser(response.data.user);
   navigation?.navigate('TrialAccessScreen');
   showToast('Login successful!');
  } catch (error: any) {
   console.error('Login Error:', error.response?.data || error.message);
   showToast(error?.response?.data?.message);
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
    <Text allowFontScaling={false} style={[Styles.label, { marginTop: '3%' }]}>
     Email
    </Text>
    <TextInput
     allowFontScaling={false}
     autoCapitalize="none" 
     placeholder="E-mail"
     editable={loading == true ? false : true}
     style={[Styles.input]}
     placeholderTextColor={colors.gray}
     onChangeText={(text: string) => setEmail(text)}
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
   <TouchableOpacity
    style={{ alignSelf: 'flex-end', right: responsiveScreenWidth(15) }}
    onPress={() => navigation?.navigate('ForgotPassword')}>
    <Text allowFontScaling={false} style={Styles.registerText}>
     Forgot Password
    </Text>
   </TouchableOpacity>
   <TouchableOpacity
    disabled={loading}
    onPress={() => handleLogin()}
    style={Styles.loginButton}>
    {loading ? (
     <ActivityIndicator size={20} color={colors.white} />
    ) : (
     <Text allowFontScaling={false} style={Styles.loginText}>
      Log In
     </Text>
    )}
   </TouchableOpacity>

   <Text allowFontScaling={false} style={Styles.orText}>
    OR
   </Text>
   <TouchableOpacity onPress={() => navigation?.navigate('SignUp')}>
    <Text allowFontScaling={false} style={Styles.registerText}>
     Sign Up
    </Text>
   </TouchableOpacity>
  </SafeAreaView>
 );
}
