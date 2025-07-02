import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './Src/Routes/AppNavigator';
import SplashScreen from './Src/Screens/SplashScreen/SplashScreen';
import { Provider } from 'react-redux';
import store from './Src/store.tsx/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './Src/Routes/AppNavigator';
import Orientation from 'react-native-orientation-locker';

function App() {
 const [showSplash, setShowSplash] = useState(true);
useEffect(() => {
  Orientation.lockToPortrait();
}, []);

 useEffect(() => {
  // Wait for 3 seconds then hide splash
  const timer = setTimeout(() => {
   setShowSplash(false);
  }, 3000);

  return () => clearTimeout(timer); // cleanup on unmount
 }, []);

 const [token, setToken] = useState<string | null>(null);
 const [otpVerified, setOtpVerified] = useState<string | null>(null);
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const checkAuthToken = async () => {
   try {
    // const token = 'ajshdkahskdhakshdkahskdhhkajsh12';
    const token = await AsyncStorage.getItem('token');
    console.log('is token available', token);
    setIsAuthenticated(!!token); // Set to true if token exists
   } catch (error) {
    console.error('Failed to fetch token:', error);
   } finally {
    setLoading(false); // End loading after token check
   }
  };

  checkAuthToken();
 }, []);

 if (loading) {
  return null; // Replace with a loading spinner if needed
 }
 console.log('isauthentcated', isAuthenticated);

 //  const isAuthenticated = token && otpVerified === 'true';

 return (
  <>
   {showSplash ? (
    <SplashScreen />
   ) : (
    <Provider store={store}>
     <NavigationContainer>
      <AppNavigator initialRouteName={isAuthenticated ? "main" : "auth"}/>
     </NavigationContainer>
    </Provider>
   )}
  </>
 );
}

export default App;
{
 /* <AppNavigator initialRouteName={isAuthenticated ? 'main' : 'auth'} />
  */
}
