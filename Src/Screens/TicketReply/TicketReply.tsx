import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 TextInput,
 TouchableOpacity,
 Image,
 ScrollView,
 SafeAreaView,
 Alert,
 BackHandler
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import colors from '../../Constant/colors';
import { EXPORTICON, REPLY } from '../../Constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fonts from '../../Constant/Fonts';

const TicketReply = () => {
 const route = useRoute();
 const { ticket } = route.params;

 const [reply, setReply] = useState('');
 const [loading, setLoading] = useState(false);
 const navigation = useNavigation();
 useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
   navigation.goBack(); // Go back to the previous screen
   return true; // Prevent default behavior (exit app)
  });

  return () => backHandler.remove(); // Clean up the event on unmount
 }, []);
 const handleReply = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!reply.trim()) return;

  try {
   setLoading(true);
   const response = await axios.post(
    `https://api.addmelocal.in/api/tickets/${ticket.id}/reply`,
    { message: reply },
    {
     headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
     }
    }
   );

   if (response.status === 200) {
    Alert.alert('Reply sent successfully!');
    route.params?.onReplySuccess;
    setReply('');
    navigation.goBack();
   }
  } catch (error) {
   console.error('Reply API error:', error?.response?.data || error.message);
   alert('Something went wrong while sending reply.');
  } finally {
   setLoading(false);
  }
 };
 console.log('ticket', ticket);
 return (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgrounColor }}>
   <ScrollView contentContainerStyle={{ padding: 16 }}>
    {/* Ticket Card */}
    <View
     style={{
      backgroundColor: '#544C4C',
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 20,
      elevation: 3
     }}>
     {/* <View style={{ height: 6, backgroundColor: '#544C4C' }} /> */}
     <View style={{ padding: 14, gap: 10 }}>
      <View
       style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
       }}>
       <Text
        style={{
         fontSize: 15,
         color: colors.white,
         fontFamily: fonts.bold
        }}>
        {ticket.subject}{' '}
        {/* <Text style={{ fontWeight: '700', color: '#fff' }}>#{ticket.id}</Text> */}
       </Text>
       <TouchableOpacity>
        <Image
         source={EXPORTICON}
         style={{ width: 16, height: 9, tintColor: '#fff' }}
        />
       </TouchableOpacity>
      </View>

      {/* <Text style={{      fontSize: 11,
          color: colors.white,
          fontFamily: fonts.regular}}>
       Status: {ticket.status.replace(/^./, ticket.status[0].toUpperCase())}
      </Text> */}

      <Text
       style={{
        fontSize: 11,
        color: colors.white,
        fontFamily: fonts.regular,
        lineHeight: 20
       }}>
       {ticket.message}
      </Text>
     </View>
    </View>

    {/* Your Replies */}
    {ticket?.replies && ticket.replies.length > 0 && (
     <View style={{}}>
      <Text
       style={{
        fontSize: 15,
        color: colors.black,
        fontFamily: fonts.bold,
        marginBottom: 10
       }}>
       Your Replies:
      </Text>
      {ticket.replies.map((replyItem, index) => (
       <View
        key={index}
        style={{
         backgroundColor: '#f5f5f5',
         padding: 10,
         borderRadius: 10,
         marginBottom: 8
        }}>
        <Text
         style={{
          fontSize: 11,
          color: colors.black,
          fontFamily: fonts.regular
         }}>
         {replyItem.message}
        </Text>
        <Text
         style={{
          fontSize: 6,
          color: colors.black,
          fontFamily: fonts.regular,
          marginTop: 4
         }}>
         {replyItem.created_at}
        </Text>
       </View>
      ))}
     </View>
    )}

    {/* Reply Input */}
    <View
     style={{
      backgroundColor: '#fff',
      padding: 12,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#000',
      minHeight: 130,
      justifyContent: 'space-between',
      marginTop: 20
     }}>
     <TextInput
      value={reply}
      onChangeText={(text) => {
       if (text.length <= 100) {
        setReply(text);
       }
      }}
      placeholder="Write your reply here"
      placeholderTextColor="#999"
      multiline
      style={{
       fontSize: 11,
       color: colors.black,
       fontFamily: fonts.regular,
       textAlignVertical: 'top',
       flex: 1
       //  maxHeight: 100
      }}
     />

     <Text style={{ fontSize: 11, color: '#888', alignSelf: 'flex-end' }}>
      {`${100 - reply.length} Letters Left`}
     </Text>
    </View>
    <TouchableOpacity
     style={{
      backgroundColor: '#000',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      alignSelf: 'flex-end',
      marginTop: 20
     }}
     onPress={handleReply}
     disabled={loading}>
     <Text
      style={{ fontSize: 11, color: colors.white, fontFamily: fonts.medium }}>
      {loading ? 'Sending...' : 'Reply'}
     </Text>
    </TouchableOpacity>
   </ScrollView>
  </SafeAreaView>
 );
};

export default TicketReply;
