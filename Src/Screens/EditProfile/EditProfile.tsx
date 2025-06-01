import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 SafeAreaView,
 StyleSheet,
 TextInput,
 Platform,
 Alert,
 ActivityIndicator,
 ScrollView
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CountryPicker from 'react-native-country-picker-modal';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import {
 APP_LOGO,
 BACKICON,
 DROPDOWNICON,
 EDITPROFILEICON,
 SAMPLEIMAGE,
 USER
} from '../../Constant/Icons';
import colors from '../../Constant/colors';
import { useNavigation } from '@react-navigation/native';
import Styles from './Styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../Constant/apiUrl';

const EditProfile = () => {
 const navigation = useNavigation();

 const [date, setDate] = useState(new Date());
 const [callingCode, setCallingCode] = useState('91'); 
 const [showDatePicker, setShowDatePicker] = useState(false);
 const [name, setName] = useState('');
 const [phone, setPhone] = useState('');
 const [gender, setGender] = useState('');
 const [loading, setLoading] = useState(false);
 const [countryCode, setCountryCode] = useState('US');
 const [country, setCountry] = useState(null);
 const [showCountryPicker, setShowCountryPicker] = useState(false);
 

 const handleConfirmDate = (selectedDate: React.SetStateAction<Date>) => {
  if (selectedDate) {
   setDate(selectedDate);
  }
  setShowDatePicker(false);
 };
 const handGetProfile = async () => {
  setLoading(true);
  let token = await AsyncStorage?.getItem('token');
  console.log('token', token);
  try {
   const response = await axios.get(
    `${BASE_URL}profile`,

    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer${token}`
     }
    }
   );

   console.log('getProfile Success:', response.data);
  } catch (error: any) {
   console.error('Something went wrong');
   Alert.alert('Something went wrong');
  } finally {
   setLoading(false);
  }
 };
 //  useEffect(() => {
 //   handGetProfile();
 //  }, []);
 const handleUpdateProfile = async () => {
  let token = await AsyncStorage?.getItem('token');
  if (!name || !phone || !gender) {
   Alert.alert('Validation', 'Email and password are required');
   return;
  }

  setLoading(true);
  try {
   const response = await axios.post(
    `${BASE_URL}update-profile-picture`,
    {
     name,
     phone,
     gender
    },
    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer${token}`
     }
    }
   );

   console.log('updateProfile', response);
  } catch (error: any) {
   console.error('Login Error:', error.response?.data || error.message);
   Alert.alert('Something went wrong');
  } finally {
   setLoading(false);
  }
 };
 return (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgrounColor }}>
   <ScrollView>
    <View style={Styles.contentWrapper}>
     {/* Header */}
     {/* <View style={Styles.header}>
      <Image style={Styles.logo} source={APP_LOGO} />
      <Image source={USER} style={Styles.userAvatar} />
     </View> */}

     {/* Avatar */}
     <View style={Styles.avatarRow}>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
       <Image source={BACKICON} style={Styles.backIcon} />
      </TouchableOpacity> */}
      <View style={Styles.avatarWrapper}>
       <View style={Styles.avatarInner}>
        <Image source={SAMPLEIMAGE} style={Styles.avatarImage} />
       </View>
       <TouchableOpacity style={Styles.editIcon}>
        <Image source={EDITPROFILEICON} style={Styles.editIconImage} />
       </TouchableOpacity>
      </View>
      {/* <View style={{ width: ms(18), height: mvs(16) }} /> */}
     </View>

     {/* Input Fields */}
     {renderLabel('Name')}
      <TextInput
       style={Styles.inputBox}
       placeholder="Enter name"
       onChangeText={(text) => setName(text)}
      />

     {renderLabel('Email')}
      <TextInput
       style={Styles.inputBox}
       placeholder="Enter email"
       autoCapitalize='none'
       // editable={false}
      />

     {renderLabel('Gender')}
      <TextInput
       style={Styles.inputBox}
       placeholder="Gender"
       onChangeText={(text) => setGender(text)}
      />

     {/* {renderLabel('Date of birth')}
    <TouchableOpacity
     onPress={() => setShowDatePicker(true)}
     style={Styles.dropdownBox}>
     <Text>{date.toDateString()}</Text>
     <Image style={Styles.dropdownIcon} source={DROPDOWNICON} />
    </TouchableOpacity>

    {/* Date Picker Modal */}

   {renderLabel('Phone')}
<View style={Styles.phoneInputWrapper}>
  <TouchableOpacity
    style={Styles.callingCodeBox}
    onPress={() => setShowCountryPicker(true)}
  >
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


     <DateTimePickerModal
      isVisible={showDatePicker}
      mode="date"
      onConfirm={handleConfirmDate}
      onCancel={() => setShowDatePicker(false)}
      maximumDate={new Date()}
      display="spinner"
      locale="en_US"
      pickerContainerStyleIOS={{ backgroundColor: '#fff' }}
     />

     {renderLabel('Country/Region')}
     <TouchableOpacity
      onPress={() => setShowCountryPicker(true)}
      style={Styles.dropdownBox}>
      <Text>{country?.name || 'Select country'}</Text>
      <Image style={Styles.dropdownIcon} source={DROPDOWNICON} />
     </TouchableOpacity>

     {showCountryPicker && (
      <CountryPicker
       countryCode={countryCode}
       withFilter
       withFlag
       withCountryNameButton={false}
       withAlphaFilter
       withCallingCodeButton={false}
       withEmoji
       onSelect={(selectedCountry) => {
        setCountryCode(selectedCountry.cca2);
        setCountry(selectedCountry);
        setShowCountryPicker(false);
       }}
       onClose={() => setShowCountryPicker(false)}
       visible
      />
     )}
     <TouchableOpacity
      disabled={loading}
      onPress={() => handleUpdateProfile()}
      style={Styles.loginButton}>
      {loading ? (
       <ActivityIndicator size={20} color={colors.white} />
      ) : (
       <Text allowFontScaling={false} style={Styles.loginText}>
        Submit
       </Text>
      )}
     </TouchableOpacity>
    </View>
   </ScrollView>
  </SafeAreaView>
 );
};

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
 <Text allowFontScaling={true} style={Styles.label}>
  {label}
 </Text>
);

export default EditProfile;
