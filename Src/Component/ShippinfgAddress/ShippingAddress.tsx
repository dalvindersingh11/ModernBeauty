// TrialAccessScreen.tsx

import React, { useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 TextInput,
 SafeAreaView,
 ScrollView
} from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import { APP_LOGO, BACKICON, USER } from '../../Constant/Icons';
import colors from '../../Constant/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from './Styles';
import TopHeader from '../TopHeader/TopHeader';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
export default function ShippingAddress(props: any) {
 const [playVideo, setPlayVideo] = useState(false);
 const navigation = useNavigation<any>();
 const [value, setValue] = useState(null);
 const [phone, setPhone] = useState('');
 const [isFocus, setIsFocus] = useState(false);
 const [countryCode, setCountryCode] = useState('IN');
 const [country, setCountry] = useState(null);
 const [showCountryPicker, setShowCountryPicker] = useState(false);
 const [callingCode, setCallingCode] = useState('91');
 const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' }
 ];
 return (
  <View style={{ flex: 1, width: '100%' }}>
   <TopHeader backOnPress={() => navigation.goBack()} />

   <ScrollView
    showsVerticalScrollIndicator={false}
    style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
    <View style={[Styles.container, { padding: 0 }]}>
     {/* Top branding */}

     <Text style={Styles.checkoutText}>Checkout</Text>
     <View style={Styles.stepContainer}>
      <View style={Styles.step}>
       <Icon name="local-shipping" size={20} />
       <Text style={Styles.stepLabel}>Shipping</Text>
      </View>
      <View style={Styles.separator} />
      <View style={Styles.step}>
       <Icon name="payment" size={20} />
       <Text style={Styles.stepLabel}>Payment</Text>
      </View>
      <View style={Styles.separator} />
      <View style={Styles.step}>
       <Icon name="assignment" size={20} />
       <Text style={Styles.stepLabel}>Review</Text>
      </View>
     </View>
     <Text allowFontScaling={true} style={Styles.title}>
      Enter Billing Details
     </Text>
     {/* <View style={{ height: 90 }} /> */}
     <View style={Styles.inputContainer}>
      <Text
       allowFontScaling={false}
       style={[Styles.label, { marginTop: '5%' }]}>
       FullName
      </Text>
      <TextInput
       allowFontScaling={false}
       placeholder="Enter name"
       style={[Styles.input]}
       placeholderTextColor={colors.gray}
       onChangeText={props?.onChangeUserName}
      />
     </View>
     <View style={Styles.inputContainer}>
      <Text allowFontScaling={false} style={[Styles.label]}>
       Phone Number
      </Text>

      <View style={Styles.phoneInputWrapper}>
       {/* Touchable for Country Code */}
       <TouchableOpacity
        style={Styles.callingCodeBox}
        onPress={props?.openPicker}>
        <Text style={Styles.callingCodeText}>
         {props?.callingCode ? `+${props?.callingCode}` : '+91'}
        </Text>
       </TouchableOpacity>

       {/* Country Picker Modal */}
       {props?.visible && (
        <CountryPicker
         withFilter
         withCallingCode
         withFlag
         withFlagButton={false}
         withEmoji={false}
         visible
         onClose={props?.onClose}
         onSelect={props?.onSelect}
         countryCode={props?.countryCode}
        />
       )}

       {/* Phone Number Input */}
       <TextInput
        style={Styles.phoneInput}
        placeholder="Phone number"
        keyboardType="phone-pad"
        onChangeText={props?.onChangePhoneNumber}
        value={props?.phone}
       />
      </View>
     </View>

     <View style={Styles.inputContainer}>
      <Text allowFontScaling={false} style={[Styles.label]}>
       Country*
      </Text>
      <TextInput
       allowFontScaling={false}
       placeholder="Enter Country"
       style={[Styles.input]}
       placeholderTextColor={colors.gray}
       onChangeText={props?.onChangeCountry}
      />
     </View>
     <View style={Styles.inputContainer}>
      <Text allowFontScaling={false} style={[Styles.label]}>
       State*
      </Text>
      <TextInput
       allowFontScaling={false}
       placeholder="Enter State"
       style={[Styles.input]}
       placeholderTextColor={colors.gray}
       onChangeText={props?.onChangeState}
      />
     </View>
     <View style={Styles.inputContainer}>
      <Text allowFontScaling={false} style={[Styles.label]}>
       City*
      </Text>
      <TextInput
       allowFontScaling={false}
       placeholder="Enter City"
       style={[Styles.input]}
       placeholderTextColor={colors.gray}
       onChangeText={props?.onChangeCity}
      />
     </View>
     {/* <View style={Styles.inputContainer}>
      <Text allowFontScaling={false} style={[Styles.label]}>
       Street Address*
      </Text>
      <TextInput
       allowFontScaling={false}
       placeholder="Enter  Street Address"
       style={[Styles.input]}
       placeholderTextColor={colors.gray}
       onChangeText={props?.onChangeStreet}
      />
     </View> */}
     <View style={Styles.inputContainer}>
      <Text allowFontScaling={false} style={[Styles.label]}>
       Postal Code*
      </Text>
      <TextInput
       allowFontScaling={false}
       placeholder="Enter  Postal Code"
       style={[Styles.input]}
       placeholderTextColor={colors.gray}
       onChangeText={props?.onChangeCode}
      />
     </View>
     <TouchableOpacity
      onPress={props?.onPressFirstStep}
      style={Styles.levelButton}>
      <Text allowFontScaling={false} style={Styles.levelText}>
       Confirm
      </Text>
     </TouchableOpacity>
    </View>
    <View style={{ height: moderateScale(18) }} />
   </ScrollView>
  </View>
 );
}
