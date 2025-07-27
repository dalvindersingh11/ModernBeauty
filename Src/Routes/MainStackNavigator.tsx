import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
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
import StudentCourseList from '../Screens/StudentCourseList/StudentCourseList';
import NonStudentTrialScreen from '../Screens/NonStudentTrialScreen/NonStudentTrialScreen';
import StudentCode from '../Screens/StudentCode.tsx/StudentCode';

// Header
import TopHeader from '../Component/TopHeader/TopHeader';
import ContentCourse from '../Screens/ContentSourse/ContentCourse';
import StudentQuiz from '../Screens/StudentQuiz/StudentQuiz';
import TicketReply from '../Screens/TicketReply/TicketReply';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const [userType, setUserType] = useState<number | null>(null);

  useEffect(() => {
    const loadUserType = async () => {
      try {
        const type = await AsyncStorage.getItem('userType');
        const parsedType = parseInt(type || '0', 10);
        setUserType(parsedType);
      } catch (err) {
        console.error('Failed to load userType from storage:', err);
        setUserType(0);
      }
    };
    loadUserType();
  }, []);

  if (userType === null) {
    // Loading screen while userType is fetched
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={userType === 1 ? 'StudentCourseList' : 'StudentCode'}
      screenOptions={{
        header: ({ navigation }) => (
          <TopHeader backOnPress={() => navigation.goBack()} />
        ),
      }}
    >
      <Stack.Screen name="StudentCode" component={StudentCode} options={{ headerShown: false }} />
      <Stack.Screen name="StudentCourseList" component={StudentCourseList} options={{ headerShown: false }} />
      <Stack.Screen name="NonStudentTrialScreen" component={NonStudentTrialScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ContentCourse" component={ContentCourse} options={{ headerShown: false }} />
      <Stack.Screen name="StudentQuiz" component={StudentQuiz} options={{ headerShown: false }} />
      
      <Stack.Screen name="TrialAccessScreen" component={TrialAccessScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PlanScreen" component={PlanScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CourseListIndex" component={CourseListIndex} />
      <Stack.Screen name="HairCourses" component={HairCourses} />
      <Stack.Screen name="ViewFolder" component={ViewFolder} />
      <Stack.Screen name="SingleCoursePlayer" component={SingleCoursePlayer} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="ManageSubscription" component={ManageSubscription} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="TicketReply" component={TicketReply} />
      <Stack.Screen name="TermsPolicies" component={TermsPolicies} />
      <Stack.Screen name="AddTicket" component={AddTicket} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
