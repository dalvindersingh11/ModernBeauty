// import React, { useEffect, useState } from 'react';
// import {
//  View,
//  Text,
//  StyleSheet,
//  TouchableOpacity,
//  Image,
//  FlatList,
//  ActivityIndicator,
//  Alert,
//  Pressable
// } from 'react-native';
// import { moderateScale, ms, mvs } from 'react-native-size-matters';
// import colors from '../../Constant/colors';
// import fonts from '../../Constant/Fonts';
// import { useNavigation } from '@react-navigation/native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import TopHeader from '../../Component/TopHeader/TopHeader';
// import Orientation from 'react-native-orientation-locker';
// import Video from 'react-native-video';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {
//  responsiveScreenHeight,
//  responsiveScreenWidth
// } from 'react-native-responsive-dimensions';
// import { VIDEOICON } from '../../Constant/Icons';

// export default function NonStudentTrialScreen() {
//  const [courses, setCourses] = useState<any>([]);
//  const [loading, setLoading] = useState(true);
//  const [playingVideoId, setPlayingVideoId] = useState(null);
//  const navigation = useNavigation<any>();

//  const fetchCourses = async () => {
//   try {
//    const token = await AsyncStorage.getItem('token');
//    if (!token) {
//     Alert.alert('Error', 'User token not found');
//     return;
//    }

//    const response = await axios.get(
//     'https://api.addmelocal.in/api/trial_courses',
//     {
//      headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Authorization: `Bearer ${token}`
//      }
//     }
//    );

//    console.log('✅ Courses:', response.data?.data);
//    setCourses(response.data?.data || []);
//   } catch (err: any) {
//    console.error('❌ API Error:', err.response?.data || err.message);
//    Alert.alert('API Error', err.response?.data?.message || err.message);
//   } finally {
//    setLoading(false);
//   }
//  };

//  useEffect(() => {
//   fetchCourses();
//  }, []);

//  const renderItem = ({ item }: any) => (
//   <Pressable
//    onPress={() =>
//     navigation?.navigate('TrialAccessScreen', {
//      item: item
//     })
//    }
//    style={styles.courseCard}>
//    <View style={styles.videoBox}>
//     <Image
//      style={{ width: moderateScale(80), height: moderateScale(80) }}
//      source={VIDEOICON}
//     />
//    </View>
//    <View
//     style={{ flex: 1, marginLeft: 12, marginTop: responsiveScreenHeight(2) }}>
//     <View style={{ left: responsiveScreenWidth(3) }}>
//      <Text allowFontScaling={false} style={styles.title}>
//       {item.title}
//      </Text>

//      <Text style={styles.duration}>
//       <Text allowFontScaling={false} style={{ fontFamily: fonts.medium }}>
//        Duration:-
//       </Text>
//       <Text>
//        {item.duration}
//        min
//       </Text>
//      </Text>
//      <View style={{ width: moderateScale(230) }}>
//       <Text
//        allowFontScaling={false}
//        style={styles.description}
//        numberOfLines={2}>
//        {item.description?.replace(/<[^>]*>?/gm, '')}
//       </Text>
//      </View>
//     </View>
//    </View>
//   </Pressable>
//  );

//  return (
//   <View style={styles.container}>
//    <TopHeader />
//    <Text allowFontScaling={false} style={styles.subtitle}>
//     This is your Level 1 Trial access.{'\n'}Get a sneak peek of the course!
//    </Text>

//    {loading ? (
//     <ActivityIndicator size="large" color={'black'} style={{ marginTop: 30 }} />
//    ) : courses.length === 0 ? (
//     <Text allowFontScaling={false} style={{ marginTop: 40, color: 'gray' }}>
//      No trial courses available.
//     </Text>
//    ) : (
//     <FlatList
//      data={courses[0]?.lessons}
//      keyExtractor={(item) => item.id.toString()}
//      renderItem={renderItem}
//      style={{ flex: 1 }}
//      contentContainerStyle={{
//       paddingBottom: 80,
//       flex: 1,
//       width: '100%',
//       alignSelf: 'center',
//       marginTop: responsiveScreenHeight(5)
//      }}
//      showsVerticalScrollIndicator={false}
//      bounces={false}
//      ListEmptyComponent={
//       <View
//        style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: responsiveScreenHeight(10)
//        }}>
//        <Text
//         allowFontScaling={false}
//         style={{
//          color: colors.black,
//          fontFamily: fonts.regular,
//          fontSize: 14
//         }}>
//         No Courses Found
//        </Text>
//       </View>
//      }
//     />
//    )}

//    {loading == false ? (
//     <View
//      style={{
//       flexDirection: 'row',
//       width: '90%',
//       justifyContent: 'space-between',
//       marginBottom: mvs(30),
//       alignSelf: 'center'
//      }}>
//      <TouchableOpacity
//       onPress={() => navigation?.navigate('RequetsAccess')}
//       style={styles.levelButton}>
//       <Text style={styles.levelText}>Request</Text>
//      </TouchableOpacity>
//      <TouchableOpacity
//       onPress={() => navigation?.navigate('QuizScreen')}
//       style={[styles.levelButton]}>
//       <Text style={styles.levelText}>Access to Quiz</Text>
//      </TouchableOpacity>
//     </View>
//    ) : null}
//   </View>
//  );
// }

// const styles = StyleSheet.create({
//  container: {
//   flex: 1,
//   backgroundColor: colors.backgrounColor,
//   // alignItems: 'center',
//   paddingHorizontal: ms(10)
//  },
//  welcome: {
//   fontSize: 34,
//   fontFamily: fonts.semiBold,
//   alignSelf: 'center',
//   marginTop: mvs(30)
//  },
//  subtitle: {
//   fontFamily: fonts.medium,
//   marginVertical: 15,
//   fontSize: 15,
//   color: colors.textColor,
//   textAlign: 'center'
//  },
//  courseCard: {
//   padding: 12,
//   marginVertical: 10,
//   // backgroundColor: '#fff',
//   borderRadius: 10,
//   flexDirection: 'row',
//   alignItems: 'center',
//   alignSelf: 'center',
//   width: '100%'
//  },
//  videoBox: {
//   width: moderateScale(100),
//   height: moderateScale(80),
//   backgroundColor: '#000',
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: responsiveScreenHeight(3)
//  },
//  playButton: {
//   backgroundColor: colors.tomato,
//   width: moderateScale(28),
//   height: moderateScale(28),
//   borderRadius: 30,
//   justifyContent: 'center',
//   alignItems: 'center'
//  },
//  video: {
//   width: '100%',
//   height: '100%',
//   borderRadius: 8
//  },
//  title: {
//   color: colors.black,
//   fontSize: 14,
//   fontFamily: fonts.bold,
//   marginBottom: 2
//  },
//  duration: {
//   color: colors.black,
//   fontSize: 11,
//   fontFamily: fonts.regular,
//   marginBottom: 4
//  },
//  description: {
//   color: colors.black,
//   fontSize: 10,
//   fontFamily: fonts.regular
//  },
//  levelButton: {
//   width: '45%',
//   backgroundColor: colors.black,
//   borderRadius: 10,
//   padding: 10,
//   justifyContent: 'center',
//   alignItems: 'center'
//  },
//  levelText: {
//   color: colors.white,
//   fontSize: 14,
//   fontFamily: fonts.regular
//  }
// });
// TrialAccessScreen.tsx
