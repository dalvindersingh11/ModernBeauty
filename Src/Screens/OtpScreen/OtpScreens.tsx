import React, { useRef, useState } from 'react';
import {
 SafeAreaView,
 View,
 Text,
 TextInput,
 TouchableOpacity,
 Image
} from 'react-native';
import { APP_LOGO } from '../../Constant/Icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';

export default function OtpScreen() {
 const navigation = useNavigation<any>();
 const [otp, setOtp] = useState(['', '', '', '']);
 const inputRefs = useRef([]);

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

   <TouchableOpacity
    onPress={() => navigation?.navigate('TrialAccessScreen')}
    style={Styles.verifyButton}>
    <Text allowFontScaling={false} style={Styles.verifyText}>
     Verify
    </Text>
   </TouchableOpacity>
  </SafeAreaView>
 );
}
