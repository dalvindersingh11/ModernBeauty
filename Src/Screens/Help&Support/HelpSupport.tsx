import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 SafeAreaView,
 FlatList,
 ActivityIndicator,
 Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
 APP_LOGO,
 BACKICON,
 HELPPLUS,
 REPLY,
 USER
} from '../../Constant/Icons';
import Styles from './Styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const HelpSupport = () => {
 const navigation = useNavigation();

 const [tickets, setTickets] = useState([]);
 const [loading, setLoading] = useState(false);

 // ✅ Auto fetch on screen load
useFocusEffect(
  React.useCallback(() => {
    fetchTickets();
  }, [])
);

 const fetchTickets = async () => {
  setLoading(true);
  try {
   const token = await AsyncStorage.getItem('token');

   const response = await fetch('https://api.addmelocal.in/api/tickets', {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json',
     Accept: 'application/json',
     Authorization: `Bearer ${token}`
    }
   });

   const data = await response.json();

   if (response.ok) {
    setTickets(data || []);
   } else {
    Alert.alert('Error', data?.message || 'Failed to fetch tickets');
    setTickets([]);
   }
  } catch (error) {
   Alert.alert('Error', 'Something went wrong: ' + error.message);
   setTickets([]);
  } finally {
   setLoading(false);
  }
 };

 const renderTicket = ({ item }) => {
  const replyCount = item?.replies?.length || 0;
  const latestReply = item?.replies?.[replyCount - 1]?.message;

  return (
   <View style={Styles.ticketContainer}>
    <View style={Styles.ticketRow}>
     <View style={Styles.statusBar} />
     <View style={Styles.ticketContent}>
      <View style={Styles.subjectRow}>
       <Text style={Styles.subjectLabel}>
        Sub: <Text style={Styles.subjectText}>{item?.subject}</Text>
       </Text>
       <View
        style={[
         Styles.statusBox,
         { backgroundColor: item.status === 'open' ? '#00A318' : '#FF0000' }
        ]}>
        <Text style={Styles.statusText}>
         {item.status.replace(/^./, item.status[0].toUpperCase())}
        </Text>
       </View>
      </View>

      <Text style={Styles.messageLabel}>Message :</Text>
      <Text style={Styles.messageText}>{item.message}</Text>

      {/* {replyCount > 0 && (
       <View style={{ marginTop: 8 }}>
        <Text style={Styles.messageLabel}>Latest Reply:</Text>
        <Text style={Styles.messageText}>{latestReply}</Text>
       </View>
      )} */}

      <View style={Styles.replyRow}>
       <View style={Styles.replyCountRow}>
        {/* ✅ Show actual reply count */}
        <Text>{replyCount}</Text>
        <TouchableOpacity>
         <Image source={REPLY} style={Styles.replyIcon} />
        </TouchableOpacity>
       </View>

       <TouchableOpacity
        onPress={() =>
         navigation.navigate('TicketReply', {
          ticket: item,
          onReplySuccess: fetchTickets // ✅ callback passed
         })
        }
        style={Styles.replyButton}>
        <Text style={Styles.replyButtonText}>Reply</Text>
       </TouchableOpacity>
      </View>
     </View>
    </View>
   </View>
  );
 };

 return (
  <SafeAreaView style={Styles.safeArea}>
   <View style={Styles.container}>
    {/* Header */}
    <View style={Styles.headerRow}>
     <TouchableOpacity style={Styles.helpPlusIcon}>
      {/* <Image source={BACKICON} style={Styles.backIcon} /> */}
     </TouchableOpacity>

     <Text allowFontScaling={true} style={Styles.headerTitle}>
      Help & Support
     </Text>

     <TouchableOpacity onPress={() => navigation?.navigate('AddTicket')}>
      <Image source={HELPPLUS} style={Styles.helpPlusIcon} />
     </TouchableOpacity>
    </View>

    {/* ❌ Removed Manual Get Button */}

    {/* Ticket List or Message */}
    {loading ? (
     <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
    ) : tickets.length === 0 ? (
     <View style={Styles.noTicketContainer}>
      <Text allowFontScaling={true} style={Styles.noTicketText}>
       No Ticket Found
      </Text>
     </View>
    ) : (
     <FlatList
      data={tickets}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderTicket}
      contentContainerStyle={{ paddingBottom: 16 }}
     />
    )}
   </View>
  </SafeAreaView>
 );
};

export default HelpSupport;
