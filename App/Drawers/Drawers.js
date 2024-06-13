import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import Categorys from '../Categorys';
import Subcategory from '../Subcategory';
import Product from '../Product';

const Drawer = createDrawerNavigator();

export default function Drawers() {
  return (
  
    <Drawer.Navigator>
      <Drawer.Screen name="Categorys" component={Categorys} />
      <Drawer.Screen name="Subcategory" component={Subcategory} />
      <Drawer.Screen name="Product" component={Product} />
    </Drawer.Navigator>
   
  )
}