import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from 'react'
import Category from './App/Drawers/Drawers';
import Drawers from './App/Drawers/Drawers';

export default function App() {
  return (
    
    <NavigationContainer>
        <Drawers></Drawers>
    </NavigationContainer>
  
   
  )
}