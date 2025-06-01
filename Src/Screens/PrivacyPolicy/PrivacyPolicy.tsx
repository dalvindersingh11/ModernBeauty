import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  APP_LOGO,
  BACKICON,
  USER,
} from '../../Constant/Icons';
import Styles from './Styles'; // Imported stylesheet
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={Styles.safeArea}>
      <View style={Styles.container}>
    
        {/* Header */}
        {/* <View style={Styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={BACKICON} style={Styles.backIcon} />
          </TouchableOpacity> */}

          <Text allowFontScaling={true} style={Styles.title}>
            Privacy Policy
          </Text>
          {/* <View style={Styles.emptySpace} />
        </View> */}

        {/* Description */}
        <Text allowFontScaling={true} style={Styles.description}>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
          The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, 
          as opposed to using 'Content here, content here', making it look like readable English. 
          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, 
          and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
          Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          
          {"\n"}{"\n"}
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
          The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, 
          as opposed to using 'Content here, content here', making it look like readable English. 
          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, 
          and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
          Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

          {"\n"}{"\n"}
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
          The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, 
          as opposed to using 'Content here, content here', making it look like readable English. 
          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, 
          and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
          Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

          {"\n\n"}
          Contact Us For More:
          {"\n"}Email: email@gmail.com
          {"\n"}Phone: 9874563210
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
