import React from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 SafeAreaView,
 FlatList
} from 'react-native';
import { moderateScale, mvs } from 'react-native-size-matters';
import { APP_LOGO, USER, VIDEOICON } from '../../Constant/Icons';
import { useNavigation } from '@react-navigation/native';
import Styles from './Styles';

const ViewFolder = () => {
 const navigation = useNavigation();

 const originalData = [
  {
   key: '1',
   title: 'Video title',
   image: VIDEOICON,
   screenName: 'SingleCoursePlayer'
  },
  {
   key: '2',
   title: 'Video title',
   image: VIDEOICON,
   screenName: 'SingleCoursePlayer'
  },
  {
   key: '3',
   title: 'Video title',
   image: VIDEOICON,
   screenName: 'HairCourses'
  },
  {
   key: '4',
   title: 'Video title',
   image: VIDEOICON,
   screenName: 'HairCourses'
  },
  {
   key: '5',
   title: 'Video title',
   image: VIDEOICON,
   screenName: 'NailCourses'
  },
  {
   key: '6',
   title: 'Video title',
   image: VIDEOICON,
   screenName: 'MakeupCourses'
  },
  {
   key: '7',
   title: 'Video title',
   image: VIDEOICON,
   screenName: 'NailCourses'
  },
  {
   key: '8',
   title: 'Video title',
   image: VIDEOICON,
   screenName: 'SpaWellnessCourses'
  }
 ];

 const numColumns = 2;
 const data = [...originalData];

 // 👉 Pad with blank item if last row is incomplete
 while (data.length % numColumns !== 0) {
  data.push({ key: `blank-${data.length}`, blank: true });
 }

 const renderItem = ({ item }) => {
  if (item.blank) {
   return <View style={{ flex: 1, margin: mvs(15) }} />;
  }

  return (
   <View
    style={{
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom: mvs(10),
    //  padding: mvs(10),
     marginHorizontal: 4,
     borderRadius: 8,
    }}>
    <TouchableOpacity
     onPress={() =>
      item.screenName
       ? navigation.navigate(item.screenName, { course: item })
       : console.warn('No screenName provided for image.')
     }>
     <Image
      source={item.image}
      style={{
       height: 72,
       width: 128,
       borderRadius: 3,
       resizeMode: 'contain'
      }}
     />
    </TouchableOpacity>

    <TouchableOpacity
    style={{
       width: 128,
alignItems:'flex-start'
    }}
     onPress={() =>
      item.screenName
       ? navigation.navigate(item.screenName, { course: item })
       : console.warn('No screenName provided for text.')
     }>
     <Text style={{ color: '#fff', marginTop: 5, textAlign: 'center' }}>
      {item.title}
     </Text>
    </TouchableOpacity>
   </View>
  );
 };

 return (
  <SafeAreaView style={Styles.container}>
   <View style={[Styles.container, { padding: 20 }]}>
    {/* Header */}
    <View style={Styles.header}>
     <Image
      style={{ height: moderateScale(20), width: moderateScale(76) }}
      source={APP_LOGO}
     />
     <Image source={USER} style={Styles.profileIcon} />
    </View>

    <Text allowFontScaling={true} style={Styles.title}>
     Hair Courses
    </Text>

    <FlatList
     data={data}
     renderItem={renderItem}
     keyExtractor={(item) => item.key}
     numColumns={numColumns}
     columnWrapperStyle={{ justifyContent: 'space-between' }}
     scrollEnabled={originalData.length > 4}
     contentContainerStyle={{ paddingTop: mvs(10) }}
    />
   </View>
  </SafeAreaView>
 );
};

export default ViewFolder;
