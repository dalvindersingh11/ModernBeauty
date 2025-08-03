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
 ScrollView,
 DeviceEventEmitter,
 BackHandler
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
 const [countryCode, setCountryCode] = useState('IN');
 const [country, setCountry] = useState(null);
 const [showDatePicker, setShowDatePicker] = useState(false);
 const [showCountryPicker, setShowCountryPicker] = useState(false);
 const [name, setName] = useState('');
 const [phone, setPhone] = useState('');
 const [gender, setGender] = useState('');
 const [email, setEmail] = useState('');
 const [image, setImage] = useState('');
 const [loading, setLoading] = useState(false);
 const [user, setUser] = useState(null);
 const [isFocus, setIsFocus] = useState(false);
 const [profileLoading, setProfileLoading] = useState(true); // ⬅️ ADD this
 const [imageLoading, setImageLoading] = useState(false); // ⬅️ ADD this

 const genderOptions = [
  { label: 'Male', value: '1' },
  { label: 'Female', value: '2' }
 ];
 useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
   navigation.goBack(); // Go back to the previous screen
   return true; // Prevent default behavior (exit app)
  });

  return () => backHandler.remove(); // Clean up the event on unmount
 }, []);
 useEffect(() => {
  (async () => {
   const userData = await AsyncStorage.getItem('user');
   const savedCountry = await AsyncStorage.getItem('selected_country');
   if (userData) setUser(JSON.parse(userData));
   if (savedCountry) {
    const parsed = JSON.parse(savedCountry);
    setCountry(parsed);
    setCallingCode(parsed.callingCode?.[0] || '91');
    setCountryCode(parsed.cca2 || 'IN');
   }
  })();
 }, []);

 useEffect(() => {
  handGetProfile();
 }, []);

 const handGetProfile = async () => {
  setProfileLoading(true);
  try {
   const token = await AsyncStorage.getItem('token');
   const res = await fetch(BASE_URL + 'profile', {
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${token}`
    }
   });
   const data = await res.json();
   setName(data?.data?.name || '');
   setPhone(data?.data?.phone || '');
   setEmail(data?.data?.email || '');
   setGender(data?.data?.gender || '');
   setImage(data?.data?.image || '');
   if (data?.data?.country) {
    const selected = {
     name: data.data.country,
     cca2: data.data.countryCode || 'IN',
     callingCode: [data.data.callingCode || '91']
    };
    setCountry(selected);
    setCallingCode(selected.callingCode[0]);
    setCountryCode(selected.cca2);
    await AsyncStorage.setItem('selected_country', JSON.stringify(selected));
   }
  } catch (err) {
   console.log('Profile error:', err);
  } finally {
   setProfileLoading(false);
  }
 };

 const handleConfirmDate = (selectedDate: any) => {
  setDate(selectedDate || new Date());
  setShowDatePicker(false);
 };

 const handleUpdateProfile = async () => {
  if (!name || !phone || !gender || !email) {
   showToast('All fields are required');
   return;
  }

  const token = await AsyncStorage.getItem('token');
  setLoading(true);

  try {
   await axios.put(
    `${BASE_URL}update-profile`,
    {
     email,
     name,
     phone,
     gender
     //  country: country?.name
    },
    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
     }
    }
   );
   showToast('Profile updated successfully');
  } catch (err) {
   console.error('Update error:', err);
   showToast('Something went wrong');
  } finally {
   setLoading(false);
  }
 };

 const handleCountrySelect = async (
  selectedCountry: React.SetStateAction<null>
 ) => {
  setCallingCode(selectedCountry?.callingCode?.[0] || '91');
  setCountryCode(selectedCountry.cca2);
  setCountry(selectedCountry);
  setShowCountryPicker(false);
  await AsyncStorage.setItem(
   'selected_country',
   JSON.stringify(selectedCountry)
  );
 };

 const showMediaPicker = () => {
  Alert.alert('Upload Media', 'Choose an option', [
   {
    text: 'Open Gallery',
    onPress: () => {
     ImagePicker.openPicker({ mediaType: 'photo' }).then((img) => {
      setImage(img?.path);
      handleProfileImage(img?.path);
     });
    }
   },
   {
    text: 'Take Photo',
    onPress: () => {
     ImagePicker.openCamera({ width: 300, height: 400, cropping: true }).then(
      (img) => {
       setImage(img?.path);
       handleProfileImage(img?.path);
      }
     );
    }
   },
   { text: 'Cancel', style: 'cancel' }
  ]);
 };

 const handleProfileImage = async (imagePath: string) => {
  const token = await AsyncStorage.getItem('token');
  const uri = imagePath;
  const fileName: any = uri.split('/').pop();
  const fileType = fileName.endsWith('png') ? 'image/png' : 'image/jpeg';

  const formData = new FormData();
  formData.append('image', { uri, name: fileName, type: fileType });
  setImageLoading(true);
  try {
   await axios.post(`${BASE_URL}update-profile-picture`, formData, {
    headers: {
     'Content-Type': 'multipart/form-data',
     Authorization: `Bearer ${token}`
    }
   });
   await AsyncStorage.setItem('profile_image', fileName);
   showToast('Image updated');
   DeviceEventEmitter.emit('profileUpdate', { message: 'Hello from event' });
   handGetProfile();
  } catch (err) {
   setImageLoading(false);

   console.error('Image upload error:', err);
   showToast('Image upload failed');
  } finally {
   setImageLoading(false);
  }
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

 return (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgrounColor }}>
   {profileLoading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <ActivityIndicator size="large" color={'black'} />
    </View>
   ) : (
    <ScrollView showsVerticalScrollIndicator={false}>
     <View style={Styles.contentWrapper}>
      <View style={Styles.avatarRow}>
       <View style={Styles.avatarWrapper}>
        {imageLoading == true ? (
         <ActivityIndicator size={25} color={colors.black} />
        ) : (
         <View style={Styles.avatarInner}>
          <Image
           source={image ? { uri: IMAGE_URL + image } : SAMPLEIMAGE}
           style={Styles.avatarImage}
          />
         </View>
        )}
        <TouchableOpacity
         disabled={imageLoading}
         onPress={showMediaPicker}
         style={Styles.editIcon}>
         <Image source={EDITPROFILEICON} style={Styles.editIconImage} />
        </TouchableOpacity>
       </View>
      </View>

      {renderLabel('Name')}
      <TextInput
       style={Styles.inputBox}
       value={name}
       placeholder="Name"
       onChangeText={setName}
      />

      {renderLabel('Email')}
      <TextInput
       style={Styles.inputBox}
       placeholderTextColor={colors.black}
       value={email}
       placeholder="Email"
       onChangeText={setEmail}
      />

      {renderLabel('Gender')}
      <View style={Styles.inputBox}>
       <Dropdown
        style={Styles.dropdown}
        placeholderStyle={Styles.placeholderStyle}
        selectedTextStyle={Styles.selectedTextStyle}
        data={genderOptions}
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
        placeholder="Phone"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
       />
      </View>

      {renderLabel('Country/Region')}
      <TouchableOpacity
       onPress={() => setShowCountryPicker(true)}
       style={Styles.dropdownBox}>
       <Text>{country?.name || 'Select country'}</Text>
       <Image source={DROPDOWNICON} style={Styles.dropdownIcon} />
      </TouchableOpacity>

      {showCountryPicker && (
       <CountryPicker
        countryCode={countryCode}
        withFilter
        withFlag
        withCallingCode
        withCountryNameButton
        onSelect={handleCountrySelect}
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
      />

      <TouchableOpacity
       disabled={loading}
       onPress={handleUpdateProfile}
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
   )}
  </SafeAreaView>
 );
};

export default EditProfile;
