import React, { useEffect, useState } from 'react';
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
const UpdatePassword = () => {
 const navigation = useNavigation();
 const [email, setEmail] = useState('');
 const [currentPassword, setCurrentPassword] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const [isStatus, setIsStatus] = useState(0);
 const [loading, setLoading] = useState(false);
 const [userToken, seUserToken] = useState('');

 const handleLogout = async () => {
  setLoading(true);
  try {
   const token = await AsyncStorage.getItem('token');

   if (!token) {
    Alert.alert('Error', 'User not logged in');
    setLoading(false);
    return;
   }

   const response = await axios.post(
    `${BASE_URL}logout`,
    {}, // empty body
    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
     }
    }
   );

   console.log('logoutResponse', response?.data);

   await AsyncStorage.removeItem('token');
   //    showToast('Logged out successfully');
   navigation?.navigate('auth');
  } catch (error) {
   console.log('Logout error:', error?.response?.data || error.message);
   showToast('Something went wrong. Please try again.');
  } finally {
   setLoading(false);
  }
 };

 const handlePassword = async () => {
  let token = await AsyncStorage?.getItem('token');
  if (!currentPassword || !newPassword) {
   Alert.alert('Validation', 'All Fields are required');
   return;
  }

  setLoading(true);
  try {
   const response = await axios.put(
    `${BASE_URL}update-password`,
    {
     current_password: currentPassword,
     password: newPassword,
     password_confirmation: newPassword
    },
    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
     }
    }
   );

   console.log('response', response);
   showToast(response?.data?.message);
   handleLogout();
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
    <Text allowFontScaling style={Styles.title}>
     Update Password
    </Text>
   </View>
   <View style={{ height: responsiveScreenHeight(5) }} />
   <View>
    <Text allowFontScaling style={[Styles.label, { marginTop: '5%' }]}>
     Current Password
    </Text>
    <TextInput
     placeholder="Enter current password"
     style={Styles.inputBox}
     onChangeText={(text) => setCurrentPassword(text)}
    />
    <Text allowFontScaling style={[Styles.label, { marginTop: '5%' }]}>
     New Password
    </Text>
    <TextInput
     placeholder="Enter new password"
     style={Styles.inputBox}
     onChangeText={(text) => setNewPassword(text)}
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
  </SafeAreaView>
 );
};

export default UpdatePassword;
