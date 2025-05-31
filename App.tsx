import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './Src/Routes/StackRoutes';
import SplashScreen from './Src/Screens/SplashScreen/SplashScreen';
import { Provider } from 'react-redux';
import store from './Src/store.tsx/store';

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
    <Provider store={store}>
     <NavigationContainer>
      <MyStack />
     </NavigationContainer>
    </Provider>
   )}
  </>
 );
}

export default App;
