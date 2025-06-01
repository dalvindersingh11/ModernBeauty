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
import { useNavigation } from '@react-navigation/native';
import Styles from './Styles';
import { APP_LOGO, FOLDER, USER } from '../../../Constant/Icons';

const HairCourses = () => {
 const navigation = useNavigation();

 const originalData = [
  { key: '1', title: 'Title1', image: FOLDER, screenName: 'ViewFolder' },
  { key: '2', title: 'Title2', image: FOLDER, screenName: 'ViewFolder' },
  { key: '3', title: 'Title3', image: FOLDER, screenName: 'ViewFolder' },
  { key: '4', title: 'Title4', image: FOLDER, screenName: 'ViewFolder' },
  { key: '5', title: 'Title5', image: FOLDER, screenName: 'NailCourses' },
  { key: '6', title: 'Title6', image: FOLDER, screenName: 'MakeupCourses' },
  { key: '7', title: 'Title7', image: FOLDER, screenName: 'NailCourses' },
  { key: '8', title: 'Title8', image: FOLDER, screenName: 'NailCourses' },
  { key: '9', title: 'Title9', image: FOLDER, screenName: 'NailCourses' },
  { key: '10', title: 'Title10', image: FOLDER, screenName: 'NailCourses' },
  { key: '11', title: 'Title11', image: FOLDER, screenName: 'NailCourses' },
  { key: '12', title: 'Title12', image: FOLDER, screenName: 'NailCourses' },
  { key: '13', title: 'Title13', image: FOLDER, screenName: 'NailCourses' },
  { key: '14', title: 'Title14', image: FOLDER, screenName: 'NailCourses' },
  { key: '15', title: 'Title15', image: FOLDER, screenName: 'NailCourses' },
  { key: '16', title: 'Title16', image: FOLDER, screenName: 'NailCourses' },
  { key: '17', title: 'Title17', image: FOLDER, screenName: 'NailCourses' }
 ];

 const numColumns = 4;
 const data = [...originalData];
 while (data.length % numColumns !== 0) {
  data.push({ key: `blank-${data.length}`, blank: true });
 }

 const renderItem = ({ item }) => {
  if (item.blank) {
   return (
    <View
     style={{
      flex: 1,
      marginBottom: mvs(10),
      marginHorizontal: 4,
      padding: mvs(10),
      backgroundColor: 'transparent'
     }}
    />
   );
  }

  return (
   <View
    style={{
     flex: 1,
     alignItems: 'center',
     marginBottom: mvs(10),
     padding: mvs(10),
     marginHorizontal: 4,
     borderRadius: 8
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
       height: 63,
       width: 48,
       borderRadius: 3,
       resizeMode: 'contain'
      }}
     />
    </TouchableOpacity>

    <TouchableOpacity
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


    <Text allowFontScaling={true} style={Styles.title}>
     Hair Courses
    </Text>

    <FlatList
     bounces={false}
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

export default HairCourses;
