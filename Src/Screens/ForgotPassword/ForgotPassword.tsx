import React, { useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 SafeAreaView,
 TextInput,
 ActivityIndicator,
 Alert
} from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import colors from '../../Constant/colors';
import { BASE_URL } from '../../Constant/apiUrl';
import { showToast } from '../../Constant/showToast';
import { BACKICON } from '../../Constant/Icons';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
const ForgotPassword = () => {
 const navigation = useNavigation<any>();
 const [email, setEmail] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [isStatus, setIsStatus] = useState(0);
 const [loading, setLoading] = useState(false);
 const [userToken, seUserToken] = useState('');

 const handleForgotPassword = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
   showToast('Please enter a valid email address');
   return;
  }

  setLoading(true);

  setLoading(true);
  try {
   const response = await axios.post(
    `${BASE_URL}forget-password`,
    {
     email: email
    },
    {
     headers: {
      'Content-Type': 'application/json'
     }
    }
   );

   console.log('responseff', response);
   seUserToken(response?.data?.forget_password_token);
   setIsStatus(1);
  } catch (error) {
   console.error('Error:', error.response?.data || error.message);
   showToast('Something went wrong');
  } finally {
   setLoading(false);
  }
 };
 const handlePassword = async () => {
  if (!confirmPassword || !newPassword) {
   Alert.alert('Validation', 'All Fields are required');
   return;
  }

  setLoading(true);
  try {
   const response = await axios.post(
    `${BASE_URL}reset-password`,
    {
     email: email,
     forget_password_token: userToken,
     password: newPassword,
     password_confirmation: confirmPassword
    },
    {
     headers: {
      'Content-Type': 'application/json'
     }
    }
   );

   console.log('response', response);
   navigation?.navigate('Login');
   showToast(response?.data?.message);
  } catch (error) {
   console.error('Error:', error.response?.data || error.message);
   showToast('Something went wrong');
  } finally {
   setLoading(false);
  }
 };
 return (
  <SafeAreaView style={Styles.safeArea}>
   <View style={Styles.headerRow}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
     <Image source={BACKICON} style={Styles.backIcon} />
    </TouchableOpacity>

    <Text allowFontScaling style={Styles.title}>
     Forgot Password
    </Text>
   </View>
   <View style={{ height: responsiveScreenHeight(5) }} />
   {isStatus == 0 ? (
    <View>
     <Text allowFontScaling style={[Styles.label, { marginTop: '5%' }]}>
      Enter E-mail
     </Text>
     <TextInput
      placeholder="Enter E-mail"
      style={Styles.inputBox}
      onChangeText={(text) => setEmail(text)}
     />
     <TouchableOpacity
      disabled={loading}
      onPress={() => handleForgotPassword()}
      style={Styles.loginButton}>
      {loading ? (
       <ActivityIndicator size={20} color={colors.white} />
      ) : (
       <Text allowFontScaling={false} style={Styles.loginText}>
        Submit
       </Text>
      )}
     </TouchableOpacity>
    </View>
   ) : (
    <View>
     <Text allowFontScaling style={[Styles.label, { marginTop: '5%' }]}>
      New Password
     </Text>
     <TextInput
      placeholder="New password"
      style={Styles.inputBox}
      onChangeText={(text) => setNewPassword(text)}
     />
     <Text allowFontScaling style={[Styles.label, { marginTop: '5%' }]}>
      Confirm Password
     </Text>
     <TextInput
      placeholder="Confirm password"
      style={Styles.inputBox}
      onChangeText={(text) => setConfirmPassword(text)}
     />
     <TouchableOpacity
      disabled={loading}
      onPress={() => handlePassword()}
      style={Styles.loginButton}>
      {loading ? (
       <ActivityIndicator size={20} color={colors.white} />
      ) : (
       <Text allowFontScaling={false} style={Styles.loginText}>
        Submit
       </Text>
      )}
     </TouchableOpacity>
    </View>
   )}
  </SafeAreaView>
 );
};

export default ForgotPassword;
