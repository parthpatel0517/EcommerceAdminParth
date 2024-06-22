import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import Categorys from '../Category/Categorys';
import Subcategory from '../Subcategory/Subcategory';
import Product from '../Product/Product';
import Validation from '../Practice/Validation';

const Drawer = createDrawerNavigator();

export default function Drawers() {
  return (
  
    <Drawer.Navigator>
       <Drawer.Screen name="Validation" component={Validation} />
      <Drawer.Screen name="Categorys" component={Categorys} />
      <Drawer.Screen name="Subcategory" component={Subcategory} />
      <Drawer.Screen name="Product" component={Product} />
     

    </Drawer.Navigator>
   
  )
}