import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './Src/Routes/StackRoutes';
import SplashScreen from './Src/Screens/SplashScreen/SplashScreen';

function App() {
 const [showSplash, setShowSplash] = useState(true);

 useEffect(() => {
  // Wait for 3 seconds then hide splash
  const timer = setTimeout(() => {
   setShowSplash(false);
  }, 3000);

  return () => clearTimeout(timer); // cleanup on unmount
 }, []);

 return (
  <>
   {showSplash ? (
    <SplashScreen />
   ) : (
    <NavigationContainer>
     <MyStack />
    </NavigationContainer>
   )}
  </>
 );
}

export default App;
