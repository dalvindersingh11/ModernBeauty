import React from 'react';
import { View, Text, SafeAreaView, TextInput } from 'react-native';

import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';

const AddTicket = () => {
 const navigation = useNavigation();

 return (
  <SafeAreaView style={Styles.safeArea}>
   <View style={Styles.container}>
    <Text allowFontScaling style={Styles.title}>
     Add Ticket
    </Text>
    {/* <View style={Styles.emptySpace} />
        </View> */}

    {/* Subject */}
    <Text allowFontScaling style={Styles.label}>
     Subject
    </Text>
    <TextInput placeholder="Enter subject" style={Styles.inputBox} />

    {/* Message */}
    <Text allowFontScaling style={Styles.label}>
     Message
    </Text>
    <View style={Styles.messageBox}>
     <TextInput placeholder="Enter message" multiline />
    </View>
   </View>
  </SafeAreaView>
 );
};

export default AddTicket;
