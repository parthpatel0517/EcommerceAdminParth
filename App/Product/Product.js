import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { number, object, string } from 'yup';
import { useFormik } from 'formik';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { getsubcategorydata } from '../redux/action/subcategory.action';
import { getcategorydata } from '../redux/action/categoryfire.action';
import { addproductdata, deleteproductdata, getproductdata, updateproductdata } from '../redux/action/product.action';
import { getcolor } from '../redux/Slice/color.slice';
import { getbrand } from '../redux/Slice/brand.slice';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Product() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectCatedrop, setSelectCatedrop] = useState('')
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(null)
  // const [selectSubdropown, setSelectSubdrop] = useState('')

  // const [categoryData, SetCategoryData] = useState([]);

  const [data, setdata] = useState([]);
  const [datasub, setdatasub] = useState([]);

  //Category's Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  //SubCategory's Dropdown
  const [opened, setOpened] = useState(false);
  const [valued, setValued] = useState(null);
  const [itemse, setItemse] = useState([]);
  //color's DropDown
  const [openecolor, setOpenedcolor] = useState(false);
  const [valuecolor, setValuecolor] = useState(null);
  const [itemscolor, setItemsecolor] = useState([]);
  //brand's DropDown
  const [openebrand, setOpenedbrand] = useState(false);
  const [valuebrand, setValuebrand] = useState(null);
  const [itemsbrand, setItemsebrand] = useState([]);

  const [image, setImage] = useState('')


  useEffect(() => {
    dispatch(getcategorydata())
    dispatch(getsubcategorydata())
    dispatch(getproductdata())
    dispatch(getcolor())
    dispatch(getbrand())
  }, [])


  const dispatch = useDispatch();
  const categorya = useSelector(state => state.category);
  const subcategorya = useSelector(state => state.subcategory)
  const producta = useSelector(state => state.product);
  const brand = useSelector(state => state.brands);
  const color = useSelector(state => state.colors);

  const handalSumbit = async (data) => {
    if (update) {
      dispatch(updateproductdata(data))
    } else {
      dispatch(addproductdata(data))
    }
    setUpdate(null)

    setModalVisible(false)
  }

  const handaldelte = async (id) => {
    // console.log(id);
    dispatch(deleteproductdata(id))
    // getdata();
  }
  let userSchema = object({
    brand_id: string().required('Please select brand'),
    color_id: string().required('Please select color'),
    category_id: string().required('Please select category'),
    Subcategory_id: string().required('Please select Subcategory'),
    Productname: string().required('Please enter product name'),
    Price: number().required('Please enter product price'),
    Description: string().required('Please enter product description')
  });

  const formik = useFormik({
    initialValues: {
      brand_id: '',
      brand_id: '',
      category_id: '',
      Subcategory_id: '',
      Productname: '',
      Price: '',
      Description: '',
      
    },
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      handalSumbit(values)
      resetForm();
      setModalVisible(!modalVisible)

    },
  });


  const { handleChange, errors, values, handleSubmit, handleBlur, touched, setValues, setFieldValue } = formik
  const handaledit = (data) => {
    setModalVisible(true)
    setValues(data)
    setUpdate(data.id)
  }

  const handleCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      console.log("mkdkdsdkkdskdskdskdskdskds",image.path);
    });
  }

  const handleGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setImage(image.path);
      console.log("mkdkdsdkkdskdskdskdskdskds",image.path);
      
    });
  }

  return (
    <ScrollView>

      <Modal
        isVisible={modalVisible}
        animationType='slide'
        transparent={true}
        visible={modalVisible}
      >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Product detail</Text>

            <View
              style={{
                width: 200,
                position: 'relative',
                zIndex: 1000,
                paddingHorizontal: 15,
              }}>

              <DropDownPicker
                open={open}
                value={value}
                items={categorya.categoryfire.map(v => ({ label: v.name, value: v.id }))}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={'Choose Category.'}
                onPress={() => setSelectCatedrop(!selectCatedrop)}
                onChangeValue={(value) => {
                  // console.log("kkkkkkkk", value);
                }}
                onSelectItem={(items) => setFieldValue('category_id', items.value)}
              />
              <Text style={{ color: 'red', marginBottom: 3 }}>{selectCatedrop && touched.category_id ? '' : errors.category_id}</Text>
            </View>
            <View
              style={{
                marginTop: 30,
                width: 250,
                position: 'relative',
                zIndex: 1000,
                paddingHorizontal: 15,
                color: 'black'
              }}>
              <DropDownPicker
                open={opened}
                value={valued}
                items={subcategorya.subcategoryfire.filter((v => v.category_id === value)).map(v => ({ label: v.name, value: v.id }))}
                setOpen={setOpened}
                setValue={setValued}
                setItems={setItemse}
                placeholder={'Choose SubCategory.'}
                onPress={() => setSelectCatedrop(!selectCatedrop)}
                onChangeText={handleChange('Subcategory_id')}
                onSelectItem={(items) => setFieldValue('Subcategory_id', items.value)}
              />
              <Text style={{ color: 'red', marginBottom: 3 }}>{selectCatedrop && touched.Subcategory_id ? '' : errors.Subcategory_id}</Text>
            </View>
            <View
              style={{
                marginTop: 30,
                width: 250,
                position: 'relative',
                zIndex: 1000,
                paddingHorizontal: 15,
                color: 'black'
              }}>
              <DropDownPicker
                open={openecolor}
                value={valuecolor}
                items={color.color.map(v => ({ label: v.name, value: v.id }))}
                setOpen={setOpenedcolor}
                setValue={setValuecolor}
                setItems={setItemsecolor}
                placeholder={'Choose Color.'}
                onPress={() => setSelectCatedrop(!selectCatedrop)}
                onChangeText={handleChange('color_id')}
                onSelectItem={(items) => setFieldValue('color_id', items.value)}
              />
              <Text style={{ color: 'red', marginBottom: 3 }}>{selectCatedrop && touched.color_id ? '' : errors.color_id}</Text>
            </View>
            <View
              style={{
                marginTop: 30,
                width: 250,
                position: 'relative',
                zIndex: 999,
                paddingHorizontal: 15,
                color: 'black'
              }}>
              <DropDownPicker
                open={openebrand}
                value={valuebrand}
                items={brand.brand.map(v => ({ label: v.name, value: v.id }))}
                setOpen={setOpenedbrand}
                setValue={setValuebrand}
                setItems={setItemsebrand}
                placeholder={'Choose Brand.'}
                onPress={() => setSelectCatedrop(!selectCatedrop)}
                onChangeText={handleChange('brand_id')}
                onSelectItem={(items) => setFieldValue('brand_id', items.value)}
              />
              <Text style={{ color: 'red', marginBottom: 3 }}>{selectCatedrop && touched.brand_id ? '' : errors.brand_id}</Text>
            </View>

            <TouchableOpacity style={styles.inputcamera} onPress={() => handleCamera()}>
              <MaterialIcons name="photo-camera" size={29} color="#DB3022"  /><Text style={{ color: 'black', fontSize: 17 }}>  Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.inputgallery} onPress={() => handleGallery()}>
              <MaterialIcons name="photo-library" size={29} color="#DB3022"  /><Text style={{ color: 'black', fontSize: 17,marginLeft:10 }}>Gallery</Text>
            </TouchableOpacity>


            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text>Choose color. {value === null ? 'none' : value}</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder='Productname'
                placeholderTextColor='#9B9B9B'
                onChangeText={handleChange('Productname')}
                onBlur={handleBlur('Productname')}
                value={values.Productname}
              />
              <Text style={{ color: 'red', marginBottom: 3 }}>{errors.Productname && touched.Productname ? errors.Productname : ''}</Text>
            </View>
            <View>
              <TextInput
                style={[styles.input, styles.PriceInput]}
                placeholder='Price'
                placeholderTextColor='#9B9B9B'
                onChangeText={handleChange('Price')}
                onBlur={handleBlur('Price')}
                value={values.Price}
              />
              <Text style={{ color: 'red', marginBottom: 3 }}>{errors.Price && touched.Price ? errors.Price : ''}</Text>
            </View>
            <View>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder='Description'
                placeholderTextColor='#9B9B9B'
                onChangeText={handleChange('Description')}
                onBlur={handleBlur('Description')}
                value={values.Description}
              />

              <Text style={{ color: 'red', marginBottom: 3 }}>{errors.Description && touched.Description ? errors.Description : ''}</Text>
            </View>


            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleSubmit}>
              <Text style={styles.textStyle}>{update ? 'update' : 'sumbit'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Add Product detail</Text>
      </TouchableOpacity>

      <View style={styles.SumbitView}>
        {producta.productfire.map((v, i) => (
          <View key={i} style={styles.TextSView}>
            <View style={styles.maleTextView}>
              <Text style={styles.maleText}>Category : {categorya.categoryfire.find((v1) => v.category_id === v1.id)?.name}</Text>
              <Text style={styles.maleText}>SubCategory : {subcategorya.subcategoryfire.find((v1) => v.Subcategory_id === v1.id)?.name}</Text>
              <Text style={styles.maleText}>Color : {color.color.find((v1) => v.color_id === v1.id)?.name}</Text>
              <Text style={styles.maleText}>Brand : {brand.brand.find((v1) => v.brand_id === v1.id)?.name}</Text>
              <Text style={styles.maleText}>Product name: {v.Productname}</Text>
              <Text style={styles.maleText}>Price: {v.Price}</Text>
              <Text style={styles.maleText}>Description: {v.Description}</Text>
            </View>
            <TouchableOpacity onPress={() => handaldelte(v.id)} style={styles.deleteEditView}>
              <MaterialIcons name="delete" size={32} color="red" paddingLeft={9} marginTop={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handaledit(v)} style={styles.deleteEditView}>
              <MaterialIcons name="edit" size={32} color="blue" paddingLeft={10} marginTop={30} />
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ flex: 1 }} >
          <FlatList
            data={items}
            renderItem={(props) => renderItem({ ...props, refRBSheet })}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  modalView: {
    // height: 60,
    width: 290,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 35,
    padding: 10,
    elevation: 2,
    marginTop: 20
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 2,
    paddingHorizontal: 29,
    fontSize: 17

  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '500'
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: 'black',
    borderWidth: 1.3,
    paddingHorizontal: 100,
    borderRadius: 5,
    marginBottom: 10
  },
  PriceInput: {
    marginTop: 10
  },
  descriptionInput: {
    marginTop: 10
  },
  SumbitView: {
    width: 410,
    // height: 250,
    elevation: 9,
    borderRadius: 10,
    padding: 14,
    marginTop: 100,
    paddingVertical: 40,
    backgroundColor: 'white'
  },
  TextSView: {
    width: '100%',
    // height: 100,
    // backgroundColor: 'green',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 3,
    //  paddingVertical:20,
    marginBottom: 18
  },
  maleTextView: {
    width: 240,
    // height: 100,
    // backgroundColor: 'pink',
    justifyContent: 'center',
    backgroundColor: 'white',
    // paddingVertical:20,/
    borderRadius: 8,
    elevation: 4
  },
  maleText: {
    color: 'black',
    fontSize: 14,
    marginLeft: 13,
    fontWeight: '500',
    marginBottom: 3
    //  paddingVertical:20,
  },
  deleteEditView: {
    elevation: 5,
    backgroundColor: 'white',
    width: 50,
    borderRadius: 5
  },
  profileView: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    position: 'relative',
  },
  profilecircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 0,
    backgroundColor: '#DDDFE0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProfilebodyHead: {
    flex: 0,
    marginTop: 20
    // justifyContent:'center',
    // alignItems:'center'
  },
  Profilebody: {
    width: '90%',
    flexDirection: 'row',
    // columnGap: 10,
    margin: 15
  },
  cameracircle: {
    width: 49,
    height: 49,
    position: 'absolute',
    borderRadius: 50,
    top: 106,
    left: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DB3022',
    elevation: 4
  },
  imagecircle2: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',

  },
  bottomiconhead: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 28,
    marginTop: 55,
  },
  bottomTextView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16
  },
  bottommini: {
    rowGap: 10,
    marginTop: 5,
  },
  bottomSheetContainer: {
    margin: 20
  },
  bottomSheetText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    marginTop: 5
  },
  bottomcover: {
    width: '100%',
    height: 200,

  },
  cancelText: {
    color: '#DB3022'
  },
  checkbutton: {
    width: 200,
    backgroundColor: '#DB3022',
    height: 50,
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
    margin: 'auto',
    marginTop: 100

  },
  CheckText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Metropolis-Medium'
  },
  inputcamera: {
    display:'flex',
    flexDirection:'row',
    width: "100%",
    height: 50,
    borderColor: 'black',
    borderWidth: 1.3,
    borderRadius: 5,
    marginBottom: 50,
    marginTop: 20,
    color: 'black',
    alignItems:'center',
    justifyContent:'center'
  },
  inputgallery: {
    display:'flex',
    flexDirection:'row',
    width: "100%",
    height: 50,
    borderColor: 'black',
    borderWidth: 1.3,
    borderRadius: 5,
    marginBottom: 50,
    // marginTop: 20,
    color: 'black',
    alignItems:'center',
    justifyContent:'center'
  }
});
