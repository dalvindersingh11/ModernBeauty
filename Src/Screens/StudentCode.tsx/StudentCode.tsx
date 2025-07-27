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
 const navigation = useNavigation<any>();
 const [code, setCode] = useState<any>('');
 const [loading, setLoading] = useState(false);
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
    {
     code
    },
    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
     }
    }
   );

   console.log('verify code Success:', response.data);
   //    setUser(response.data.user_id); // Or store token, etc.
   //    await AsyncStorage.setItem('token', response?.data?.bearer_token);
   //    saveUser(response.data.user);
   //    navigation?.navigate('StudentCode');
   showToast('successful');
  } catch (error: any) {
   console.error('Code api Error:', error.response?.data || error.message);
   showToast(error?.response?.data?.message);
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
     onPress={() => navigation?.navigate('StudentCourseList')}
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
