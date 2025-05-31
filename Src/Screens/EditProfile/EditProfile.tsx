import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Platform
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

const EditProfile = () => {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [countryCode, setCountryCode] = useState('US');
  const [country, setCountry] = useState(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const handleConfirmDate = (selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgrounColor }}>
      <View style={{ gap: mvs(10), padding: ms(12) }}>
        {/* Header */}
        <View style={Styles.header}>
          <Image style={Styles.logo} source={APP_LOGO} />
          <Image source={USER} style={Styles.userAvatar} />
        </View>

        {/* Avatar */}
        <View style={Styles.avatarRow}>
         <TouchableOpacity onPress={()=>navigation.goBack()} >
              <Image source={BACKICON} style={Styles.backIcon} />
              </TouchableOpacity>
          <View style={Styles.avatarWrapper}>
            <View style={Styles.avatarInner}>
              <Image source={SAMPLEIMAGE} style={Styles.avatarImage} />
            </View>
            <TouchableOpacity style={Styles.editIcon}>
              <Image source={EDITPROFILEICON} style={Styles.editIconImage} />
            </TouchableOpacity>
          </View>
          <View style={{ width: ms(18), height: mvs(16) }} />
        </View>

        {/* Input Fields */}
        {renderLabel('Name')}
        <View style={Styles.inputBox}><TextInput placeholder="Enter name" /></View>

        {renderLabel('Email')}
        <View style={Styles.inputBox}><TextInput placeholder="Enter email" /></View>

        {renderLabel('Password')}
        <View style={Styles.inputBox}><TextInput placeholder="Enter password" secureTextEntry /></View>

        {renderLabel('Date of birth')}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={Styles.dropdownBox}>
          <Text>{date.toDateString()}</Text>
          <Image style={Styles.dropdownIcon} source={DROPDOWNICON} />
        </TouchableOpacity>

        {/* Date Picker Modal */}
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
            onSelect={selectedCountry => {
              setCountryCode(selectedCountry.cca2);
              setCountry(selectedCountry);
              setShowCountryPicker(false);
            }}
            onClose={() => setShowCountryPicker(false)}
            visible
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const renderLabel = label => (
  <Text allowFontScaling={true} style={Styles.label}>{label}</Text>
);



export default EditProfile;
