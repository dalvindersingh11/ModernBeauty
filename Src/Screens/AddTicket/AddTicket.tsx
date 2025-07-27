import React, { useState } from 'react';
import {
 View,
 Text,
 SafeAreaView,
 TextInput,
 TouchableOpacity,
 Alert,
 ActivityIndicator
} from 'react-native';

import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTicket = () => {
 const navigation = useNavigation();

 const [subject, setSubject] = useState('');
 const [message, setMessage] = useState('');
 const [loading, setLoading] = useState(false);

 const handleSubmit = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!subject.trim() || !message.trim()) {
   Alert.alert('Error', 'Please fill all fields');
   return;
  }

  try {
   setLoading(true);

  const response = await fetch('https://api.addmelocal.in/api/store-message',{
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
    Alert.alert('Success', 'Ticket submitted successfully');
    setSubject('');
    setMessage('');
    navigation.goBack();
   } else {
    console.log('Server Error:', data);
    Alert.alert('Error', data?.message || 'Failed to submit ticket');
   }
  } catch (error) {
   console.error('API Error:', error);
   Alert.alert('Error', 'Something went wrong: ' + error?.message);
  } finally {
   setLoading(false);
  }
 };

 return (
  <SafeAreaView style={Styles.safeArea}>
   <View style={Styles.container}>
    <Text allowFontScaling style={Styles.title}>
     Add Ticket
    </Text>

    {/* Subject */}
    <Text allowFontScaling style={Styles.label}>
     Subject
    </Text>
    <TextInput
     placeholder="Enter subject"
     style={Styles.inputBox}
     value={subject}
     onChangeText={setSubject}
    />

    {/* Message */}
    <Text allowFontScaling style={Styles.label}>
     Message
    </Text>
    <View style={Styles.messageBox}>
     <TextInput
      placeholder="Enter message"
      multiline
      style={{ flex: 1, textAlignVertical: 'top' }}
      value={message}
      onChangeText={setMessage}
     />
    </View>

    <TouchableOpacity
     onPress={handleSubmit}
     style={[Styles.bottomButton, { opacity: loading ? 0.7 : 1 }]}
     disabled={loading}>
     {loading ? (
      <ActivityIndicator color="#fff" />
     ) : (
      <Text style={Styles.buttonText}>Submit</Text>
     )}
    </TouchableOpacity>
   </View>
  </SafeAreaView>
 );
};

export default AddTicket;
