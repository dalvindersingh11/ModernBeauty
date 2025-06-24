import React, { useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 SafeAreaView,
 StyleSheet,
 Alert,
 ActivityIndicator
} from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import {
 APP_LOGO,
 BACKICON,
 SETTINGHELP,
 SETTINGLOGOUT,
 SETTINGPRIVACY,
 SETTINGSUBSCRIPTION,
 SETTINGTERMSPOLICIES,
 SETTINGUSER,
 USER
} from '../../Constant/Icons';
import colors from '../../Constant/colors';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showToast } from '../../Constant/showToast';
import fonts from '../../Constant/Fonts';
import { BASE_URL } from '../../Constant/apiUrl';
import RNRestart from 'react-native-restart';
const Settings = () => {
 const navigation = useNavigation<any>();
 const [loading, setLoading] = useState(false);
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
   showToast('Logged out successfully');
   navigation?.navigate('auth');
// 🔁 Restart app so App.tsx reruns and redirects to 'auth'
    // RNRestart.Restart();

  } catch (error: any) {
   console.log('Logout error:', error?.response?.data || error.message);
   showToast('Something went wrong. Please try again.');
  } finally {
   setLoading(false);
  }
 };

 return (
  <SafeAreaView style={Styles.container}>
   <View style={Styles.contentWrapper}>
    <View style={Styles.header}>
     {/* <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={BACKICON} style={Styles.backIcon} />
     </TouchableOpacity> */}
     <Text allowFontScaling={true} style={Styles.title}>
      Settings
     </Text>
     {/* <View style={Styles.placeholder} /> */}
    </View>

    <Text allowFontScaling={true} style={Styles.sectionTitle}>
     Account
    </Text>
    <View style={Styles.card}>
     <TouchableOpacity
      onPress={() => navigation?.navigate('EditProfile')}
      style={Styles.row}>
      <Image source={SETTINGUSER} style={Styles.icon} />
      <Text allowFontScaling={true} style={Styles.optionText}>
       Edit profile
      </Text>
     </TouchableOpacity>
     <TouchableOpacity
      onPress={() => navigation?.navigate('UpdatePassword')}
      style={Styles.row}>
      <Image source={SETTINGPRIVACY} style={Styles.icon} />
      <Text allowFontScaling={true} style={Styles.optionText}>
       Update Password
      </Text>
     </TouchableOpacity>
     <TouchableOpacity
      onPress={() => navigation?.navigate('PrivacyPolicy')}
      style={Styles.row}>
      <Image source={SETTINGPRIVACY} style={Styles.icon} />
      <Text allowFontScaling={true} style={Styles.optionText}>
       Privacy
      </Text>
     </TouchableOpacity>
    </View>

    <Text allowFontScaling={true} style={Styles.sectionTitle}>
     Support & About
    </Text>
    <View style={Styles.card}>
     <TouchableOpacity
      onPress={() => navigation?.navigate('ManageSubscription')}
      style={Styles.row}>
      <Image source={SETTINGSUBSCRIPTION} style={Styles.icon} />
      <Text allowFontScaling={true} style={Styles.optionText}>
       My Subscription
      </Text>
     </TouchableOpacity>
     <TouchableOpacity
      onPress={() => navigation?.navigate('HelpSupport')}
      style={Styles.row}>
      <Image source={SETTINGHELP} style={Styles.icon} />
      <Text allowFontScaling={true} style={Styles.optionText}>
       Help & Support
      </Text>
     </TouchableOpacity>
     <TouchableOpacity
      onPress={() => navigation?.navigate('TermsPolicies')}
      style={Styles.row}>
      <Image source={SETTINGTERMSPOLICIES} style={Styles.icon} />
      <Text allowFontScaling={true} style={Styles.optionText}>
       Terms and Policies
      </Text>
     </TouchableOpacity>
    </View>

    <Text allowFontScaling={true} style={Styles.sectionTitle}>
     Actions
    </Text>
    <View style={Styles.card}>
     <TouchableOpacity
      disabled={loading}
      onPress={() => handleLogout()}
      style={Styles.row}>
      <Image source={SETTINGLOGOUT} style={Styles.icon} />
      {loading ? (
       <View style={{ top: moderateScale(0), marginLeft: '5%' }}>
        <Text
         allowFontScaling={false}
         style={{
          color: colors.black,
          fontFamily: fonts.regular,
          fontSize: 15
         }}>
         Logging Out ...
        </Text>
       </View>
      ) : (
       <Text allowFontScaling={true} style={Styles.optionText}>
        Log out
       </Text>
      )}
     </TouchableOpacity>
    </View>
   </View>
  </SafeAreaView>
 );
};

export default Settings;
