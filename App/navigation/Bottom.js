import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react'
import Signup from '../container/Signup/Signup';
import SubCategories2 from '../container/shhoping/Shopping';
import HomePage from '../container/Home_page/HomePage';
import Favorites from '../container/favorites/Favorites';
import { Favoritestack, Homestack, Mybagstack, Orderstack, Profilestack, Shoppingstack, Subcategorystack, shoppingstack, subcategorystack } from './stacknavigator';
import My_Bag from '../container/mybag/My_Bag';
import My_Profile from '../container/myprofile/My_Profile';
import { useSelector } from 'react-redux';
import Login from '../container/Login/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import Loginwithnumber from '../container/PhonenoLogin/Loginwithnumber';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Bottom() {

  const auth = useSelector(state => state.auth)
  // console.log("akkskskskksskskks", auth);
  function Customback({ navigation }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        title="Info"
        color="#fff"
      ><MaterialIcons name="chevron-left" size={40} color="black" /></TouchableOpacity>
    )
  }
  return (

   
      <Tab.Navigator>

        <Tab.Screen options={{
          headerShown: false,
          tabBarLabel: 'Order',

        }} name="ProfileTab" component={Orderstack} />


      </Tab.Navigator>
     
  )
}

