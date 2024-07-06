import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from 'react'
import Category from './App/Drawers/Drawers';
import Drawers from './App/Drawers/Drawers';
import { configurestore } from './App/redux/store';
import Counter from './App/Counter/Counter';
import { Provider } from 'react-redux';



export default function App() {
  const store = configurestore()
  return (
    <Provider store={store}>
    {/* <NavigationContainer>
        <Drawers></Drawers>
    </NavigationContainer> */}
    <Counter></Counter>
    </Provider>
  
   
  )
}