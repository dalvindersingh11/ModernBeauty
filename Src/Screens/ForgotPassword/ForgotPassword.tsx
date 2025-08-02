import React, { useEffect, useRef, useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 SafeAreaView,
 TextInput,
 ActivityIndicator,
 Alert,
 BackHandler
} from 'react-native';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import colors from '../../Constant/colors';
import { BASE_URL } from '../../Constant/apiUrl';
import { showToast } from '../../Constant/showToast';
import { BACKICON } from '../../Constant/Icons';
import {
 responsiveScreenHeight,
 responsiveScreenWidth
} from 'react-native-responsive-dimensions';
const ForgotPassword = () => {
 const navigation = useNavigation<any>();
 const [email, setEmail] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [isStatus, setIsStatus] = useState(0);
 const [loading, setLoading] = useState(false);
 const [userToken, seUserToken] = useState('');
 const [otp, setOtp] = useState(['', '', '', '']);
 const inputRefs = useRef([]);

 useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
   navigation.goBack(); // Go back to the previous screen
   return true; // Prevent default behavior (exit app)
  });

  return () => backHandler.remove(); // Clean up the event on unmount
 }, []);
 useEffect(() => {
  if (isStatus === 0) {
   setNewPassword('');
   setConfirmPassword('');
  } else {
   setEmail('');
  }
 }, [isStatus]);
 const handleForgotPassword = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
   showToast('Please enter a valid email address');
   return;
  }

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

   console.log('response', response);
   seUserToken(response?.data?.forget_password_token);
   setIsStatus(1);
  } catch (error) {
   console.error('Error:', error.response?.data || error.message);
   showToast('Something went wrong');
  } finally {
   setLoading(false);
  }
 };
 const handleChange = (text: string, index: number) => {
  const newOtp = [...otp];
  newOtp[index] = text;
  setOtp(newOtp);

  if (text && index < 3) {
   inputRefs.current[index + 1].focus();
  }
 };

 const handleKeyPress = ({ nativeEvent }: any, index: any) => {
  if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
   inputRefs.current[index - 1].focus();
  }
 };

 //https://api.addmelocal.in/api/verify-otp?otp=1234
 const handleOtp = async () => {
  //   setIsStatus(2);
  const joinedOtp = otp.join('').trim();

  if (!joinedOtp) {
   showToast('enter 4 digit otp');
   return;
  }
  setLoading(true);
  try {
   const response = await axios.post(
    `${BASE_URL}verify-otp`,
    { otp: joinedOtp }, // Send in body as JSON
    {
     headers: {
      'Content-Type': 'application/json'
     }
    }
   );

   console.log('OTP Success:', response.data);
   showToast('Verification successful!');
   setIsStatus(2);
   //    navigation?.navigate('Login');
  } catch (error: any) {
   setLoading(false);
   console.error('OTP Error:', error.response?.data || error.message);
   showToast(error?.response?.data?.message || 'OTP verification failed');
  } finally {
   setLoading(false);
  }
 };
 const handlePassword = async () => {
  if (!confirmPassword || !newPassword) {
   showToast('All Fields are required');
   return;
  }

  setLoading(true);
  try {
   const response = await axios.post(
    `${BASE_URL}reset-password`,
    {
     //  email: email,
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
  } catch (error: any) {
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
   {isStatus === 0 ? (
    <View key="status0">
     <Text allowFontScaling style={[Styles.label, { marginTop: '5%' }]}>
      Enter E-mail
     </Text>
     <TextInput
      placeholder="Enter E-mail"
      style={Styles.inputBox}
      onChangeText={setEmail}
      value={email}
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
   ) : isStatus == 1 ? (
    <View style={{ right: 2 }}>
     <Text
      allowFontScaling={false}
      style={[
       Styles.label,
       {
        marginLeft: responsiveScreenWidth(15),
        top: responsiveScreenHeight(2.5)
       }
      ]}>
      Enter OTP
     </Text>

     <View style={Styles.otpContainer}>
      {[0, 1, 2, 3].map((_, index) => (
       <TextInput
        allowFontScaling={false}
        key={index}
        ref={(ref) => (inputRefs.current[index] = ref)}
        style={Styles.otpInput}
        keyboardType="numeric"
        placeholderTextColor={colors.black}
        maxLength={1}
        value={otp[index]}
        onChangeText={(text) => handleChange(text, index)}
        onKeyPress={(e) => handleKeyPress(e, index)}
       />
      ))}
     </View>
     <TouchableOpacity
      disabled={loading}
      onPress={() => handleOtp()}
      style={Styles.loginButton}>
      {loading ? (
       <ActivityIndicator size={20} color={colors.white} />
      ) : (
       <Text allowFontScaling={false} style={Styles.verifyText}>
        Verify
       </Text>
      )}
     </TouchableOpacity>
    </View>
   ) : (
    <View key="status1">
     <Text allowFontScaling style={[Styles.label, { marginTop: '5%' }]}>
      New Password
     </Text>
     <TextInput
      placeholder="New password"
      style={Styles.inputBox}
      onChangeText={setNewPassword}
      value={newPassword}
      secureTextEntry
     />
     <Text allowFontScaling style={[Styles.label, { marginTop: '5%' }]}>
      Confirm Password
     </Text>
     <TextInput
      placeholder="Confirm password"
      style={Styles.inputBox}
      onChangeText={setConfirmPassword}
      value={confirmPassword}
      secureTextEntry
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
