import React, { useState } from 'react';
import {
 View,
 Text,
 TextInput,
 TouchableOpacity,
 Image,
 ScrollView,
 SafeAreaView
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import colors from '../../Constant/colors';
import { EXPORTICON, REPLY } from '../../Constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TicketReply = () => {
 const route = useRoute();
 const { ticket } = route.params;

 const [reply, setReply] = useState('');
 const [loading, setLoading] = useState(false);

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
    alert('Reply sent successfully!');
    setReply('');
   }
  } catch (error) {
 console.error('Reply API error:', error?.response?.data || error.message);
 alert('Something went wrong while sending reply.');
} finally {
   setLoading(false);
  }
 };

 return (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgrounColor }}>
   <ScrollView contentContainerStyle={{ padding: 16 }}>
    {/* Ticket Card */}
    <View style={{
     backgroundColor: '#544C4C',
     borderRadius: 12,
     overflow: 'hidden',
     marginBottom: 20,
     elevation: 3
    }}>
     {/* <View style={{ height: 6, backgroundColor: '#544C4C' }} /> */}
     <View style={{ padding: 14, gap: 10 }}>
      <View style={{
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center'
      }}>
       <Text style={{
        fontSize: 15,
        fontWeight: '600',
        color: '#000'
       }}>
        {ticket.subject}{' '}
        <Text style={{ fontWeight: '700' }}>#{ticket.id}</Text>
       </Text>
       <TouchableOpacity>
        <Image source={EXPORTICON} style={{ width: 16, height: 9, tintColor: '#000' }} />
       </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 13, color: '#333' }}>
       Status:{' '}
       {ticket.status.replace(/^./, ticket.status[0].toUpperCase())}
      </Text>

      <Text style={{ fontSize: 13, color: '#333', lineHeight: 20 }}>
       {ticket.message}
      </Text>
     </View>
    </View>

    {/* Previous Replies */}
    {ticket.replies && ticket.replies.length > 0 && (
     <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 15, fontWeight: '600', marginBottom: 10 }}>
       Previous Replies:
      </Text>
      {ticket.replies.map((replyItem, index) => (
       <View key={index} style={{
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 10,
        marginBottom: 8
       }}>
        <Text style={{ fontSize: 13, color: '#000' }}>
         {replyItem.reply}
        </Text>
        <Text style={{ fontSize: 11, color: '#777', marginTop: 4 }}>
         {replyItem.created_at}
        </Text>
       </View>
      ))}
     </View>
    )}

    {/* Reply Input */}
    <View style={{
     backgroundColor: '#fff',
     padding: 12,
     borderRadius: 16,
     borderWidth: 1.2,
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
    fontSize: 14,
    color: '#000',
    textAlignVertical: 'top',
    maxHeight: 100
  }}
/>
    

  <Text style={{ fontSize: 11, color: '#888',alignSelf:'flex-end' }}>
    {`${100 - reply.length} Letters Left`}
  </Text>



    </View>
      <TouchableOpacity
    style={{
      backgroundColor: '#000',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,alignSelf:'flex-end',marginTop:20
    }}
    onPress={handleReply}
    disabled={loading}
  >
    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
      {loading ? 'Sending...' : 'Reply'}
    </Text>
  </TouchableOpacity>
   </ScrollView>
  </SafeAreaView>
 );
};

export default TicketReply;
