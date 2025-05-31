// TrialAccessScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { APP_LOGO, USER } from '../../Constant/Icons';
import colors from '../../Constant/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMAGE_URL } from '../../Constant/apiUrl';
import { useNavigation } from '@react-navigation/native';

export default function TopHeader(props: any) {
 const [user, setUser] = useState<any>(null);
 const navigation = useNavigation<any>();
 useEffect(() => {
  const loadUser = async () => {
   try {
    const jsonValue = await AsyncStorage.getItem('user');
    if (jsonValue != null) {
     setUser(JSON.parse(jsonValue));
    }
   } catch (e) {
    console.error('Failed to load user:', e);
   }
  };

  loadUser();
 }, []);
 return (
  <View>
   {/* Top branding */}
   <View style={styles.header}>
    <Image
     style={{ height: moderateScale(20), width: moderateScale(76) }}
     source={APP_LOGO}
    />
    <TouchableOpacity onPress={() => navigation?.navigate('Settings')}>
     {!user?.image ? (
      <Image source={USER} style={styles.profileIcon} />
     ) : (
      <Image
       source={{ uri: IMAGE_URL + user?.image }}
       style={styles.profileIcon}
      />
     )}
    </TouchableOpacity>
   </View>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
  alignItems: 'center',
  paddingTop: moderateScale(21)
 },
 header: {
  width: '90%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 8
 },

 profileIcon: {
  width: moderateScale(35),
  height: moderateScale(35),
  borderRadius: 20
 }
});
