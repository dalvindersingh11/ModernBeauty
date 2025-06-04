import React, { useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 SafeAreaView,
 TextInput,
 ActivityIndicator
} from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import colors from '../../Constant/colors';
import { BASE_URL } from '../../Constant/apiUrl';
import { showToast } from '../../Constant/showToast';
const UpdatePassword = () => {
 const navigation = useNavigation();
 const [currentPassword, setCurrentPassword] = useState('');
 const [newPassword, setNewPassword] = useState('');
 const [loading, setLoading] = useState(false);
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
     password: newPassword
    },
    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer${token}`
     }
    }
   );

   console.log('response', response);
  } catch (error) {
   console.error('Error:', error.response?.data || error.message);
   showToast('Something went wrong');
  } finally {
   setLoading(false);
  }
 };
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
    <View style={{ height: mvs(20) }} />
    <Text allowFontScaling style={Styles.label}>
     Current Password
    </Text>
    <TextInput
     placeholder="Enter current password"
     style={Styles.inputBox}
     onChangeText={(text) => setCurrentPassword(text)}
    />
    <Text allowFontScaling style={Styles.label}>
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
