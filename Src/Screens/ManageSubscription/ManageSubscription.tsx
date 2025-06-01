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
  USER,
} from '../../Constant/Icons';
import Styles from './Styles';
import { useNavigation } from '@react-navigation/native';

const ManageSubscription = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={Styles.safeArea}>
      <View style={Styles.container}>


        {/* Header */}
        {/* <View style={Styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BACKICON} style={Styles.backIcon} />
          </TouchableOpacity> */}

          <Text allowFontScaling={true} style={Styles.headerTitle}>
            My Subscription
          </Text>

          {/* <View style={Styles.spacer} />
        </View> */}

        {/* Subscription Info */}
        <View style={Styles.subscriptionRow}>
          <View style={Styles.subscriptionInfo}>
            <Text allowFontScaling={true} style={Styles.purchaseDate}>
              Purchased on 21 Apr 2025
            </Text>
            <View style={Styles.priceRow}>
              <Text allowFontScaling={true} style={Styles.price}>
                $500
              </Text>
              <Text allowFontScaling={true} style={Styles.perMonth}>
                per month
              </Text>
            </View>
          </View>

          <TouchableOpacity style={Styles.manageBtn}>
            <Text style={Styles.manageBtnText}>Manage Subscription</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageSubscription;
