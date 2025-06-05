import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import { APP_LOGO, BACKICON, USER } from '../../Constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, IMAGE_URL } from '../../Constant/apiUrl';
import { useNavigation } from '@react-navigation/native';
import colors from '../../Constant/colors';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';

const TopHeader = ({ backOnPress }: { backOnPress?: () => void }) => {
 const [user, setUser] = useState<any>(null);
 const [image, setImage] = useState<any>('');

 const navigation = useNavigation<any>();
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

   setImage(data?.data?.image);

   console.log('Profile Data:', data);
  } catch (error) {
   console.error('Error fetching profile:', error);
   // showToast('Something went wrong'); // Optional
  }
 };
 useEffect(() => {
  handGetProfile();
 }, []);

 return (
  <SafeAreaView
   style={{
    backgroundColor: colors.backgrounColor,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center'
   }}>
   <View
    style={{
     width: '90%',
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingHorizontal: ms(8),
     marginTop: responsiveScreenHeight(2)
    }}>
    {backOnPress ? (
     <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
       source={BACKICON}
       style={{
        width: ms(18),
        height: mvs(16)
       }}
      />
     </TouchableOpacity>
    ) : null}
    <Image
     style={{
      height: moderateScale(20),
      width: moderateScale(76),
      marginLeft: backOnPress ? ms(17) : 0
     }}
     source={APP_LOGO}
    />
    <TouchableOpacity onPress={() => navigation?.navigate('Settings')}>
     {!image ? (
      <Image
       source={USER}
       style={{
        width: moderateScale(35),
        height: moderateScale(35),
        borderRadius: 20
       }}
      />
     ) : (
      <Image
       source={{ uri: IMAGE_URL + image }}
       style={{
        width: moderateScale(35),
        height: moderateScale(35),
        borderRadius: 20
       }}
      />
     )}
    </TouchableOpacity>
   </View>
  </SafeAreaView>
 );
};

export default TopHeader;
