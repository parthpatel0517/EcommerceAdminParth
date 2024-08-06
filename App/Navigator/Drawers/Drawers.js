import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'
import Categorys from '../../Category/Categorys';
import Subcategory from '../../Subcategory/Subcategory';
import Product from '../../Product/Product';
import Validation from '../../Practice/Validation';
import CategoryFire from '../../CategoryFire/CategoryFire';
import Brand from '../../Container/Brand/Brand';
import Color from '../../Container/Color/Color';

const Drawer = createDrawerNavigator();

export default function Drawers() {
  return (

    <Drawer.Navigator>
      <Drawer.Screen name="Product" component={Product} />
      <Drawer.Screen name="Color" component={Color} />
      <Drawer.Screen name="Brand" component={Brand} />
      <Drawer.Screen name="Validation" component={Validation} />
      <Drawer.Screen name="Categorys" component={Categorys} />
      <Drawer.Screen name="Subcategory" component={Subcategory} />
      <Drawer.Screen name="CategoryFire" component={CategoryFire} />

    </Drawer.Navigator>

  )
}