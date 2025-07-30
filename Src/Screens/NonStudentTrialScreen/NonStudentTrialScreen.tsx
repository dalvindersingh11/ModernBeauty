import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 TouchableOpacity,
 Image,
 FlatList,
 ActivityIndicator,
 Alert
} from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopHeader from '../../Component/TopHeader/TopHeader';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function NonStudentTrialScreen() {
 const [courses, setCourses] = useState([]);
 const [loading, setLoading] = useState(true);
 const [playingVideoId, setPlayingVideoId] = useState(null);
 const navigation = useNavigation<any>();

 const fetchCourses = async () => {
  try {
   const token = await AsyncStorage.getItem('token');
   if (!token) {
    Alert.alert('Error', 'User token not found');
    return;
   }

   const response = await axios.get(
    'https://api.addmelocal.in/api/trial_courses',
    {
     headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
     }
    }
   );

   console.log('✅ Courses:', response.data?.data);
   setCourses(response.data?.data || []);
  } catch (err: any) {
   console.error('❌ API Error:', err.response?.data || err.message);
   Alert.alert('API Error', err.response?.data?.message || err.message);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchCourses();
 }, []);

 const renderItem = ({ item }: any) => (
  <View style={styles.courseCard}>
   <View style={styles.videoBox}>
    {item.demo_video_source && item.demo_video_storage === 'youtube' ? (
     playingVideoId === item.id ? (
      <Video
       source={{ uri: item.demo_video_source }}
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
       onPress={() => setPlayingVideoId(item.id)}
       style={styles.playButton}>
       <FontAwesome name="play" size={16} color={colors.white} />
      </TouchableOpacity>
     )
    ) : (
     <Image
      source={{ uri: `https://api.addmelocal.in${item.thumbnail}` }}
      style={styles.video}
      resizeMode="cover"
     />
    )}
   </View>
   <View style={{ flex: 1, marginLeft: 12 }}>
    <Text style={styles.title}>{item.title}</Text>

    <Text style={styles.duration}>Duration: {item.duration} min</Text>
    <Text style={styles.description} numberOfLines={4}>
     {item.description?.replace(/<[^>]*>?/gm, '')}
    </Text>
   </View>
  </View>
 );

 return (
  <View style={styles.container}>
   <TopHeader />
   <Text style={styles.welcome}>For non Student</Text>
   <Text style={styles.subtitle}>
    This is your Level 1 Trial access.{'\n'}Get a sneak peek of the course!
   </Text>

   {loading ? (
    <ActivityIndicator size="large" color={'blue'} style={{ marginTop: 30 }} />
   ) : courses.length === 0 ? (
    <Text style={{ marginTop: 40, color: 'gray' }}>
     No trial courses available.
    </Text>
   ) : (
    <FlatList
     data={courses}
     keyExtractor={(item) => item.id.toString()}
     renderItem={renderItem}
     style={{ flex: 1 }}
     contentContainerStyle={{ paddingBottom: 80, flex: 1, width: '100%' }}
     showsVerticalScrollIndicator={false}
     bounces={false}
    />
   )}

   <View
    style={{
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom: mvs(30)
    }}>
    <TouchableOpacity
     onPress={() => navigation?.navigate('PlanScreen')}
     style={styles.levelButton}>
     <Text style={styles.levelText}>Request</Text>
    </TouchableOpacity>
    <TouchableOpacity
     onPress={() => navigation?.navigate('PlanScreen')}
     style={[styles.levelButton, { flex: 1, marginLeft: 10 }]}>
     <Text style={styles.levelText}>Access to Quiz</Text>
    </TouchableOpacity>
   </View>
  </View>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
  // alignItems: 'center',
  paddingHorizontal:ms(10),
 },
 welcome: {
  fontSize: 34,
  fontFamily: fonts.semiBold,
  alignSelf: 'center',
  marginTop: mvs(30)
 },
 subtitle: {
  fontFamily: fonts.regular,
  marginVertical: 15,
  fontSize: 13,
  color: colors.textColor,
  textAlign: 'center'
 },
 courseCard: {
  padding: 12,
  marginVertical: 10,
  // backgroundColor: '#fff',
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  width: '100%'
 },
 videoBox: {
  width: 106,
  height: 59,
  borderRadius: 8,
  backgroundColor: '#eee',
  justifyContent: 'center',
  alignItems: 'center'
 },
 playButton: {
  backgroundColor: colors.tomato,
  width: moderateScale(28),
  height: moderateScale(28),
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center'
 },
 video: {
  width: '100%',
  height: '100%',
  borderRadius: 8
 },
 title: {
 color: colors.black,
  fontSize: 14,
  fontFamily: fonts.bold,
  marginBottom: 2,
 },
 duration: {
 color: colors.black,
  fontSize: 11,
  fontFamily: fonts.regular,
  marginBottom: 4
 },
 description: {
  color: colors.black,
  fontSize: 10,
  fontFamily: fonts.regular,
 },
 levelButton: {
  width: '40%',
  backgroundColor: colors.black,
  borderRadius: 10,
  padding: 10,
  justifyContent: 'center',
  alignItems: 'center'
 },
 levelText: {
 color: colors.white,
  fontSize: 14,
  fontFamily: fonts.regular,
 }
});
