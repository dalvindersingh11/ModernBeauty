import React, { useEffect, useState } from 'react';
import {
 View,
 Text,
 FlatList,
 Image,
 TouchableOpacity,
 StyleSheet,
 Dimensions,
 SafeAreaView,
 ActivityIndicator
} from 'react-native';
import { GRID_VIEW, LIST_VIEW } from '../../Constant/Icons';
import { moderateScale } from 'react-native-size-matters';
import fonts from '../../Constant/Fonts';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import colors from '../../Constant/colors';
import TopHeader from '../../Component/TopHeader/TopHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, IMAGE_URL } from '../../Constant/apiUrl';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const StudentCourseList = () => {
 const [isGrid, setIsGrid] = useState(true);
 const [arrData, setArrData] = useState([]);
 const navigation = useNavigation<any>();
 const [loading, setLoading] = useState(false);
 const toggleView = () => setIsGrid(!isGrid);

 const getAllCourse = async () => {
  setLoading(true);
  try {
   const token = await AsyncStorage.getItem('token');
   console.log('Token:', token);

   const response = await fetch(BASE_URL + 'all_courses', {
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
   setLoading(false);
   console.log('course list Data:', data);
  } catch (error) {
   setLoading(false);
   console.error('Error fetching profile:', error);
   // showToast('Something went wrong'); // Optional
  }
 };
 useEffect(() => {
  getAllCourse();
 }, []);
 const renderCourse = ({ item }: any) => (
  <TouchableOpacity
   onPress={() => navigation.navigate('ContentCourse', { id: item?.id })}
   style={isGrid ? styles.gridItem : styles.listItem}>
   <Image
    source={{ uri: IMAGE_URL + item?.thumbnail }}
    style={isGrid ? styles.gridImage : styles.listImage}
   />
   {isGrid && (
    <Text style={styles.courseTitle} numberOfLines={2}>
     {item.title}
    </Text>
   )}
   {!isGrid && (
    <View style={{ width: moderateScale(200) }}>
     <Text style={styles.courseTitle} numberOfLines={2}>
      {item.title}
     </Text>
     <Text style={styles.smallTitle} numberOfLines={2}>
      {item.slug}
     </Text>
    </View>
   )}
  </TouchableOpacity>
 );

 return (
  <SafeAreaView style={styles.container}>
   <View style={{ padding: 12 }}>
    <TopHeader />
   </View>
   <View style={styles.header}>
    <Text style={styles.heading}>Enrolled Courses</Text>
    <View style={styles.toggleIcons}>
     <TouchableOpacity onPress={() => setIsGrid(false)}>
      <Image
       style={isGrid ? styles.gridImageIcon : styles.largeGridImageIcon}
       source={LIST_VIEW}
      />
     </TouchableOpacity>
     <TouchableOpacity
      onPress={() => setIsGrid(true)}
      style={{ marginLeft: 10 }}>
      {/* <Icon name="view-grid" size={24} color={isGrid ? 'black' : 'gray'} /> */}
      <Image
       style={!isGrid ? styles.gridImageIcon : styles.largeGridImageIcon}
       source={GRID_VIEW}
      />
     </TouchableOpacity>
    </View>
   </View>
   {loading ? (
    <View style={{ top: responsiveScreenHeight(10) }}>
     <ActivityIndicator size={30} color={colors.black} />
    </View>
   ) : (
    <FlatList
     data={arrData}
     key={isGrid ? 'g' : 'l'} // Forces re-render on layout change
     keyExtractor={(item) => item.id}
     renderItem={renderCourse}
     numColumns={isGrid ? 3 : 1}
     contentContainerStyle={{
      paddingBottom: 100,
      marginTop: responsiveScreenHeight(3)
     }}
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
   )}
  </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: colors.backgrounColor,
  paddingHorizontal: 8,
  paddingTop: 10
 },
 header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 6,
  width: '94%',
  alignSelf: 'center',
  marginTop: responsiveScreenHeight(5)
 },
 heading: {
  fontSize: 18,
  fontWeight: 'bold'
 },
 toggleIcons: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  width: moderateScale(70)
 },
 gridItem: {
  flex: 1,
  margin: 8,
  alignItems: 'center'
 },
 listItem: {
  flex: 1,
  flexDirection: 'row',
  marginVertical: 8,
  padding: 12,
  alignItems: 'center',
  alignSelf: 'center',
  width: '90%',
  justifyContent: 'space-around'
 },
 gridImage: {
  width: moderateScale(110),
  height: moderateScale(70),
  borderRadius: 6
 },
 listImage: {
  width: moderateScale(110),
  height: moderateScale(70),
  marginRight: 10,
  borderRadius: 6
 },
 courseTitle: {
  fontSize: 12,
  marginTop: 6,
  width: '100%',
  color: colors.black,
  fontFamily: fonts.medium,
  textAlign: 'center'
 },
 smallTitle: {
  fontSize: 12,
  marginTop: 6,
  width: '100%',
  fontFamily: fonts.light,
  color: colors.gray,
  textAlign: 'center'
 },
 gridImageIcon: {
  width: moderateScale(22),
  height: moderateScale(22),
  top: 3
 },
 largeGridImageIcon: {
  width: moderateScale(26),
  height: moderateScale(26)
 }
});

export default StudentCourseList;
