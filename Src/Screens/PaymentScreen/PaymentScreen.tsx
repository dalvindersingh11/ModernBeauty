// TrialAccessScreen.tsx

import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from './Styles';
import ShippingAddress from '../../Component/ShippinfgAddress/ShippingAddress';
import PaymentMethod from '../../Component/Payment/PaymentMethod';
import OrderSuccess from '../../Component/OrderSuccess/OrderSuccess';
import { showToast } from '../../Constant/showToast';
import axios from 'axios';
import { BASE_URL } from '../../Constant/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopHeader from '../../Component/TopHeader/TopHeader';
export default function PaymentScreen(props: any) {
 const [playVideo, setPlayVideo] = useState(false);
 const navigation = useNavigation<any>();
 const [value, setValue] = useState(null);
 const [cityValue, setCityValue] = useState(null);
 const [cityisFocus, setcityIsFocus] = useState(false);
 const [stateValue, setStateValue] = useState(null);
 const [stateisFocus, setStateIsFocus] = useState(false);
 const [countryName, setCountryName] = useState('');
 const [cityName, setCityName] = useState('');
 const [stateName, setStateName] = useState('');

 const [name, setName] = useState('');
 const [phone, setPhone] = useState('');
 const [street, setStreet] = useState('');
 const [postalCode, setPostalCode] = useState('');
 const [province, setProvince] = useState('');
 const [cardNumber, setCardNumber] = useState('');
 const [holderName, setHolderName] = useState('');
 const [monthYear, setMonthYear] = useState('');
 const [month, setMonth] = useState('');
 const [year, setYear] = useState('');
 const [cvv, setCvv] = useState('');
 const [isFocus, setIsFocus] = useState(false);

 const [isStatus, setIsStatus] = useState(1);
 const [loading, setLoading] = useState(false);
 const [countryData, seCountryData] = useState<any>([]);
 const [cityArrData, setCityArrData] = useState<any>([]);
 const [stateArrData, setStateArrData] = useState<any>([]);

 const [visible, setVisible] = useState(false);
 const [countryCode, setCountryCode] = useState('IN');
 const [callingCode, setCallingCode] = useState('91');
 const subscriptionData = props?.route?.params?.paymentData;
 //  console.log('subscriptionData', subscriptionData);

 const onSelect = (country: {
  cca2: React.SetStateAction<string>;
  callingCode: React.SetStateAction<string>[];
 }) => {
  setCountryCode(country.cca2);
  setCallingCode(country.callingCode[0]);
  setVisible(false);
 };
 const handleMonthYearChange = (text: string) => {
  // Format: Allow only digits and slash
  const cleaned = text.replace(/[^\d/]/g, '');

  // Auto-insert slash after 2 digits (month)
  let formatted = cleaned;
  if (cleaned.length === 2 && !cleaned.includes('/')) {
   formatted = cleaned + '/';
  }

  // Limit to 7 characters (MM/YYYY)
  if (formatted.length > 7) return;

  // Update full input
  setMonthYear(formatted);

  // Extract parts
  const [mm, yyyy] = formatted.split('/');
  setMonth(mm || '');
  setYear(yyyy || '');
 };
 const getCountries = async () => {
  try {
   const token = await AsyncStorage.getItem('token');

   const response = await fetch(`${BASE_URL}countries`, {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${token}`
    }
   });

   if (!response.ok) {
    throw new Error('Failed to fetch countries');
   }

   const json = await response.json();

   const rawData = json?.data || []; // adjust if nested
   const newArr = Array.isArray(rawData)
    ? rawData.map((item: any) => ({
       value: item?.id,
       label: item?.name
      }))
    : [];
   seCountryData(newArr);
   console.log('countries', newArr);
  } catch (error: any) {
   console.error('Error fetching countries:', error.message || error);
  }
 };
 const getCities = async () => {
  try {
   const token = await AsyncStorage.getItem('token');

   const response = await fetch(`${BASE_URL}cities`, {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${token}`
    }
   });

   if (!response.ok) {
    throw new Error('Failed to fetch countries');
   }

   const json = await response.json();

   const rawData = json?.data || []; // adjust if nested
   const newArr = Array.isArray(rawData)
    ? rawData.map((item: any) => ({
       value: item?.id,
       label: item?.name
      }))
    : [];
   setCityArrData(newArr);
   console.log('cities123', newArr);
  } catch (error: any) {
   console.error('Error fetching countries:', error.message || error);
  }
 };
 const getStates = async () => {
  try {
   const token = await AsyncStorage.getItem('token');

   const response = await fetch(`${BASE_URL}states`, {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${token}`
    }
   });

   if (!response.ok) {
    throw new Error('Failed to fetch countries');
   }

   const json = await response.json();

   const rawData = json?.data || []; // adjust if nested
   const newArr = Array.isArray(rawData)
    ? rawData.map((item: any) => ({
       value: item?.id,
       label: item?.name
      }))
    : [];
   setStateArrData(newArr);
   console.log('countries', newArr);
  } catch (error: any) {
   console.error('Error fetching countries:', error.message || error);
  }
 };
 //  useEffect(() => {
 //   getCountries();
 //   getCities();
 //   getStates();
 //  });
 const handlPayment = async () => {
  const token = await AsyncStorage.getItem('token');
  //   if (!joinedOtp) {
  //    showToast('All Fields are required');
  //    return;
  //   }
  console.log(
   'alldata',
   cardNumber,
   month,
   year,
   cvv,
   holderName,
   postalCode,
   name,
   phone
  );
  setLoading(true);
  try {
   const response = await axios.post(
    `${BASE_URL}user/subscribe`,
    {
     subscription_id: subscriptionData?.id,
     card_number: cardNumber,
     exp_month: month,
     exp_year: year,
     cvc: cvv,
     card_holder_name: holderName,
     country_name: countryName,
     city_name: cityName,
     state: stateName,
     postal_code: postalCode,
     country_code: 'IN',
     full_name: name,
     phone_number: phone
    }, // Send in body as JSON
    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
     }
    }
   );

   console.log('OTP Success:', response.data);
   showToast('Verification successful!');
   navigation?.navigate('Login');
  } catch (error: any) {
   setLoading(false);
   console.error('subscription Error:', error.response?.data || error.message);
   showToast(error?.response?.data?.message || 'OTP verification failed');
  } finally {
   setLoading(false);
  }
 };
 const handleStepFirst = () => {
  console.log(
   'fisrtStep',
   name,
   phone,
   cityName,
   postalCode,
   countryName,
   stateName
  );
  if (
   !name ||
   !phone ||
   !cityName ||
   !postalCode ||
   !countryName ||
   !stateName
  ) {
   showToast('All Fields are required');
  } else {
   setIsStatus(2);
  }
 };
 const handleStepTwo = () => {
  if (!holderName || !cardNumber || !month || !year || !monthYear || !cvv) {
   showToast('All Fields are required');
  } else {
   showToast('Payment Successfull');
   setTimeout(() => {
    setIsStatus(3);
   }, 1200);
   //  handlPayment();
  }
 };
 return (
  <SafeAreaView style={Styles.container}>
   {isStatus == 1 ? (
    <ShippingAddress
     onPressFirstStep={() => handleStepFirst()}
     onChangeUserName={(text: any) => setName(text)}
     onChangePhoneNumber={(text: any) => setPhone(text)}
     onChangeStreet={(text: any) => setStreet(text)}
     onChangeCode={(text: any) => setPostalCode(text)}
     onChangeCountry={(text: any) => setCountryName(text)}
     onChangeState={(text: any) => setStateName(text)}
     onChangeCity={(text: any) => setCityName(text)}
     countryData={countryData}
     maxHeight={200}
     labelField="label"
     valueField="value"
     placeholder={!isFocus ? 'Select Province' : '...'}
     value={value}
     onFocus={() => setIsFocus(true)}
     onBlur={() => setIsFocus(false)}
     onChange={(item: { value: React.SetStateAction<null> }) => {
      setCountryName(item?.label);
      setValue(item.value);
      setIsFocus(false);
     }}
     //city
     cityData={cityArrData}
     citylabelField="label"
     cityvalueField="value"
     cityplaceholder={!cityisFocus ? 'Select City' : '...'}
     cityvalue={cityValue}
     cityOnFocus={() => setcityIsFocus(true)}
     cityOnBlur={() => setcityIsFocus(false)}
     //  onChangeCity={(item: { value: React.SetStateAction<null> }) => {
     //   console.log('item', item);
     //   setCityName(item?.label);
     //   setCityValue(item.value);
     //   setcityIsFocus(false);
     //  }}
     stateData={stateArrData}
     statelabelField="label"
     statevalueField="value"
     stateplaceholder={!stateisFocus ? 'Select State' : '...'}
     statevalue={stateValue}
     stateOnFocus={() => setStateIsFocus(true)}
     stateOnBlur={() => setStateIsFocus(false)}
     //  onChangeState={(item: { value: React.SetStateAction<null> }) => {
     //   console.log('item', item);
     //   seStateName(item?.label);
     //   setStateValue(item.value);
     //   setStateIsFocus(false);
     //  }}
     visible={visible}
     openPicker={() => setVisible(true)}
     onClose={() => setVisible(false)}
     onSelect={onSelect}
     countryCode={countryCode}
     callingCode={callingCode}
    />
   ) : isStatus == 2 ? (
    <PaymentMethod
     onBackStep={() => setIsStatus(1)}
     onPressSecondStep={() => handleStepTwo()}
     onChangeCard={(text: any) => setCardNumber(text)}
     onChangeName={(text: any) => setHolderName(text)}
     value={monthYear}
     onChangeMonthYear={handleMonthYearChange}
     onChangeCVV={(text: any) => setCvv(text)}
    />
   ) : isStatus == 3 ? (
    <OrderSuccess />
   ) : null}
  </SafeAreaView>
 );
}
