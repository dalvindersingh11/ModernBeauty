import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './AuthNavigator';
import MainStackNavigator from './MainStackNavigator';

const Stack = createStackNavigator();

const AppNavigator = ({ initialRouteName }: any) => {
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
