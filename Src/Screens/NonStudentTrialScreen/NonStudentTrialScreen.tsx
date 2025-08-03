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
 Platform,
 ActivityIndicator,
 Modal,
 BackHandler
} from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import {
 responsiveScreenHeight,
 responsiveScreenWidth
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DOCUMENT, DURATION, QUIZ } from '../../Constant/Icons';
import TopHeader from '../../Component/TopHeader/TopHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, IMAGE_URL } from '../../Constant/apiUrl';
import WebView from 'react-native-webview';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
export default function NonStudentTrialScreen(props: any) {
 const [playVideo, setPlayVideo] = useState(false);
 const navigation = useNavigation<any>();
 const [modalVisible, setModalVisible] = useState(false);
 const [arrData, setArrData] = useState<any>([]);
 const courseId = props?.route?.params?.id;
 const [openIndex, setOpenIndex] = useState<number | null>(0); // default open first
 const [videoUrl, setVideoUrl] = useState('');
 const [fileType, setFileType] = useState('');
 const [loading, setLoading] = useState(false);
 const [isStatus, setisStatus] = useState(0);
 useEffect(() => {
  const backAction = () => {
   BackHandler.exitApp(); // 👈 Exit app immediately
   return true;
  };

  const backHandler = BackHandler.addEventListener(
   'hardwareBackPress',
   backAction
  );

  return () => backHandler.remove(); // Cleanup on unmount
 }, []);
 const getAllCourse = async () => {
  setLoading(true);
  try {
   const token = await AsyncStorage.getItem('token');
   console.log('Token:', token);
   //api.addmelocal.in/api/all_courses?course_id=7
   const response = await fetch('https://api.addmelocal.in/api/trial_courses', {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${token}` // ✅ Space after "Bearer"
    }
   });

   if (!response.ok) {
    throw new Error('Failed to fetch coursecontent');
   }

   const data = await response.json();
   setLoading(false);

   setArrData(data?.data);

   console.log('content course list Data:', data);
  } catch (error) {
   setLoading(false);

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
   setModalVisible(true);
   // Download the file
   const result = await RNFS.downloadFile({
    fromUrl: fileUrl,
    toFile: filePath
   }).promise;
   setModalVisible(false);

   if (result.statusCode === 200) {
    // Open the downloaded file
    await FileViewer.open(filePath, { showOpenWithDialog: true });
   } else {
    Alert.alert('Download Failed', 'Could not download the file.');
    setModalVisible(false);
   }
  } catch (err) {
   setModalVisible(false);
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
        borderWidth: 1,
       }}></View>
      <View
       style={{
        // width: moderateScale(260),
        width:'100%',
        justifyContent: 'center',paddingLeft:20
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
 const renderQuiz = ({ item, index }: any) => {
  return (
   <View style={styles.quizCard}>
    <Image
     source={QUIZ} // Replace with your image URL
     style={styles.image}
     //   resizeMode="contain"
    />
    <View style={styles.content}>
     <Text allowFontScaling={false} style={styles.quizTitle}>
      QUIZ : {item?.title}
     </Text>
     {/* <Text allowFontScaling={false} style={styles.description}>
      Please go to quiz page for more information
     </Text> */}
     <View style={{ height: moderateScale(20) }} />
     <TouchableOpacity
      onPress={() =>
       navigation?.navigate('QuizScreen', { id: item?.course_id })
      }
      style={styles.button}>
      <Text allowFontScaling={false} style={styles.buttonText}>
       Start Quiz
      </Text>
     </TouchableOpacity>
    </View>
   </View>
  );
 };
 return (
  <SafeAreaView style={styles.container}>
    <TopHeader/>
   <Text
    allowFontScaling={false}
    style={[
     styles.subtitle,
     { top: responsiveScreenHeight(2), fontSize: 11, fontFamily: fonts.medium }
    ]}>
    This is your Level 1 Trial access.{'\n'}Get a sneak peek of the course!
   </Text>
   <View
    style={{
     flexDirection: 'row',
     justifyContent: 'space-evenly',
     alignItems: 'center',
     width: '90%',
     padding: 12,
     top: responsiveScreenHeight(3),
     alignSelf: 'center'
    }}>
    <TouchableOpacity onPress={() => setisStatus(0)}>
     <Text
      allowFontScaling={false}
      style={isStatus == 0 ? styles.selectSubtitle : styles.subtitle}>
      Content Course
     </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setisStatus(1)}>
     <Text
      allowFontScaling={false}
      style={isStatus == 1 ? styles.selectSubtitle : styles.subtitle}>
      Quiz Competition
     </Text>
    </TouchableOpacity>
   </View>
   {/* Video or Play Button */}
   {videoUrl && fileType !== 'unknown' && isStatus == 0 && (
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
     ) : fileType === 'mp4' || fileType === 'm3u8' || isStatus == 0 ? (
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
   {loading ? (
    <View style={{ top: responsiveScreenHeight(10) }}>
     <ActivityIndicator size={30} color={colors.black} />
    </View>
   ) : (
    <View
     style={{
      marginTop: responsiveScreenHeight(2),
      height:
       fileType == ''
        ? responsiveScreenHeight(60)
        : fileType == 'pdf' || fileType == 'docx' || fileType == 'file'
        ? responsiveScreenHeight(60)
        : isStatus == 1
        ? responsiveScreenHeight(60)
        : responsiveScreenHeight(35)
      //   backgroundColor: 'red'
     }}>
     {isStatus == 0 ? (
      <FlatList
       data={arrData[0]?.lessons}
       showsVerticalScrollIndicator={false}
       keyExtractor={(item) => item.id}
       renderItem={renderItem}
       contentContainerStyle={{ padding: 16 }}
       ListEmptyComponent={
        <View
         style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: responsiveScreenHeight(10)
         }}>
         <Text
          allowFontScaling={false}
          style={{
           color: colors.black,
           fontFamily: fonts.regular,
           fontSize: 14
          }}>
          No Courses Found
         </Text>
        </View>
       }
      />
     ) : (
      <FlatList
       data={arrData[0]?.quizzes}
       showsVerticalScrollIndicator={false}
       keyExtractor={(item) => item.id}
       renderItem={renderQuiz}
       contentContainerStyle={{ padding: 16 }}
       ListEmptyComponent={
        <View
         style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: responsiveScreenHeight(10)
         }}>
         <Text
          allowFontScaling={false}
          style={{
           color: colors.black,
           fontFamily: fonts.regular,
           fontSize: 14
          }}>
          No Quiz Found
         </Text>
        </View>
       }
      />
     )}
    </View>
   )}
   <Modal transparent visible={modalVisible} animationType="fade">
    <View style={styles.overlay}>
     <View style={styles.popup}>
      <ActivityIndicator size="small" color={colors.black} />
      <Text style={styles.text}>Please wait...</Text>
     </View>
    </View>
   </Modal>
   {loading == false ? (
    <View
     style={{
      flexDirection: 'row',
      width: '90%',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 10,
      marginBottom: mvs(30),
      alignSelf: 'center'
     }}>
     <TouchableOpacity
      onPress={() => navigation?.navigate('RequetsAccess')}
      style={styles.bottomButton}>
      <Text style={styles.bottomText}>Request</Text>
     </TouchableOpacity>
     <TouchableOpacity
      onPress={() => navigation?.navigate('PlanScreen')}
      style={[styles.bottomButton]}>
      <Text style={styles.bottomText}>Access to Quiz</Text>
     </TouchableOpacity>
    </View>
   ) : null}
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
  width: "100%",
  // height: moderateScale(40),
 padding:ms(12),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
 },
 welcome: {
  fontSize: 34,
  fontFamily: fonts.semiBold
 },
 quizCard: {
  flexDirection: 'row',
  backgroundColor: '#e8cbbf',
  borderWidth: 1,
  // width: moderateScale(340),
  // height: moderateScale(40),
  borderRadius: 10,
  padding: 8,
  alignItems: 'center',
  margin: 10
 },
 image: {
  width: moderateScale(50),
  height: moderateScale(50),
  marginRight: moderateScale(15),
  left: responsiveScreenWidth(2),
  borderRadius: 10
 },
 content: {
  width: moderateScale(250),
  left: moderateScale(12)
 },
 quizTitle: {
  fontFamily: fonts.medium,
  fontSize: 14,
  marginBottom: 4
 },
 description: {
  fontSize: 14,
  color: '#333',
  marginBottom: 10
 },
 button: {
  backgroundColor: '#000',
  padding: 6,
  width: moderateScale(80),
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'flex-start'
 },
 buttonText: {
  color: '#fff',
  fontSize: 13,
  bottom: moderateScale(1),
  fontFamily: fonts.medium
 },
 selectSubtitle: {
  fontFamily: fonts.medium,
  marginVertical: 1,
  fontSize: 18,
  color: colors.textColor,
  textDecorationLine: 'underline',
  textDecorationColor: colors.black
 },
 subtitle: {
  fontFamily: fonts.regular,
  marginVertical: 1,
  fontSize: 15,
  top: 3,
  color: colors.textColor,
  textDecorationLine: 'underline',
  textDecorationColor: colors.black
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
 overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent dark background
  justifyContent: 'center',
  alignItems: 'center'
 },
 popup: {
  backgroundColor: 'white', // dark popup
  paddingVertical: 20,
  paddingHorizontal: 30,
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center'
 },
 text: {
  color: colors.black,
  marginLeft: 10,
  fontSize: 16
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
  fontFamily: fonts.medium
 },
 body: {
  backgroundColor: '#f7e3d9',
  // width: moderateScale(340),
  //   height: moderateScale(40),
  padding: ms(12),
  flexDirection: 'row',
  // justifyContent:'space-between',
  alignItems: 'center'
 },
 bodyText: {
  color: '#000',
  fontFamily: fonts.regular,
  fontSize: 13
 },
 bottomButton: {
  width: '45%',
  backgroundColor: colors.black,
  borderRadius: 10,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center'
 },
 bottomText: {
  color: colors.white,
  fontSize: 14,
  fontFamily: fonts.regular
 }
});
