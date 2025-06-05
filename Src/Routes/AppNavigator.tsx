import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TopHeader from '../Component/TopHeader/TopHeader';
import AuthNavigator from './AuthNavigator';
import MainStackNavigator from './MainStackNavigator';
import MyStack from './StackRoutes';

const Stack = createStackNavigator();

const AppNavigator = ({ initialRouteName }: any) => {
 return <MyStack />;
};

export default AppNavigator;
