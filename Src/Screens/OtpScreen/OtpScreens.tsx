import React, { useRef, useState } from 'react';
import {
 SafeAreaView,
 View,
 Text,
 TextInput,
 TouchableOpacity,
 Image,
 Alert,
 ActivityIndicator
} from 'react-native';
import { APP_LOGO } from '../../Constant/Icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '../../Constant/showToast';
import axios from 'axios';
import { BASE_URL } from '../../Constant/apiUrl';
import Popup from '../SignUp/Popup';
import colors from '../../Constant/colors';

export default function OtpScreen() {
 const navigation = useNavigation<any>();
 const [otp, setOtp] = useState(['', '', '', '']);
 const [loading, setLoading] = useState(false);
 const inputRefs = useRef([]);
 const [modalVisible, setModalVisible] = useState(false);
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
   navigation?.navigate('Login');
  } catch (error: any) {
   setLoading(false);
   console.error('OTP Error:', error.response?.data || error.message);
   showToast(error?.response?.data?.message || 'OTP verification failed');
  } finally {
   setLoading(false);
  }
 };
 return (
  <SafeAreaView style={Styles.container}>
   <Image
    style={{ width: 280, height: 73, marginTop: '-5%' }}
    source={APP_LOGO}
   />
   <View style={{ height: 70, marginTop: '2%' }} />
   <View style={{ right: 2 }}>
    <Text allowFontScaling={false} style={Styles.label}>
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
       placeholderTextColor={Colors.black}
       maxLength={1}
       value={otp[index]}
       onChangeText={(text) => handleChange(text, index)}
       onKeyPress={(e) => handleKeyPress(e, index)}
      />
     ))}
    </View>
   </View>
   <Popup
    modalVisible={modalVisible}
    closeModal={() => {
     setModalVisible(!modalVisible), navigation?.goBack();
    }}
   />
   <TouchableOpacity
    disabled={loading}
    // onPress={async () => {
    //  const enteredOtp = otp.join('');
    //  if (enteredOtp === '1234') {
    //   await AsyncStorage.setItem('otpVerified', 'true');
    //   navigation?.navigate('TrialAccessScreen');
    //   setTimeout(() => {
    //    setOtp(['', '', '', '']);
    //   }, 2000);
    //  } else {
    //   Alert.alert('Invalid OTP. Please try again.');
    //  }
    // }}
    onPress={() => handleOtp()}
    style={Styles.verifyButton}>
    {loading ? (
     <ActivityIndicator size={20} color={colors.white} />
    ) : (
     <Text allowFontScaling={false} style={Styles.verifyText}>
      Verify
     </Text>
    )}
   </TouchableOpacity>
  </SafeAreaView>
 );
}
