import React, { useState } from 'react';
import {
 View,
 Text,
 SafeAreaView,
 TextInput,
 TouchableOpacity
} from 'react-native';

import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import fonts from '../../Constant/Fonts';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../Constant/colors';
import TopHeader from '../../Component/TopHeader/TopHeader';
import { showToast } from '../../Constant/showToast';
import { BASE_URL } from '../../Constant/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const StudentCode = () => {
 const navigation = useNavigation();
 const [code, setCode] = useState<any>('');
 const [loading, setLoading] = useState(false);
 const checkUserTypeAndNavigate = async () => {
  try {
   const type = await AsyncStorage.getItem('userType');
   const userType = parseInt(type || '0', 10);

   console.log('👤 userType:', userType);

   if (userType === 0) {
    navigation.navigate('main', { screen: 'NonStudentTrialScreen' });
   } else {
    navigation.navigate('main', { screen: 'StudentCourseList' });
   }
  } catch (error) {
   console.error('❌ Failed to fetch userType from AsyncStorage:', error);
  }
 };

 const handleVerifyCode = async () => {
  if (!code) {
   showToast('Enter code');
   return;
  }

  setLoading(true);
  try {
   const token = await AsyncStorage.getItem('token');
   const response = await axios.post(
    BASE_URL + 'verify-student',
    { code },
    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
     }
    }
   );

   console.log('✅ Verify Code Success:', response.data);
   showToast('Code verification successful!');

   // Navigate based on userType
   await checkUserTypeAndNavigate();
  } catch (error: any) {
   console.error('❌ Code API Error:', error.response?.data || error.message);
   showToast(error?.response?.data?.message || 'Something went wrong');
  } finally {
   setLoading(false);
  }
 };

 return (
  <SafeAreaView style={Styles.safeArea}>
   <View style={{ padding: 15 }}>
    <TopHeader />
   </View>
   <View style={Styles.container}>
    <View style={{ height: responsiveScreenHeight(20) }} />
    <Text allowFontScaling style={Styles.label}>
     Enter Your Code
    </Text>
    <TextInput
     allowFontScaling={false}
     placeholder="Enter subject"
     style={Styles.inputBox}
     onChangeText={(text) => setCode(text)}
    />

    {/* Message */}

    <TouchableOpacity
     //  onPress={() => handleVerifyCode()}
     onPress={() =>
      navigation?.navigate('main', {
       screen: 'NonStudentTrialScreen'
      })
     }
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

export default StudentCode;
