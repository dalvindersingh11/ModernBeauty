import React, { useState } from 'react';
import {
 SafeAreaView,
 View,
 Text,
 TextInput,
 TouchableOpacity,
 Image,
 Alert,
 Linking,
 ActivityIndicator
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
import { showToast } from '../../Constant/showToast';
import { BASE_URL } from '../../Constant/apiUrl';
import Popup from './Popup';

export default function SignUpScreen() {
 const navigation = useNavigation<any>();
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [loading, setLoading] = useState(false);
 const [secureText, setSecureText] = useState(true);
 const [modalVisible, setModalVisible] = useState(false);
 const handleSignUp = async () => {
  if (!email || !password || !name) {
   showToast('All fields are required');
   return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
   showToast('Please enter a valid email address');
   return;
  }

  setLoading(true);
  try {
   const response = await axios.post(
    BASE_URL + 'register',
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

   console.log('Signup Success:', response);

   //  setModalVisible(!modalVisible);
   //    saveUser(response.data.user);
   navigation?.navigate('OtpScreen');
   //    showToast('SignUp successful!');
   //    await AsyncStorage.setItem('token', response?.data?.token);
   //    saveUser(response.data.user);
  } catch (error: any) {
   console.log('SignUp Error:', error);
   showToast(error?.response?.data?.message);
   setLoading(false);
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
  } finally {
   setLoading(false);
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
     editable={loading == true ? false : true}
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
     editable={loading == true ? false : true}
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
   <Popup
    modalVisible={modalVisible}
    closeModal={() => {
     setModalVisible(!modalVisible),
      Linking.openURL('https://gmail.app.goo.gl');
    }}
   />
   <TouchableOpacity
    disabled={loading}
    onPress={() => handleSignUp()}
    style={Styles.loginButton}>
    {loading ? (
     <ActivityIndicator size={20} color={colors.white} />
    ) : (
     <Text allowFontScaling={false} style={Styles.loginText}>
      Sign Up
     </Text>
    )}
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
