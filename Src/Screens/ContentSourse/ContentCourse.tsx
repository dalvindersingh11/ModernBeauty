// TrialAccessScreen.tsx

import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 Image,
 FlatList,
 SafeAreaView
} from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { VIDEOICON } from '../../Constant/Icons';
import TopHeader from '../../Component/TopHeader/TopHeader';
export default function ContentCourse() {
 const [playVideo, setPlayVideo] = useState(false);
 const navigation = useNavigation<any>();
 const [user, setUser] = useState<any>(null);
 const DATA = [
  {
   id: '1',
   title: 'Title',
   body:
    'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.'
  },
  {
   id: '2',
   title: 'Title',
   body:
    'Content for item two. Replace with anything – bullet list, paragraph, etc.'
  },
  {
   id: '3',
   title: 'Title',
   body: 'Content for item three goes here.'
  }
 ];
 const [openIndex, setOpenIndex] = useState<number | null>(0); // default open first

 const toggle = (index: number) =>
  setOpenIndex(openIndex === index ? null : index);
 const renderItem = ({ item, index }: any) => {
  const isOpen = openIndex === index;
  const toggle = (index: number) =>
   setOpenIndex(openIndex === index ? null : index);
  return (
   <View style={styles.card}>
    <TouchableOpacity
     style={styles.header}
     activeOpacity={0.7}
     onPress={() => toggle(index)}>
     <Text allowFontScaling={false} style={styles.title}>
      {item.title}
     </Text>
     <Icon
      name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
      size={22}
      color="#fff"
     />
    </TouchableOpacity>

    {isOpen && (
     <TouchableOpacity activeOpacity={0.7} style={styles.body}>
      <Image
       style={{
        height: moderateScale(35),
        width: moderateScale(35),
        borderRadius: 2
       }}
       source={VIDEOICON}
      />
      <View style={{ width: moderateScale(210) }}>
       <Text allowFontScaling={false} style={styles.bodyText}>
        {item.body}
       </Text>
      </View>
     </TouchableOpacity>
    )}
   </View>
  );
 };
 return (
  <SafeAreaView style={styles.container}>
   <View style={{ padding: 13 }}>
    <TopHeader />
   </View>
   <View style={{ height: responsiveScreenHeight(5) }} />

   <View style={{ width: moderateScale(300) }}>
    <Text allowFontScaling={false} style={styles.subtitle}>
     Content Course
    </Text>
   </View>

   {/* Video or Play Button */}
   <View style={styles.videoBox}>
    {playVideo ? (
     <Video
      source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
      style={styles.video}
      controls
      resizeMode="contain"
      onFullscreenPlayerWillPresent={() => {
       Orientation.unlockAllOrientations(); // allow auto landscape
       Orientation.lockToLandscape();
      }}
      onFullscreenPlayerWillDismiss={() => {
       Orientation.lockToPortrait(); // restore app orientation
      }}
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
   <View style={{ marginTop: responsiveScreenHeight(5) }}>
    <FlatList
     data={DATA}
     keyExtractor={(item) => item.id}
     renderItem={renderItem}
     contentContainerStyle={{ padding: 16 }}
    />
   </View>
   {/* Level 2 Button */}
   {/* <TouchableOpacity style={styles.levelButton}>
    <Text allowFontScaling={false} style={styles.levelText}>
     Level 2
    </Text>
    <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.white} />
   </TouchableOpacity> */}
  </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
  alignItems: 'center',
  paddingTop: moderateScale(11)
 },

 profileIcon: {
  width: moderateScale(35),
  height: moderateScale(35),
  borderRadius: 20
 },
 header: {
  backgroundColor: '#000',
  width: moderateScale(290),
  height: moderateScale(40),
  padding: 12,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
 },
 welcome: {
  fontSize: 34,
  fontFamily: fonts.semiBold
 },
 subtitle: {
  fontFamily: fonts.medium,
  marginVertical: 1,
  fontSize: 18,
  color: colors.textColor
 },
 videoBox: {
  width: moderateScale(300),
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
  height: moderateScale(40),
  flexDirection: 'row',
  padding: 12,
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: responsiveScreenHeight(7)
 },
 levelText: {
  color: '#fff',
  fontSize: 16
 },
 card: {
  marginBottom: 16,
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#000',
  overflow: 'hidden'
 },

 title: {
  color: '#fff',
  fontWeight: 'bold'
 },
 body: {
  backgroundColor: '#f7e3d9',
  width: moderateScale(290),
  //   height: moderateScale(40),
  padding: 12,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center'
 },
 bodyText: {
  color: '#000',
  fontFamily: fonts.regular,
  fontSize: 13
 }
});
