import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 SafeAreaView,
 TextInput,
 TouchableOpacity,
 Alert,
 BackHandler
} from 'react-native';

import Styles from './Styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import fonts from '../../Constant/Fonts';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../Constant/colors';
import { showToast } from '../../Constant/showToast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RequetsAccess = () => {
 const navigation = useNavigation();
 const [subject, setSubject] = useState('');
 const [message, setMessage] = useState('');
 const [loading, setLoading] = useState(false);
 useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
   navigation.goBack(); // Go back to the previous screen
   return true; // Prevent default behavior (exit app)
  });

  return () => backHandler.remove(); // Clean up the event on unmount
 }, []);
 const handleSubmit = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!subject.trim() || !message.trim()) {
   showToast('All fields are required');
   return;
  }

  try {
   setLoading(true);

   const response = await fetch('https://api.addmelocal.in/api/store-message', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     Accept: 'application/json',
     Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
     subject: subject,
     message: message
    })
   });

   const data = await response.json();

   if (response.ok) {
    showToast(data?.message);
    setSubject('');
    setMessage('');
    await AsyncStorage.removeItem('token');
    await AsyncStorage?.clear();

    //    navigation?.navigate('auth');
    navigation.dispatch(
     CommonActions.reset({
      index: 0,
      routes: [{ name: 'auth' }]
     })
    );
   } else {
    console.log('Server Error:', data);
    Alert.alert('Error', data?.message || 'Failed to submit ticket');
   }
  } catch (error: any) {
   console.error('API Error:', error);
   Alert.alert('Error', 'Something went wrong: ' + error?.message);
  } finally {
   setLoading(false);
  }
 };
 return (
  <SafeAreaView style={Styles.safeArea}>
   <View style={Styles.container}>
    <View style={{ height: responsiveScreenHeight(5) }} />
    <Text
     style={{ textAlign: 'center', fontFamily: fonts.regular, fontSize: 15 }}>
     Please submit a request for enrollment {'\n'} information at IMB:
    </Text>
    <View style={{ height: responsiveScreenHeight(5) }} />
    <Text allowFontScaling style={Styles.label}>
     Subject
    </Text>
    <TextInput
     placeholder="Enter subject"
     style={Styles.inputBox}
     onChangeText={(text) => setSubject(text)}
    />

    {/* Message */}
    <Text allowFontScaling style={Styles.label}>
     Message
    </Text>
    <View style={Styles.messageBox}>
     <TextInput
      placeholder="Enter message"
      multiline
      onChangeText={(text) => setMessage(text)}
     />
    </View>
    <TouchableOpacity
     onPress={() => handleSubmit()}
     style={{
      width: moderateScale(210),
      padding: 14,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.black,
      alignSelf: 'center',
      marginTop: responsiveScreenHeight(3),
      borderRadius: 12
     }}>
     <Text
      allowFontScaling
      style={{ color: colors.white, fontFamily: fonts.medium, fontSize: 14 }}>
      Submit
     </Text>
    </TouchableOpacity>
   </View>
  </SafeAreaView>
 );
};

export default RequetsAccess;
