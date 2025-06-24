// TrialAccessScreen.tsx

import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from './Styles';
import ShippingAddress from '../../Component/ShippinfgAddress/ShippingAddress';
import PaymentMethod from '../../Component/Payment/PaymentMethod';
import OrderSuccess from '../../Component/OrderSuccess/OrderSuccess';
import { showToast } from '../../Constant/showToast';
import axios from 'axios';
import { BASE_URL } from '../../Constant/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function PaymentScreen(props: any) {
 const [playVideo, setPlayVideo] = useState(false);
 const navigation = useNavigation<any>();
 const [value, setValue] = useState(null);
 const [cityValue, setCityValue] = useState(null);

 const [countryName, seCountryName] = useState('');
 const [cityName, seCityName] = useState('');
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
 const [cityisFocus, setcityIsFocus] = useState(false);
 const [isStatus, setIsStatus] = useState(1);
 const [loading, setLoading] = useState(false);
 const [countryData, seCountryData] = useState<any>([]);
 const [visible, setVisible] = useState(false);
 const [countryCode, setCountryCode] = useState('IN'); // Default to India
 const [callingCode, setCallingCode] = useState('+91');
 const subscriptionData = props?.route?.params?.paymentData;
 //  console.log('subscriptionData', subscriptionData);
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
 const onSelect = (country: Country) => {
  setCountryCode(country.cca2); // Country code like 'IN', 'US'
  setCallingCode(`+${country.callingCode[0]}`); // Phone code like '+91'
  setVisible(false);
  console.log('Country Code:', country.cca2);
  console.log('Phone Code:', `+${country.callingCode[0]}`);
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

 useEffect(() => {
  getCountries();
 });
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
     country_name: 'India',
     city_name: 'Delhi',
     state: 'Delhi',
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
  if (!name || !phone || !street || !postalCode) {
   showToast('All Fields are required');
  } else {
   setIsStatus(2);
  }
 };
 const handleStepTwo = () => {
  if (!holderName || !cardNumber || !month || !year || !monthYear || !cvv) {
   showToast('All Fields are required');
  } else {
   handlPayment();
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
     countryData={countryData}
     maxHeight={200}
     labelField="label"
     valueField="value"
     placeholder={!isFocus ? 'Select Province' : '...'}
     value={value}
     onFocus={() => setIsFocus(true)}
     onBlur={() => setIsFocus(false)}
     onChange={(item: { value: React.SetStateAction<null> }) => {
      setValue(item.value);
      setIsFocus(false);
     }}
     //city
     cityData={data}
     citylabelField="label"
     cityvalueField="value"
     cityplaceholder={!cityisFocus ? 'Select City' : '...'}
     cityvalue={cityValue}
     cityOnFocus={() => setcityIsFocus(true)}
     cityOnBlur={() => setcityIsFocus(false)}
     onChangeCity={(item: { value: React.SetStateAction<null> }) => {
      console.log('item', item);
      setCityValue(item.value);
      setcityIsFocus(false);
     }}
     openPicker={() => setVisible(true)}
     //  showPicker={() => setVisible(true)}
     onSelect={onSelect}
     onClose={() => setVisible(false)}
     countryCode={countryCode}
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
