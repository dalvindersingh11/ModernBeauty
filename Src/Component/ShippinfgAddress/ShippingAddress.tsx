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
import { CountryPicker } from 'react-native-country-codes-picker';
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
  <View style={{flex:1,width:'100%'}}>
        {/* <TopHeader backOnPress={() => navigation.goBack()} /> */}
   <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,width:'90%',alignSelf:'center'}} >
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
      Enter Shipping Details
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
       placeholder="Enter Username"
       style={[Styles.input]}
       placeholderTextColor={colors.gray}
      />
     </View>
 <View style={Styles.inputContainer}>
    <Text allowFontScaling={false} style={[Styles.label]}>
       Phone Number
      </Text>
     <View style={Styles.phoneInputWrapper}>
      <TouchableOpacity
       style={Styles.callingCodeBox}
       onPress={() => setShowCountryPicker(true)}>
       <Text style={Styles.callingCodeText}>+{callingCode}</Text>
      </TouchableOpacity>
      <TextInput
       style={Styles.phoneInput}
       placeholder="Phone number"
       keyboardType="phone-pad"
       onChangeText={(text) => setPhone(text)}
       value={phone}
      />
     </View>
     </View>

     {/* Country Picker for phone code */}
     {showCountryPicker && (
      <CountryPicker
       countryCode={countryCode}
       withFilter
       withFlag
       withCallingCode
       withEmoji
       onSelect={(selectedCountry) => {
        setCountryCode(selectedCountry.cca2);
        setCountry(selectedCountry);
        setCallingCode(selectedCountry.callingCode[0]);
        setShowCountryPicker(false);
       }}
       onClose={() => setShowCountryPicker(false)}
       visible
      />
     )}


     {/* <View style={Styles.inputContainer}>
      <Text allowFontScaling={false} style={[Styles.label]}>
       Phone Number
      </Text>
      <TextInput
       allowFontScaling={false}
       placeholder="+1"
       style={[Styles.input]}
       placeholderTextColor={colors.gray}
      />
     </View> */}
     <View style={Styles.inputContainer}>
      <View style={[Styles.viewInput]}>
       <Dropdown
        style={[Styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={Styles.placeholderStyle}
        selectedTextStyle={Styles.selectedTextStyle}
        inputSearchStyle={Styles.inputSearchStyle}
        iconStyle={Styles.iconStyle}
        data={data}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Province' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
         setValue(item.value);
         setIsFocus(false);
        }}
       />
      </View>
     </View>
     <View style={Styles.inputContainer}>
      <View style={[Styles.viewInput]}>
       <Dropdown
        style={[Styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={Styles.placeholderStyle}
        selectedTextStyle={Styles.selectedTextStyle}
        inputSearchStyle={Styles.inputSearchStyle}
        iconStyle={Styles.iconStyle}
        data={data}
        maxHeight={moderateScale(200)}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select City' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
         setValue(item.value);
         setIsFocus(false);
        }}
       />
      </View>
     </View>
     <View style={Styles.inputContainer}>
      <Text allowFontScaling={false} style={[Styles.label]}>
       Street Address*
      </Text>
      <TextInput
       allowFontScaling={false}
       placeholder="Enter  Street Address"
       style={[Styles.input]}
       placeholderTextColor={colors.gray}
      />
     </View>
     <View style={Styles.inputContainer}>
      <Text allowFontScaling={false} style={[Styles.label]}>
       Postal Code*
      </Text>
      <TextInput
       allowFontScaling={false}
       placeholder="Enter  Postal Code"
       style={[Styles.input]}
       placeholderTextColor={colors.gray}
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
   </ScrollView>
  </View>
 );
}

const renderLabel = (
 label:
  | string
  | number
  | bigint
  | boolean
  | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
  | Iterable<React.ReactNode>
  | Promise<
     | string
     | number
     | bigint
     | boolean
     | React.ReactPortal
     | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
     | Iterable<React.ReactNode>
     | null
     | undefined
    >
  | null
  | undefined
) => (
 <Text allowFontScaling={false} style={{marginBottom:5}}>
  {label}
 </Text>
);