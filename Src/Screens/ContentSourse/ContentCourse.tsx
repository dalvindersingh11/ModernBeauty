// TrialAccessScreen.tsx

import React, { useCallback, useEffect, useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 Image,
 FlatList,
 SafeAreaView,
 Alert,
 Platform
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
import { DOCUMENT, DURATION, VIDEOICON } from '../../Constant/Icons';
import TopHeader from '../../Component/TopHeader/TopHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, IMAGE_URL } from '../../Constant/apiUrl';
import YoutubePlayer from 'react-native-youtube-iframe';
import WebView from 'react-native-webview';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
export default function ContentCourse(props: any) {
 const [playVideo, setPlayVideo] = useState(false);
 const navigation = useNavigation<any>();
 const [user, setUser] = useState<any>(null);
 const [arrData, setArrData] = useState<any>([]);
 const courseId = props?.route?.params?.id;
 console.warn('idExist', courseId);
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
 const [playYouTube, setPlayYouTube] = useState(false);
 const [videoType, setVideoType] = useState('');
 const [videoUrl, setVideoUrl] = useState('');
 const [videoId, setVideoId] = useState('');
 const [fileType, setFileType] = useState('');

 const getAllCourse = async () => {
  try {
   const token = await AsyncStorage.getItem('token');
   console.log('Token:', token);
   //api.addmelocal.in/api/all_courses?course_id=7
   const response = await fetch(
    BASE_URL + `all_courses?course_id=${courseId}`,
    {
     method: 'GET',
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // ✅ Space after "Bearer"
     }
    }
   );

   if (!response.ok) {
    throw new Error('Failed to fetch profile');
   }

   const data = await response.json();

   setArrData(data?.data);

   console.log('content course list Data:', data);
  } catch (error) {
   console.error('Error fetching profile:', error);
   // showToast('Something went wrong'); // Optional
  }
 };
 useEffect(() => {
  getAllCourse();
 }, []);
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

 // Utility function to extract YouTube video ID
 const extractYouTubeId = (url: string) => {
  const regExp =
   /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^"&?/ ]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : '';
 };
 const openDocumentFile = async (fileUrl: string) => {
  const fileName = fileUrl.split('/').pop();
  const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;

  try {
   // Download the file
   const result = await RNFS.downloadFile({
    fromUrl: fileUrl,
    toFile: filePath
   }).promise;

   if (result.statusCode === 200) {
    // Open the downloaded file
    await FileViewer.open(filePath, { showOpenWithDialog: true });
   } else {
    Alert.alert('Download Failed', 'Could not download the file.');
   }
  } catch (err) {
   console.error('File open error:', err);
   Alert.alert('Open Failed', 'Could not open the file.');
  }
 };
 const formatDuration = (durationInMinutes: number) => {
  const totalSeconds = Math.round(durationInMinutes * 60);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins > 0 ? `${mins} min ` : ''}${secs} sec`;
 };

 const renderItem = ({ item, index }: any) => {
  const getVideoData = (item: any) => {
   const url = item?.file_path;
   const type = getFileType(url);
   setVideoUrl(url);
   setFileType(type);
   setPlayVideo(false); // reset player state
  };
  const handleFilePress = (item: any) => {
   const type = getFileType(item?.file_path);

   if (['pdf', 'docx', 'txt'].includes(type)) {
    openDocumentFile(IMAGE_URL + item?.file_path);
   } else {
    Alert.alert('Unsupported', 'This file type is not supported.');
   }
  };

  const isOpen = openIndex === index;
  const toggle = (index: number) =>
   setOpenIndex(openIndex === index ? null : index);
  return (
   <View style={styles.card}>
    <TouchableOpacity
     style={styles.header}
     activeOpacity={0.7}
     onPress={() => toggle(index)}>
     <View style={{ width: moderateScale(250) }}>
      <Text allowFontScaling={false} style={styles.title}>
       {item.title}
      </Text>
     </View>
     <Icon
      name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
      size={22}
      color="#fff"
     />
    </TouchableOpacity>

    {isOpen && (
     <TouchableOpacity
      onPress={() => {
       const isDocument =
        item?.file_path?.endsWith('.pdf') ||
        item?.file_path?.endsWith('.docx') ||
        item?.file_type === 'file';

       if (isDocument) {
        handleFilePress(item);
       } else {
        getVideoData(item);
       }
      }}
      activeOpacity={0.7}
      style={styles.body}>
      <View
       style={{
        width: moderateScale(20),
        height: moderateScale(20),
        borderWidth: 1
       }}></View>
      <View
       style={{
        width: moderateScale(260),
        justifyContent: 'center'
       }}>
       <Text allowFontScaling={false} style={styles.bodyText}>
        {item.description || 'No description available'}
       </Text>
       {item?.file_type == 'video' ? (
        <View
         style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: moderateScale(130),
          marginTop: moderateScale(4),
          right: moderateScale(4)
         }}>
         <Image
          style={{
           height: moderateScale(17),
           width: moderateScale(17)
          }}
          source={DURATION}
         />
         <View style={{ width: moderateScale(100) }}>
          <Text allowFontScaling={false} style={[styles.bodyText]}>
           {formatDuration(Number(item.duration))}
          </Text>
         </View>
        </View>
       ) : (
        <View
         style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: moderateScale(50),
          marginTop: moderateScale(5),
          right: moderateScale(3)
         }}>
         <Image
          style={{
           height: moderateScale(20),
           width: moderateScale(20),
           borderRadius: 2
          }}
          source={DOCUMENT}
         />
         <Text allowFontScaling={false} style={styles.bodyText}>
          {'-------'}
         </Text>
        </View>
       )}
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

   <View style={{ width: moderateScale(335) }}>
    <Text allowFontScaling={false} style={styles.subtitle}>
     Content Course
    </Text>
   </View>

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
     marginTop: responsiveScreenHeight(5),
     height: moderateScale(350)
    }}>
    <FlatList
     data={arrData[0]?.lessons}
     showsVerticalScrollIndicator={false}
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
  width: moderateScale(340),
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
  width: moderateScale(330),
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
  width: moderateScale(340),
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
