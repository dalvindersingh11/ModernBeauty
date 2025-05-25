import React from 'react';
import { ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { SPLASH } from '../../Constant/Icons';
import colors from '../../Constant/colors';

export default function SplashScreen() {
 return (
  <SafeAreaView
   style={{
    flex: 1,
    backgroundColor: colors.backgrounColor
   }}>
   <ImageBackground
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    source={SPLASH}
   />
  </SafeAreaView>
 );
}
