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
import { BASE_URL } from '../../Constant/apiUrl';
import ImagePicker from 'react-native-image-crop-picker';
import { showToast } from '../../Constant/showToast';
const EditProfile = () => {
 const navigation = useNavigation();

 const [date, setDate] = useState(new Date());
 const [callingCode, setCallingCode] = useState('91');
 const [showDatePicker, setShowDatePicker] = useState(false);
 const [name, setName] = useState('');
 const [phone, setPhone] = useState('');
 const [gender, setGender] = useState('');
 const [image, setImage] = useState('');
 const [loading, setLoading] = useState(false);
 const [countryCode, selectedCountry] = useState('US');
 const [country, setCountry] = useState(null);
 const [showCountryPicker, setShowCountryPicker] = useState(false);
 const [user, setUser] = useState<any>(null);

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
   showToast('Something went wrong');
  } finally {
   console.log('kl');
  }
 };
 //  useEffect(() => {
 //   handGetProfile();
 //   console.log('hjfdhjf', user);
 //  }, []);
 const handleUpdateProfile = async () => {
  console.log('params', name, phone, gender);
  let token = await AsyncStorage?.getItem('token');
  if (!name || !phone || !gender) {
   showToast('All Fields are required');
   return;
  }

  setLoading(true);
  try {
   const response = await axios.put(
    `${BASE_URL}update-profile`,
    {
     email: user?.email,
     password: user?.password,
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
      Authorization: `Bearer${token}`
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
         <Image source={{ uri: image }} style={Styles.avatarImage} />
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
      placeholder="Enter name"
      onChangeText={(text) => setName(text)}
     />

     {renderLabel('Email')}
     <TextInput
      style={Styles.inputBox}
      value={user?.email}
      placeholder="Enter email"
      autoCapitalize="none"
      editable={false}
     />

     {renderLabel('Gender')}
     <TextInput
      style={Styles.inputBox}
      placeholder="Enter Gender (Male/Female)"
      returnKeyType="done"
      onSubmitEditing={(event) => {
       const text = event.nativeEvent.text.trim().toLowerCase();
       if (text === 'male' || text === 'female') {
        setGender(text.charAt(0).toUpperCase() + text.slice(1)); // Capitalize
       } else {
        Alert.alert('Invalid input', 'Please enter either "Male" or "Female".');
       }
      }}
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

     {/* Country Picker for phone code */}
     {showCountryPicker && (
      <CountryPicker
       countryCode={countryCode}
       withFilter
       withFlag
       withCallingCode
       withEmoji
       onSelect={(selectedCountry) => {
        console.log('selectedCountry', selectedCountry?.callingCode);
        // setCountryCode(selectedCountry.cca2);
        setCountry(selectedCountry);
        setCallingCode(selectedCountry.callingCode);
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
