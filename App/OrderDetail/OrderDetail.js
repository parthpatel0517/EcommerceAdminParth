import { View, Text, ScrollView, StatusBar, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { productgetData } from '../redux/Slice/product.slice';
import { ordergetData, updateOrderStatus, updatestatus } from '../redux/Slice/order.slice';
import { cartgetData } from '../redux/Slice/cart.slice';
import { getcolor } from '../redux/Slice/color.slice';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik, useFormik } from 'formik';
import { date, object, string } from 'yup';

// const data2 = [
//   {
//     id: 1,
//     title: 'Pullover',
//     subtitle: 'Mango',
//     image: require('../../../assets/img/Dress2.webp'),
//     color: 'Blue',
//     Size: 'L',
//     Units: 1,
//     price: 51,

//   },
//   {
//     id: 2,
//     title: 'Pullover',
//     subtitle: 'Mango',
//     image: require('../../../assets/img/Dress2.webp'),
//     color: 'Orange',
//     Size: 'L',
//     Units: 1,
//     price: 51,

//   },
//   {
//     id: 3,
//     title: 'Pullover',
//     subtitle: 'Mango',
//     image: require('../../../assets/img/Dress2.webp'),
//     color: 'gray',
//     Size: 'L',
//     Units: 1,
//     price: 51,
//   }
// ]
const Orderdata = [
  {
    id: 1,
    OrderNo: '1947034',
    Trackingnumber: 'Iw3475453455',
    date: '05-12-2019',
    Delivered: 'Delivered'
  },

]
export default function OrderDetails({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectdrop, setSelectdrop] = useState('')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Pending', value: 'pending' },
    { label: 'Processing', value: 'processing' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Out for Delivery', value: 'out for delivery' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Refunded', value: 'refunded' },
    { label: 'Failed', value: 'failed' },
    { label: 'Failed', value: 'failed' },
    { label: 'On Hold', value: 'on hold' },
    { label: 'Partially Shipped', value: 'partially shipped' },
    { label: 'Returned', value: 'returned' },
  ]);

  const a = route.params.address
  const dispatch = useDispatch()

  const product = useSelector(state => state.product);
  const color = useSelector(state => state.colors);
  const order = useSelector(state => state.order)
  console.log("order",order);
  const carddata = product.order && route.params.cart ? product.order.filter((v) =>
    route.params.cart.some((v1) => v1.pid === v.id)
  ) : [];
  // console.log("carddatacarddatacarddata", carddata);

  const item = carddata.length

  const auth = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(ordergetData(auth?.auth?.uid))
    dispatch(productgetData())
    dispatch(cartgetData())
    dispatch(getcolor())
  }, [])

  const handlesumbit = (data)=>{
    console.log("dataaadddddsdssdds",data);

    dispatch(updatestatus({ newData: { ...data, uid: auth.auth.uid }, oldData: route.params }))
  }

  let userSchema = object({
    dropdown: string().required('Please select at list one status')
})


  const formik = useFormik({
    initialValues: {
        dropdown: ''
    },
    validationSchema: userSchema,

    onSubmit: async (values) => {
        console.log("valuesvaluesvaluesvaluesvaluesvaluesvaluesvaluesvalues",values);
        handlesumbit(values)
        setModalVisible(!modalVisible);
        formik.resetForm();
    },
})


  const { handleChange, errors, values, handleSubmit, setFieldValue ,setValues} = formik

  const Order = ({ v }) => (
   
    
    <View style={styles.ViewOrder}>
      
      <View>
        <Text style={styles.Order0}>OrderNo: <Text>{route?.params?.Ordernum}</Text></Text>

        <Text style={styles.Order2}>Trackingnumber: <Text style={styles.Order}>{route?.params?.Trackingnumber}</Text></Text>
      </View>
      <View>
        <Text style={styles.Order2}>{route?.params?.Date}</Text>
   
        <Text style={styles.Order3}>{route?.params?.Status}</Text>
      

      </View>

    </View>
  );
  


  const NewProductCard = ({ v }) => (

    <TouchableOpacity style={styles.olldeta}>

      <Image source={{ uri: v?.url }} style={styles.img} />
      <View style={styles.pullovertext}>

        <Text style={styles.protext}>{v?.Productname}</Text>

        <Text style={styles.protext2}>{v.subtitle}</Text>

        <View style={styles.Color}>
          <Text style={styles.Colortext}>color:<Text style={styles.colorsize}>{color.color.find((v1) => v.color_id === v1.id)?.name}</Text></Text>
          {/* <Text style={styles.Colortext}>Size:<Text style={styles.colorsize}>{v.Size}</Text></Text> */}
        </View>



        <View style={styles.OrderDetails}>
          <Text style={styles.Colortext}>Price:<Text style={styles.colorsize}>{v?.qty}</Text></Text>

          <TouchableOpacity><Text style={styles.colorsize}>{v?.Price}$</Text></TouchableOpacity>
        </View>
      </View>

    </TouchableOpacity>
  );

  // console.log("kbjhhxzsfghjkhgfdsdfghj",value);
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
      />

      {/* <View style={styles.Ordertext}>
      <TouchableOpacity><FontAwesome name="angle-left" size={45} color="black" /></TouchableOpacity>
        <Text style={styles.Ordertext2}>Order Details</Text>
        <TouchableOpacity><Fontisto style={styles.searchicon} name="search" size={22} color="black" /></TouchableOpacity> 
      </View> */}



      <FlatList
        data={Orderdata}
        renderItem={({ item }) => <Order v={item} />}
        keyExtractor={item => item.id}
      // horizontal={true}
      />
        <View
          style={{
            width: 380,
            position: 'relative',
            zIndex: 100,
            // paddingHorizontal: 15,
            color: '#2AA952',
            paddingTop: 7,
            paddingBottom: 8,
          }}>

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={'Choose Status.'}
            onPress={() => setSelectdrop(!selectdrop)}
            onChangeText={handleChange('dropdown')}
            onSelectItem={(items) => setFieldValue('dropdown', items.value)}
          />
          <Text style={{ color: 'red', marginBottom: 20 }}>{selectdrop ? '' : errors.dropdown}</Text>
        </View>

      <View><Text style={{ color: 'black' }}>{item} :- item</Text></View>
      <FlatList
        data={carddata}
        renderItem={({ item }) => <NewProductCard v={item} />}
        keyExtractor={item => item.id}
      horizontal={false}
      />
      
      <TouchableOpacity style={styles.olldeta}>
        <Text style={styles.orderData2}>Address:</Text>
        <Text style={styles.addresssss}>{`${a.address}, ${a.city}, ${a.state}, ${a.zip_code}, ${a.country}`}</Text>
      </TouchableOpacity>

    <View style={{marginTop:50}}>
    <TouchableOpacity onPress={handleSubmit} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>Submit</Text>
  </TouchableOpacity>
    </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 19,
    paddingTop: 13,

  },
  addresssss: {
    width: 200,
    fontFamily: 'Metropolis-Bold',
    color: '#222222',
    lineHeight: 24,
    // fontSize:13.5
  },
  orderData2: {
    fontFamily: 'Metropolis-Regular',
    color: '#9B9B9B',
    lineHeight: 24,
    marginLeft: 10,
  },
  olldeta: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 3,
  },
  pullovertext: {
    margin: '3%',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  protext: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Metropolis-Bold',
  },
  protext2: {
    color: '#9B9B9B',
    fontSize: 14,
    // flexDirection:'row'
  },
  OrderDetails: {
    flexDirection: 'row',
    columnGap: 10,
    paddingTop: 18

  },
  img: {
    width: '30%',
    height: '100%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  Color: {
    flexDirection: 'row',
    columnGap: 35,
    paddingTop: 7
  },
  Colortext: {
    color: '#9B9B9B'
  },
  colorsize: {
    color: 'black'
  },
  starrating: {
    color: '#9B9B9B',
    fontSize: 15,
    bottom: 3
  },
  Ordertext: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 10
  },
  Ordertext2: {
    color: 'black',
    fontSize: 20,
    paddingTop: 8
  },
  searchicon: {
    paddingTop: 9
  },
  ViewOrder: {
    flexDirection: 'row',
    paddingBottom: 15,
    justifyContent: 'space-between'
  },
  Order0: {
    color: 'black',
    paddingTop: 7,
    paddingBottom: 8,
    fontFamily: 'Metropolis-Bold',
    fontSize: 18,
  },
  Order: {
    color: 'black',
    paddingTop: 7,
    paddingBottom: 8,

  },
  Order2: {
    color: '#B9B9B9',
    paddingTop: 7,
    paddingBottom: 8,
  },
  Order3: {
    color: '#2AA952',
    paddingTop: 7,
    paddingBottom: 8,
  }

});


