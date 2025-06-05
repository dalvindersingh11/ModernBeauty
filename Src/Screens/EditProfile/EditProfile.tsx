import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 SafeAreaView,
 TextInput,
 Alert,
 ActivityIndicator,
 ScrollView
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CountryPicker from 'react-native-country-picker-modal';
import {
 DROPDOWNICON,
 EDITPROFILEICON,
 SAMPLEIMAGE
} from '../../Constant/Icons';
import colors from '../../Constant/colors';
import { useNavigation } from '@react-navigation/native';
import Styles from './Styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, IMAGE_URL } from '../../Constant/apiUrl';
import ImagePicker from 'react-native-image-crop-picker';
import { showToast } from '../../Constant/showToast';
import { Dropdown } from 'react-native-element-dropdown';

const EditProfile = () => {
 const navigation = useNavigation();

 const [date, setDate] = useState(new Date());
 const [callingCode, setCallingCode] = useState('91');
 const [showDatePicker, setShowDatePicker] = useState(false);
 const [name, setName] = useState('');
 const [phone, setPhone] = useState('');
 const [gender, setGender] = useState('');
 const [userInfo, setUserInfo] = useState('');
 const [email, setEmail] = useState('');
 const [value, setValue] = useState(null);
 const [isFocus, setIsFocus] = useState(false);
 const [image, setImage] = useState('');
 const [loading, setLoading] = useState(false);
 const [countryCode, setCountryCode] = useState('');
 const [country, setCountry] = useState(null);
 const [showCountryPicker, setShowCountryPicker] = useState(false);
 const [user, setUser] = useState<any>(null);
 const data = [
  { label: 'male', value: '1' },
  { label: 'female', value: '2' }
 ];
 useEffect(() => {
  const loadUser = async () => {
   try {
    const jsonValue = await AsyncStorage.getItem('user');
    if (jsonValue != null) {
     setUser(JSON.parse(jsonValue));
     console.log('hjfdhjf', user);
    }
   } catch (e) {
    console.error('Failed to load user:', e);
   }
  };

  loadUser();
 }, []);
 const showMediaPicker = () => {
  Alert.alert(
   'Upload Media',
   'Choose an option',
   [
    {
     text: 'Open Gallery',
     onPress: () => {
      ImagePicker.openPicker({
       mediaType: 'photo'
      })
       .then((image) => {
        console.log('Picked image:', image);
        setImage(image?.path);
        handleProfileImage(image?.path);
       })
       .catch((error) => {
        console.log('Video picking cancelled or failed:', error);
       });
     }
    },
    {
     text: 'Take Photo',
     onPress: () => {
      ImagePicker.openCamera({
       width: 300,
       height: 400,
       cropping: true
      })
       .then((image) => {
        console.log('Captured image:', image);
        setImage(image?.path);
        handleProfileImage(image?.path);
       })
       .catch((error) => {
        console.log('Camera cancelled or failed:', error);
       });
     }
    },
    {
     text: 'Cancel',
     style: 'cancel'
    }
   ],
   { cancelable: true }
  );
 };
 const handleConfirmDate = (selectedDate: React.SetStateAction<Date>) => {
  if (selectedDate) {
   setDate(selectedDate);
  }
  setShowDatePicker(false);
 };
 const handGetProfile = async () => {
  try {
   const token = await AsyncStorage.getItem('token');
   console.log('Token:', token);

   const response = await fetch(BASE_URL + 'profile', {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${token}` // ✅ Space after "Bearer"
    }
   });

   if (!response.ok) {
    throw new Error('Failed to fetch profile');
   }

   const data = await response.json();
   setUserInfo(data?.data);
   setPhone(data?.data?.phone);
   setImage(data?.data?.image);
   setGender(data?.data.gender);
   setEmail(data?.data?.email);
   setName(data?.data?.name);
   console.log('Profile Data:', data);
  } catch (error) {
   console.error('Error fetching profile:', error);
   // showToast('Something went wrong'); // Optional
  }
 };
 useEffect(() => {
  handGetProfile();
  console.log('hjfdhjf', user);
 }, []);
 const handleUpdateProfile = async () => {
  console.log('params', name, phone, gender);
  let token = await AsyncStorage?.getItem('token');
  if (!name || !phone || !gender || !email) {
   showToast('All Fields are required');
   return;
  }

  setLoading(true);
  try {
   const response = await axios.put(
    `${BASE_URL}update-profile`,
    {
     email: email,
     password: user?.password,
     name,
     phone: `+${countryCode ? countryCode : '91'}${phone}`,
     gender
    },
    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
     }
    }
   );

   console.log('response', response);
  } catch (error: any) {
   console.error('Error:', error.response?.data || error.message);
   showToast('Something went wrong');
  } finally {
   setLoading(false);
  }
 };
 const handleProfileImage = async (image: any) => {
  console.log('params', image);
  let token = await AsyncStorage?.getItem('token');
  if (!image) {
   showToast('image is required');
   return;
  }

  setLoading(true);
  try {
   const response = await axios.post(
    `${BASE_URL}update-profile-picture`,
    {
     image: image
    },
    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
     }
    }
   );

   console.log('response', response);
   handGetProfile();
  } catch (error: any) {
   console.error('Error:', error.response?.data || error.message);
   showToast('Something went wrong');
  } finally {
   setLoading(false);
   handGetProfile();
  }
 };
 const handleCountrySelect = (selectedCountry: { callingCode: any[] }) => {
  // Safe assignment
  const codes = selectedCountry?.callingCode?.map((item) => `+${item}`);
  setCountryCode(codes[0]);
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
        {image == '' ? (
         <Image source={SAMPLEIMAGE} style={Styles.avatarImage} />
        ) : (
         <Image
          source={{ uri: IMAGE_URL + image }}
          style={Styles.avatarImage}
         />
        )}
       </View>
       <TouchableOpacity onPress={showMediaPicker} style={Styles.editIcon}>
        <Image source={EDITPROFILEICON} style={Styles.editIconImage} />
       </TouchableOpacity>
      </View>
      {/* <View style={{ width: ms(18), height: mvs(16) }} /> */}
     </View>

     {/* Input Fields */}
     {renderLabel('Name')}
     <TextInput
      style={Styles.inputBox}
      value={name}
      placeholder="Enter name"
      onChangeText={(text) => setName(text)}
     />

     {renderLabel('Email')}
     <TextInput
      style={Styles.inputBox}
      value={email}
      placeholder="Enter email"
      autoCapitalize="none"
      // editable={false}
      onChangeText={(text) => setEmail(text)}
     />

     {renderLabel('Gender')}
     <View style={Styles.inputBox}>
      <Dropdown
       style={[Styles.dropdown]}
       placeholderStyle={Styles.placeholderStyle}
       selectedTextStyle={Styles.selectedTextStyle}
       inputSearchStyle={Styles.inputSearchStyle}
       iconStyle={Styles.iconStyle}
       data={data}
       maxHeight={150}
       labelField="label"
       valueField="value"
       placeholder={!isFocus ? 'Gender' : '...'}
       value={gender}
       onFocus={() => setIsFocus(true)}
       onBlur={() => setIsFocus(false)}
       onChange={(item) => {
        setGender(item.value);
        setIsFocus(false);
       }}
      />
     </View>

     {renderLabel('Phone')}
     <View style={Styles.phoneInputWrapper}>
      <TouchableOpacity
       style={Styles.callingCodeBox}
       onPress={() => setShowCountryPicker(true)}>
       <Text style={Styles.callingCodeText}>+{callingCode}</Text>
      </TouchableOpacity>
      <TextInput
       style={Styles.phoneInput}
       value={phone}
       placeholder="Phone number"
       keyboardType="phone-pad"
       onChangeText={(text) => setPhone(text)}
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
        console.log('selectedCountry', selectedCountry);
        handleCountrySelect(selectedCountry);
        // setCountry(selectedCountry);
        // setCallingCode(selectedCountry.callingCode);
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
      disabled={false}
      // onPress={() => setShowCountryPicker(true)}
      style={Styles.dropdownBox}>
      <Text>{country?.name || 'Select country'}</Text>
      <Image style={Styles.dropdownIcon} source={DROPDOWNICON} />
     </TouchableOpacity>

     {/* {showCountryPicker && (
      <CountryPicker
       countryCode={countryCode}
       withFilter
       withFlag
       withCountryNameButton={false}
       withAlphaFilter
       withCallingCodeButton={false}
       withEmoji
       onSelect={(selectedCountry) => {
        // setCountryCode(selectedCountry.cca2);
        setCountry(selectedCountry);
        setShowCountryPicker(false);
       }}
       onClose={() => setShowCountryPicker(false)}
       visible
      />
     )} */}
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
