import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  APP_LOGO,
  BACKICON,
  HELPPLUS,
  USER
} from '../../Constant/Icons';
import colors from '../../Constant/colors';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';

const HelpSupport = () => {
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

          <Text allowFontScaling={true} style={Styles.headerTitle}>
            Help & Support
          </Text>

          <TouchableOpacity onPress={() => navigation?.navigate('AddTicket')}>
            <Image source={HELPPLUS} style={Styles.helpPlusIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* No ticket message */}
      <View style={Styles.noTicketContainer}>
        <Text allowFontScaling={true} style={Styles.noTicketText}>
          No Ticket Found
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HelpSupport;
