import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopHeader from '../Component/TopHeader/TopHeader';
import { useNavigation } from '@react-navigation/native';

// All screen imports...
import TrialAccessScreen from '../Screens/TrialScreen/TrialScreen';
import PlanScreen from '../Screens/PlanScreen/PlanScreen';
import PaymentScreen from '../Screens/PaymentScreen/PaymentScreen';
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
import CourseListIndex from '../Screens/CourseList/CourseListIndex';
import OtpScreen from '../Screens/OtpScreen/OtpScreens';
import StudentCode from '../Screens/StudentCode.tsx/StudentCode';
import StudentCourseList from '../Screens/StudentCourseList/StudentCourseList';
import ContentCourse from '../Screens/ContentSourse/ContentCourse';
import StudentQuiz from '../Screens/StudentQuiz/StudentQuiz';
import TicketReply from '../Screens/TicketReply/TicketReply';
import QuizScreen from '../Screens/Quiz/Quiz';
import NonStudentTrialScreen from '../Screens/NonStudentTrialScreen/NonStudentTrialScreen';
import RequetsAccess from '../Screens/RequestAccess/RequestAccess';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
 const [initialRoute, setInitialRoute] = useState<string | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const checkCodeSubmitted = async () => {
   try {
    const codeSubmitted = await AsyncStorage.getItem('codeSubmitted');
    const userType = await AsyncStorage.getItem('userType');

    if (userType === '0') {
     setInitialRoute('NonStudentTrialScreen');
    } else if (userType === '1') {
     if (codeSubmitted === 'true') {
      setInitialRoute('StudentCourseList');
     } else {
      setInitialRoute('StudentCode');
     }
    } else {
     // fallback route if userType is something unexpected
     setInitialRoute('NonStudentTrialScreen');
    }
   } catch (err) {
    console.error('Error checking AsyncStorage:', err);
    setInitialRoute('NonStudentTrialScreen');
   } finally {
    setLoading(false);
   }
  };

  checkCodeSubmitted();
 }, []);

 if (loading || !initialRoute) {
  return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
   </View>
  );
 }

 return (
  <Stack.Navigator
   initialRouteName={initialRoute}
   screenOptions={{
    header: ({ navigation }) => (
     <TopHeader backOnPress={() => navigation.goBack()} />
    )
   }}>
   {/* All your screen definitions */}
   <Stack.Screen
    name="StudentCode"
    component={StudentCode}
    options={{ headerShown: false }}
   />
   <Stack.Screen
    name="QuizScreen"
    component={QuizScreen}
    options={{ headerShown: false }}
   />

   <Stack.Screen
    name="StudentCourseList"
    component={StudentCourseList}
    options={{ headerShown: false }}
   />
   <Stack.Screen
    name="ContentCourse"
    component={ContentCourse}
    options={{ headerShown: false }}
   />
   <Stack.Screen name="PlanScreen" component={PlanScreen} />
   <Stack.Screen name="OtpScreen" component={OtpScreen} />
   <Stack.Screen
    name="PaymentScreen"
    component={PaymentScreen}
    options={{ headerShown: false }}
   />
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
   <Stack.Screen name="RequetsAccess" component={RequetsAccess} />
   <Stack.Screen name="TrialAccessScreen" component={TrialAccessScreen} />
   <Stack.Screen
    name="NonStudentTrialScreen"
    component={NonStudentTrialScreen}
    options={{ headerShown: false }}
   />
   <Stack.Screen name="TicketReply" component={TicketReply} />
   <Stack.Screen name="StudentQuiz" component={StudentQuiz} />
  </Stack.Navigator>
 );
};

export default MainStackNavigator;
