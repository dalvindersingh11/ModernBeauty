// TrialAccessScreen.tsx

import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 Image,
 Platform,
 Alert
} from 'react-native';
import { moderateScale, mvs } from 'react-native-size-matters';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import WebView from 'react-native-webview';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { IMAGE_URL } from '../../Constant/apiUrl';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
export default function TrialAccessScreen(props: any) {
 const [playVideo, setPlayVideo] = useState(false);
 const navigation = useNavigation<any>();
 const [user, setUser] = useState<any>(null);
 const [modalVisible, setModalVisible] = useState(false);
 const item = props?.route?.params?.item;
 const [videoUrl, setVideoUrl] = useState(item?.file_path);
 const [fileType, setFileType] = useState(item?.file_path);
 const getFileType = (
  url: string
 ): 'youtube' | 'mp4' | 'm3u8' | 'pdf' | 'docx' | 'txt' | 'unknown' => {
  if (!url) return 'unknown';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.endsWith('.mp4')) return 'mp4';
  if (url.endsWith('.m3u8')) return 'm3u8';
  if (url.endsWith('.pdf')) return 'pdf';
  if (url.endsWith('.docx')) return 'docx';
  if (url.endsWith('.txt')) return 'txt';
  return 'unknown';
 };
 console.log('item123', item);
 // Utility function to extract YouTube video ID
 const extractYouTubeId = (url: string) => {
  const regExp =
   /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^"&?/ ]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : '';
 };

 const formatDuration = (durationInMinutes: number) => {
  const totalSeconds = Math.round(durationInMinutes * 60);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins > 0 ? `${mins} min ` : ''}${secs} sec`;
 };
 useEffect(() => {
  getFileType(item?.file_path);
 }, []);
 return (
  <View style={styles.container}>
   <View style={{ height: mvs(25) }} />
   <Text
    allowFontScaling={false}
    style={{ color: colors.black, fontFamily: fonts.medium, fontSize: 17 }}>
    {item?.title}
   </Text>
   {/* Video or Play Button */}
   {videoUrl && fileType !== 'unknown' && (
    <View style={styles.videoBox}>
     {fileType === 'youtube' ? (
      <View
       style={{
        height: moderateScale(180),
        width: '100%',
        alignSelf: 'center'
       }}>
       <WebView
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        source={{
         uri: `https://www.youtube.com/embed/${extractYouTubeId(videoUrl)}`
        }}
        style={{ flex: 1 }}
       />
      </View>
     ) : fileType === 'mp4' || fileType === 'm3u8' ? (
      playVideo ? (
       <Video
        source={{ uri: IMAGE_URL + videoUrl }}
        style={styles.video}
        controls
        resizeMode="contain"
        onFullscreenPlayerWillPresent={() => {
         Orientation.unlockAllOrientations();
         Orientation.lockToLandscape();
        }}
        onFullscreenPlayerWillDismiss={() => {
         Orientation.lockToPortrait();
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
      )
     ) : (
      <Text style={{ color: 'red' }}>Unsupported video format</Text>
     )}
    </View>
   )}

   <View
    style={{
     width: moderateScale(300),
     alignSelf: 'center',
     marginTop: responsiveScreenHeight(3)
    }}>
    <Text
     allowFontScaling={false}
     style={{ color: colors.black, fontFamily: fonts.regular, fontSize: 17 }}>
     Durtaion:- {formatDuration(item?.duration)}
    </Text>
    <View
     style={{
      width: moderateScale(300),
      marginTop: responsiveScreenHeight(2)
     }}>
     <Text
      allowFontScaling={false}
      style={{ color: colors.black, fontFamily: fonts.regular, fontSize: 17 }}>
      {item?.description || 'No description available'}
     </Text>
    </View>
   </View>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
  alignItems: 'center',
  paddingTop: moderateScale(11)
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
  width: moderateScale(320),
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
