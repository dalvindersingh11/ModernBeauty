import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 ScrollView,
 FlatList,
 BackHandler
} from 'react-native';
import { APP_LOGO, PREMIUM, USER } from '../../Constant/Icons';
import { moderateScale } from 'react-native-size-matters';
import fonts from '../../Constant/Fonts';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import colors from '../../Constant/colors';
import { useNavigation } from '@react-navigation/native';
import Styles from './Styles';
import { BASE_URL } from '../../Constant/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlanScreen() {
 const [selectedPlan, setSelectedPlan] = useState(null);
 const [arrData, setArrData] = useState([]);

 const navigation = useNavigation<any>();
 useEffect(() => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
   navigation.goBack(); // Go back to the previous screen
   return true; // Prevent default behavior (exit app)
  });

  return () => backHandler.remove(); // Clean up the event on unmount
 }, []);

 const getAllPlans = async () => {
  try {
   const token = await AsyncStorage.getItem('token');
   console.log('Token:', token);

   const response = await fetch(BASE_URL + 'all_plans', {
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

   setArrData(data?.data);

   console.log('plans Data:', data);
  } catch (error) {
   console.error('Error fetching profile:', error);
   // showToast('Something went wrong'); // Optional
  }
 };
 useEffect(() => {
  getAllPlans();
 }, []);
 const renderPlans = ({ item, index }: any) => {
  return (
   <View>
    <TouchableOpacity
     style={[Styles.planBox, selectedPlan === item && Styles.planSelected]}
     onPress={() => setSelectedPlan(item)}>
     <View style={Styles.planTop}>
      <Text allowFontScaling={false} style={Styles.planTitle}>
       {item?.title}
      </Text>
      <Text allowFontScaling={false} style={Styles.bestValue}>
       {item?.badge}
      </Text>
     </View>
     <View style={{ marginTop: 5 }}>
      <Text allowFontScaling={false} style={Styles.planText}>
       {item?.description} - {Number(item?.price).toFixed(0)} /
       {item?.duration_months} months
      </Text>
     </View>
    </TouchableOpacity>
   </View>
  );
 };
 return (
  <ScrollView
   showsVerticalScrollIndicator={false}
   contentContainerStyle={Styles.container}>
   {/* Title */}
   <Text allowFontScaling={true} style={Styles.title}>
    Go Premium
   </Text>
   <Text allowFontScaling={true} style={Styles.subtitle}>
    Unlock all the power of this mobile tool and enjoy{'\n'}digital experience
    like never before!
   </Text>

   {/* Image */}
   <Image
    source={PREMIUM} // replace with your image
    style={Styles.giftImage}
   />
   <View
    style={{
     height: responsiveScreenHeight(22),
     marginTop: responsiveScreenHeight(3)
    }}>
    <FlatList
     data={arrData}
     showsVerticalScrollIndicator={false}
     renderItem={renderPlans}
    />
   </View>

   <TouchableOpacity
    disabled={selectedPlan == null}
    onPress={() =>
     navigation?.navigate('PaymentScreen', { paymentData: selectedPlan })
    }
    style={selectedPlan == null ? Styles.disableButton : Styles.proceedButton}>
    <Text
     allowFontScaling={false}
     style={selectedPlan == null ? Styles.disableText : Styles.proceedText}>
     Proceed
    </Text>
   </TouchableOpacity>

   {/* Terms */}
   <View
    style={{ width: moderateScale(310), marginTop: responsiveScreenHeight(1) }}>
    <Text allowFontScaling={false} style={[Styles.terms]}>
     By placing this order, you agree to the
     <Text allowFontScaling={false} style={Styles.link}>
      Terms of Service
     </Text>
     and
     <Text allowFontScaling={false} style={Styles.link}>
      Privacy Policy
     </Text>
     . Subscription automatically renews unless auto-renew is turned off at
     least 24-hours before the end of the current period.
    </Text>
   </View>
  </ScrollView>
 );
}
