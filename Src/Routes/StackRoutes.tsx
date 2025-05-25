// StackRoutes.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/Login/Login';
import SignUpScreen from '../Screens/SignUp/Signup';
import OtpScreen from '../Screens/OtpScreen/OtpScreens';
import TrialAccessScreen from '../Screens/TrialScreen/TrialScreen';
import PlanScreen from '../Screens/PlanScreen/PlanScreen';
import PaymentScreen from '../Screens/PaymentScreen/PaymentScreen';
const Stack = createStackNavigator();

const MyStack = () => {
 return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
   <Stack.Screen name="Login" component={LoginScreen} />
   <Stack.Screen name="SignUp" component={SignUpScreen} />
   <Stack.Screen name="OtpScreen" component={OtpScreen} />
   <Stack.Screen name="TrialAccessScreen" component={TrialAccessScreen} />
   <Stack.Screen name="PlanScreen" component={PlanScreen} />
   <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
  </Stack.Navigator>
 );
};

export default MyStack;
