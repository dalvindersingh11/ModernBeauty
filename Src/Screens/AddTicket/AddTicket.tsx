import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput
} from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import {
  APP_LOGO,
  BACKICON,
  USER
} from '../../Constant/Icons';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';

const AddTicket = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={Styles.safeArea}>
      <View style={Styles.container}>

        {/* Top branding */}
        <View style={Styles.brandingRow}>
          <Image style={Styles.appLogo} source={APP_LOGO} />
          <Image source={USER} style={Styles.userIcon} />
        </View>

        {/* Header */}
        <View style={Styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BACKICON} style={Styles.backIcon} />
          </TouchableOpacity>

          <Text allowFontScaling style={Styles.title}>Add Ticket</Text>
          <View style={Styles.emptySpace} />
        </View>

        {/* Subject */}
        <Text allowFontScaling style={Styles.label}>Subject</Text>
        <View style={Styles.inputBox}>
          <TextInput placeholder="Enter subject" />
        </View>

        {/* Message */}
        <Text allowFontScaling style={Styles.label}>Message</Text>
        <View style={Styles.messageBox}>
          <TextInput placeholder="Enter message" multiline />
        </View>

      </View>
    </SafeAreaView>
  );
};

export default AddTicket;
