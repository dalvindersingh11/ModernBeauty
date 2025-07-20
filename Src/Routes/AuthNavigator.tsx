import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/Login/Login';
import SignUpScreen from '../Screens/SignUp/Signup';
import OtpScreen from '../Screens/OtpScreen/OtpScreens';
import TrialAccessScreen from '../Screens/TrialScreen/TrialScreen';
import ForgotPassword from '../Screens/ForgotPassword/ForgotPassword';
import StudentCourseList from '../Screens/StudentCourseList/StudentCourseList';
import StudentCode from '../Screens/StudentCode.tsx/StudentCode';

const Stack = createStackNavigator();

const AuthNavigator = () => {
 return (
  <Stack.Navigator
   initialRouteName="Login"
   screenOptions={{ headerShown: false }}>
   <Stack.Screen
    name="Login"
    component={LoginScreen}
    options={{ headerShown: false }}
   />
 
   <Stack.Screen
    name="StudentCode"
    component={StudentCode}
    options={{ headerShown: false }}
   />
   <Stack.Screen
    name="SignUp"
    component={SignUpScreen}
    options={{ headerShown: false }}
   />
   <Stack.Screen
    name="ForgotPassword"
    component={ForgotPassword}
    options={{ headerShown: false }}
   />
   <Stack.Screen
    name="OtpScreen"
    component={OtpScreen}
    options={{ headerShown: false }}
   />
   <Stack.Screen name="TrialAccessScreen" component={TrialAccessScreen} />
  </Stack.Navigator>
 );
};

export default AuthNavigator;
