import React, { useState } from 'react';
import {
 View,
 Text,
 TouchableOpacity,
 Image,
 SafeAreaView
} from 'react-native';
import { moderateScale, ms, mvs } from 'react-native-size-matters';
import Video from 'react-native-video';
import {
 APP_LOGO,
 MENUICON,
 TIMEICON,
 USER,
 VIDEOICON
} from '../../Constant/Icons';
import colors from '../../Constant/colors';
import fonts from '../../Constant/Fonts';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from './Styles';
import Orientation from 'react-native-orientation-locker';
export default function SingleCoursePlayer() {
 const [playVideo, setPlayVideo] = useState(false);
 const navigation = useNavigation<any>();
 return (
  <SafeAreaView style={Styles.container}>
   <View style={{gap:mvs(14),width:"90%",alignSelf:'center',paddingHorizontal:ms(10),marginTop:mvs(20)}}>
    
    <Text allowFontScaling={true} style={Styles.title}>
     Hair Courses
    </Text>

    {/* Video or Play Button */}
    <View style={Styles.videoBox}>
     {playVideo ? (
         <Video
  source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
  style={{
  width: '100%',
  height: '100%'
 }}
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
       style={Styles.playButton}>
       <FontAwesome
        name="play"
        size={20}
        color={colors.white}
        style={{ left: 2, top: 1 }}
       />
      </TouchableOpacity>
     )}
    </View>
    <Text allowFontScaling={true} style={Styles.title}>
     Hair Courses
    </Text>
    <Text allowFontScaling={false} style={Styles.subtitle}>
     Contrary to popular belief, Lorem Ipsum is not simply random text. It has
     roots in a piece of classical Latin literature from 45 BC, making it over
     2000 years old.
    </Text>
    <View style={{ flexDirection: 'row' }}>
     <Image
      source={VIDEOICON}
      style={{
       height: mvs(73),
       width: ms(130),
       borderRadius: 3,
       resizeMode: 'contain'
      }}
     />
     <View style={{ gap: 10, padding: ms(8) }}>
      <Text allowFontScaling={true} style={Styles.title}>
       Lesson 2
      </Text>
      <View style={{ flexDirection: 'row', gap: ms(20) }}>
       <View
        style={{
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center'
        }}>
        <Image
         source={TIMEICON}
         style={{
          height: mvs(12),
          width: ms(13),
          borderRadius: 3,
          resizeMode: 'contain'
         }}
        />
        <Text
         allowFontScaling={true}
         style={{
          fontSize: ms(10),
          fontFamily: fonts.medium,
          fontWeight: '500',
          marginHorizontal: ms(5),
          color: '#000'
         }}>
         3h 45m
        </Text>
       </View>
       <View
        style={{
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center'
        }}>
        <Image
         source={MENUICON}
         style={{
          height: mvs(12),
          width: ms(13),
          borderRadius: 3,
          resizeMode: 'contain'
         }}
        />
        <Text
         allowFontScaling={true}
         style={{
          fontSize: ms(10),
          fontFamily: fonts.medium,
          fontWeight: '500',
          marginHorizontal: ms(5),
          color: '#000'
         }}>
         20 Lessons
        </Text>
       </View>
      </View>
     </View>
    </View>
    {/* REPEAT DATA */}
    <View style={{ flexDirection: 'row' }}>
     <Image
      source={VIDEOICON}
      style={{
       height: mvs(73),
       width: ms(130),
       borderRadius: 3,
       resizeMode: 'contain'
      }}
     />
     <View style={{ gap: 10, padding: ms(8) }}>
      <Text allowFontScaling={true} style={Styles.title}>
       Lesson 3
      </Text>
      <View style={{ flexDirection: 'row', gap: ms(20) }}>
       <View
        style={{
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center'
        }}>
        <Image
         source={TIMEICON}
         style={{
          height: mvs(12),
          width: ms(13),
          borderRadius: 3,
          resizeMode: 'contain'
         }}
        />
        <Text
         allowFontScaling={true}
         style={{
          fontSize: ms(10),
          fontFamily: fonts.medium,
          fontWeight: '500',
          marginHorizontal: ms(5),
          color: '#000'
         }}>
         3h 45m
        </Text>
       </View>
       <View
        style={{
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center'
        }}>
        <Image
         source={MENUICON}
         style={{
          height: mvs(12),
          width: ms(13),
          borderRadius: 3,
          resizeMode: 'contain'
         }}
        />
        <Text
         allowFontScaling={true}
         style={{
          fontSize: ms(10),
          fontFamily: fonts.medium,
          fontWeight: '500',
          marginHorizontal: ms(5),
          color: '#000'
         }}>
         20 Lessons
        </Text>
       </View>
      </View>
     </View>
    </View>
   </View>
  </SafeAreaView>
 );
}
