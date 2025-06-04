import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TopHeader from '../Component/TopHeader/TopHeader';
import AuthNavigator from './AuthNavigator';
import MainStackNavigator from './MainStackNavigator';

const Stack = createStackNavigator();

const AppNavigator = ({ initialRouteName }) => {
 return (
  <Stack.Navigator
   initialRouteName={initialRouteName}
   screenOptions={{ headerShown: false }}>
   <Stack.Screen name="auth" component={AuthNavigator} />

   <Stack.Screen name="main" component={MainStackNavigator} />
  </Stack.Navigator>
 );
};

export default AppNavigator;
