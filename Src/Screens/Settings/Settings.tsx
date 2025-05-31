import React from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 SafeAreaView,
 StyleSheet,
 Alert
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

const Settings = () => {
 const navigation = useNavigation<any>();
 const handleLogout = async () => {
  try {
   const token = await AsyncStorage.getItem('token');

   if (!token) {
    Alert.alert('Error', 'User not logged in');
    return;
   }

   const response = await axios.post(
    'https://api.digitaloldhand.com/api/logout',
    {},
    {
     headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
     }
    }
   );

   // Clear local storage on success
   await AsyncStorage.removeItem('token');
   await AsyncStorage.removeItem('user');

   Alert.alert('Logged out successfully');

   // Navigate to login or splash screen
   navigation?.navigate('Login');
  } catch (error: any) {
   console.log('Logout error:', error);
   Alert.alert(
    'Logout Failed',
    error?.response?.data?.message || 'Please try again.'
   );
  }
 };

 return (
  <SafeAreaView style={Styles.container}>
   <View style={Styles.contentWrapper}>
    <View style={Styles.brandingContainer}>
     <Image style={Styles.logo} source={APP_LOGO} />
     <Image source={USER} style={Styles.userImage} />
    </View>

    <View style={Styles.header}>
     <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={BACKICON} style={Styles.backIcon} />
     </TouchableOpacity>
     <Text allowFontScaling={true} style={Styles.title}>
      Settings
     </Text>
     <View style={Styles.placeholder} />
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
     <TouchableOpacity onPress={() => handleLogout()} style={Styles.row}>
      <Image source={SETTINGLOGOUT} style={Styles.icon} />
      <Text allowFontScaling={true} style={Styles.optionText}>
       Log out
      </Text>
     </TouchableOpacity>
    </View>
   </View>
  </SafeAreaView>
 );
};

export default Settings;
