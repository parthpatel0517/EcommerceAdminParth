
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { horizontalScale, moderateScale, verticalScale } from "../../assets/Metrics/Metrics";
import OrderDetail from "../OrderDetail/OrderDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Order from '../Order/Order';

const Stack = createNativeStackNavigator();

function Customback({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      title="Info"
      color="#fff"
    ><MaterialIcons name="chevron-left" size={40} color="black" /></TouchableOpacity>
  )
}

function Productcardbar({ navigation }) {
  return (
    <View style={styles.ArrowView}>
      <TouchableOpacity style={styles.KeyboardArrow}><MaterialIcons name="keyboard-arrow-left" size={50} color="black" /></TouchableOpacity>
      <Text style={styles.ArrowText}>Short dress</Text>
      <TouchableOpacity ><MaterialIcons name="share" size={30} color="black" style={{ marginTop: 27 }} /></TouchableOpacity>
    </View>
  )
}

export const Orderstack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
             <Stack.Screen
        name="Order"
        component={Order}
  
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
  
      />

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  ArrowView: {
    width: '100%',
    height: 80,
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ArrowText: {
    color: 'black',
    fontSize:23,
    marginTop: 28,
    fontFamily: 'Metropolis-SemiBold'
  },
  KeyboardArrow: {
    marginTop: 16,
    marginLeft: -15
  },
})