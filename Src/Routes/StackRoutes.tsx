import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../Screens/Login/Login';
import SignUpScreen from '../Screens/SignUp/Signup';
import OtpScreen from '../Screens/OtpScreen/OtpScreens';
import TrialAccessScreen from '../Screens/TrialScreen/TrialScreen';
import PlanScreen from '../Screens/PlanScreen/PlanScreen';
import PaymentScreen from '../Screens/PaymentScreen/PaymentScreen';
import CourseListIndex from '../Screens/CourseList/CourseListIndex';
import HairCourses from '../Screens/CourseList/HairCourses/HairCourses';
import ViewFolder from '../Screens/ViewFolder/ViewFolder';
import SingleCoursePlayer from '../Screens/SingleCoursePlayer/SingleCoursePlayer';
import Settings from '../Screens/Settings/Settings';
import EditProfile from '../Screens/EditProfile/EditProfile';
import PrivacyPolicy from '../Screens/PrivacyPolicy/PrivacyPolicy';
import ManageSubscription from '../Screens/ManageSubscription/ManageSubscription';
import HelpSupport from '../Screens/Help&Support/HelpSupport';
import TermsPolicies from '../Screens/TermsPolicies/TermsPolicies';
import AddTicket from '../Screens/AddTicket/AddTicket';
import UpdatePassword from '../Screens/UpdatePassword/UpdatePassword';

import TopHeader from '../Component/TopHeader/TopHeader';

const Stack = createStackNavigator();

const MyStack = () => {
 const [token, setToken] = useState<string | null>(null);
 const [otpVerified, setOtpVerified] = useState<string | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const checkStorage = async () => {
   const storedToken = await AsyncStorage.getItem('token');
   const storedOtp = await AsyncStorage.getItem('otpVerified');
   setToken(storedToken);
   setOtpVerified(storedOtp);
   setLoading(false);
  };
  checkStorage();
 }, []);

 if (loading) return null;

 const isAuthenticated = token && otpVerified === 'true';

 return (
  <Stack.Navigator
   screenOptions={{
    header: ({ navigation }) => (
     <TopHeader backOnPress={() => navigation.goBack()} />
    )
   }}>
   {isAuthenticated ? (
    <>
     <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
     />
     <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{ headerShown: false }}
     />
     <Stack.Screen
      name="OtpScreen"
      component={OtpScreen}
      options={{ headerShown: false }}
     />
     <Stack.Screen name="TrialAccessScreen" component={TrialAccessScreen} />
    </>
   ) : (
    <>
     <Stack.Screen
      name="TrialAccessScreen"
      component={TrialAccessScreen}
      options={({ navigation }) => ({
       header: () =>
        isAuthenticated ? (
         <TopHeader backOnPress={() => navigation.goBack()} />
        ) : (
         <TopHeader />
        )
      })}
     />

     <Stack.Screen name="PlanScreen" component={PlanScreen} />
     <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
     <Stack.Screen name="CourseListIndex" component={CourseListIndex} />
     <Stack.Screen name="HairCourses" component={HairCourses} />
     <Stack.Screen name="ViewFolder" component={ViewFolder} />
     <Stack.Screen name="SingleCoursePlayer" component={SingleCoursePlayer} />
     <Stack.Screen name="Settings" component={Settings} />
     <Stack.Screen name="EditProfile" component={EditProfile} />
     <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
     <Stack.Screen name="ManageSubscription" component={ManageSubscription} />
     <Stack.Screen name="HelpSupport" component={HelpSupport} />
     <Stack.Screen name="TermsPolicies" component={TermsPolicies} />
     <Stack.Screen name="AddTicket" component={AddTicket} />
     <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
    </>
   )}
  </Stack.Navigator>
 );
};

export default MyStack;
