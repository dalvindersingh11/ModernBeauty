// TrialAccessScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Video from 'react-native-video';
import { APP_LOGO, USER } from '../../Constant/Icons';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function TrialAccessScreen() {
 const [playVideo, setPlayVideo] = useState(false);
 const navigation = useNavigation<any>();
 return (
  <View style={styles.container}>
   {/* Top branding */}
   <View style={styles.header}>
    <Image
     style={{ height: moderateScale(20), width: moderateScale(76) }}
     source={APP_LOGO}
    />
    <Image source={USER} style={styles.profileIcon} />
   </View>

   <View style={{ height: 90 }} />
   <Text allowFontScaling={false} style={styles.welcome}>
    Welcome Joe!
   </Text>
   <Text allowFontScaling={false} style={styles.subtitle}>
    This is your Level 1 Trial access.{'\n'}Get a sneak peek of the course!
   </Text>

   {/* Video or Play Button */}
   <View style={styles.videoBox}>
    {playVideo ? (
     <Video
      source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }} // replace with your video
      style={styles.video}
      resizeMode="contain"
      controls
     />
    ) : (
     <TouchableOpacity
      onPress={() => setPlayVideo(true)}
      style={styles.playButton}>
      <FontAwesome
       name="play"
       size={20}
       color={colors.white}
       style={{ left: 2, top: 1 }}
      />
     </TouchableOpacity>
    )}
   </View>

   {/* Level 2 Button */}
   <TouchableOpacity
    onPress={() => navigation?.navigate('PlanScreen')}
    style={styles.levelButton}>
    <Text allowFontScaling={false} style={styles.levelText}>
     Level 2
    </Text>
   </TouchableOpacity>
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
 },
 welcome: {
  fontSize: 34,
  fontFamily: fonts.semiBold
 },
 subtitle: {
  fontFamily: fonts.regular,
  marginVertical: 15,
  fontSize: 13,
  color: colors.textColor
 },
 videoBox: {
  width: moderateScale(290),
  height: moderateScale(180),
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: responsiveScreenHeight(3)
 },
 playButton: {
  backgroundColor: colors.tomato,
  width: moderateScale(48),
  height: moderateScale(48),
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center'
 },
 playIcon: {
  color: '#fff',
  fontSize: 40,
  bottom: 6,
  left: 1
 },
 video: {
  width: '100%',
  height: '100%'
 },
 levelButton: {
  backgroundColor: colors.black,
  borderRadius: 10,
  width: moderateScale(295),
  height: moderateScale(38),
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: responsiveScreenHeight(7)
 },
 levelText: {
  color: '#fff',
  fontSize: 16
 }
});
