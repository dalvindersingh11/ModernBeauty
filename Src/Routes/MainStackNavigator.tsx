import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
import TopHeader from '../Component/TopHeader/TopHeader';
import CourseListIndex from '../Screens/CourseList/CourseListIndex';

const Stack = createStackNavigator();
const MainStackNavigator = () => {
 return (
  <Stack.Navigator
   //    initialRouteName="landingMeal"
   //    screenOptions={({ navigation }) => ({
   //     header: () => <Header backOnPress={() => navigation.goBack()} />,
   //    })}
   screenOptions={{
    header: ({ navigation }) => (
     <TopHeader backOnPress={() => navigation.goBack()} />
    )
   }}>
   <Stack.Screen
    name="TrialAccessScreen"
    component={TrialAccessScreen}
    // options={({ navigation }) => ({
    //  header: () =>
    //   isAuthenticated ? (
    //    <TopHeader backOnPress={() => navigation.goBack()} />
    //   ) : (
    //    <TopHeader />
    //   )
    // })}
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
  </Stack.Navigator>
 );
};

export default MainStackNavigator;
