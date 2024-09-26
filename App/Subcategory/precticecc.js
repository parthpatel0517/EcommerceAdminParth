// import React, { useEffect, useState } from 'react';
// import {
//     Alert, Modal, StyleSheet, Text, Pressable, View,
//     KeyboardAvoidingView, Keyboard, ScrollView, TouchableOpacity
// } from 'react-native';
// // import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Fonts/Matrix/Matrix';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useFormik } from 'formik';
// import { TextInput } from 'react-native-gesture-handler';
// import * as Yup from 'yup';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { RadioButton } from 'react-native-paper';
// import { CheckBox } from 'react-native-elements';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// export default function Cate() {
//     const [selectedValue, setSelectedValue] = useState('');
//     const [isSelected, setSelection] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [dropDownPicker, setDropDownPicker] = useState('');
//     const [data, setdata] = useState([]);
//     const [name, setName] = useState('');
//     const [update, setUpdate] = useState(null);
//     const [open, setOpen] = useState(false);
//     const [value, setValue] = useState(null);
//     const [items, setItems] = useState([
//         { label: 'shirts for men', value: 'shirts for men' },
//         { label: 'shirt for women', value: 'shirt for women' },
//         { label: 'women shoes', value: 'women shoes' },
//     ]);


//     let userSchema = Yup.object({
//         name: Yup.string().required("enter name").matches(/^[a-zA-Z ]+$/, "enter valid name"),
//         email: Yup.string().required().email(),
//         mobile: Yup.string().required().matches(/^\d{10}$/, "Mobile number must be 10 digit"),
//         age: Yup.number().required().min(18, "enter your age").typeError("Please enter age in digit"),
//         password: Yup.string().required().matches(/^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be 8 combination of alpabet, digit and special symbol."),
//         check: Yup.boolean().oneOf([true]).required(),
//         Radio: Yup.string().required(),
//         dropDownPicker: Yup.string().required(),
//     })

//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             email: '',
//             age: '',
//             mobile: '',
//             password: '',
//             check: '',
//             Radio: '',
//             dropDownPicker: '',
//         },
//         validationSchema: userSchema,

//         onSubmit: (values, { resetForm }) => {
//             console.log(values);
//             setModalVisible(!modalVisible)
//             resetForm();

//         },
//     });
//     useEffect(() => {
//         getdata();
//     }, []);


//     const getdata = async () => {

//         const catData = await AsyncStorage.getItem("category");
//         if (catData) {
//             setdata(JSON.parse(catData));
//         }
//     }


//     const handleSubmitdata = async () => {

//         const catData = await AsyncStorage.getItem("category");
//         // console.log(catData);

//         console.log("update", update);

//         if (update) {

//             const udata = JSON.parse(catData).map((v) => {
//                 if (v.id === update) {
//                     return ({ id: update, name: values.name, age: values.age, email: values.email, mobile: values.mobile, password: values.password, check: values.check, Radio: values.Radio, dropDownPicker: values.dropDownPicker });
//                 } else {
//                     return v;
//                 }
//             })

//             await AsyncStorage.setItem("category", JSON.stringify(udata));

//             setdata(udata);

//         } else {
//             if (catData) {
//                 let asyncdata = JSON.parse(catData);
//                 asyncdata.push({
//                     id: Math.floor(Math.random() * 10000), name: values.name, age: values.age, email: values.email, mobile: values.mobile, password: values.password
//                     , check: values.check, Radio: values.Radio, dropDownPicker: values.dropDownPicker
//                 })
//                 await AsyncStorage.setItem("category", JSON.stringify(asyncdata));
//                 setdata(asyncdata)

//             } else {
//                 let data = [{
//                     id: Math.floor(Math.random() * 10000), name: values.name, age: values.age, email: values.email, mobile: values.mobile, password: values.password
//                     , check: values.check, Radio: values.Radio, dropDownPicker: values.dropDownPicker
//                 }];
//                 await AsyncStorage.setItem("category", JSON.stringify(data));
//                 setdata(asyncdata)
//             }
//         }
//         setName('')
//         setModalVisible(false);
//         setUpdate(null)
//         formik.resetForm();
//     }

//     const handleDelete = async (id) => {
//         const data = await AsyncStorage.getItem("category");
//         const fData = JSON.parse(data).filter((v) => v.id !== id);

//         await AsyncStorage.setItem("category", JSON.stringify(fData));

//         setdata(fData);
//     }


//     const Editdata = async (data) => {
//         setModalVisible(true);

//         setValues(data);

//         setUpdate(data.id)
//     }

//     const { handleSubmit, handleChange, errors, values, setFieldValue, setValues, touched, handleBlur } = formik;

//     console.log("errors", errors.name);
//     console.log("check", touched);
//     console.log("values", values.name);

//     //dropdown
//     //radio button
//     //check box

//     return (
//         <ScrollView>        <View style={styles.centeredView}>

//             <Modal

//                 avoidKeyboard
//                 animationType="slide"
//                 transparent={true}

//                 visible={modalVisible}
//                 onRequestClose={() => {
//                     Alert.alert('Modal has been closed.');
//                     setModalVisible(!modalVisible);
//                 }}>
//                 <KeyboardAvoidingView
//                     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                     style={styles.keyboardAvoidingView}
//                 >
//                     <ScrollView contentContainerStyle={styles.scrollView}>
//                         <View style={styles.centeredView}>

//                             <View style={styles.modalView}>

//                                 <View style={styles.checkboxContainer}>
//                                     <CheckBox
//                                         checked={isSelected}
//                                         onPress={() => { setSelection(!isSelected); setFieldValue("check", !isSelected) }}
//                                         onChangeText={handleChange('check')}
//                                         containerStyle={styles.checkbox}
//                                     />
//                                     <Text style={styles.label}>Do you like React Native?</Text>
//                                 </View>
//                                 <Text style={{ color: 'red' }}>{isSelected ? '' : errors.check}</Text>



//                                 <View style={styles.radioGroup}>
//                                     <View style={styles.radioButton}>
//                                         <RadioButton.Android
//                                             value="option1"
//                                             status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
//                                             onPress={() => { setSelectedValue('option1'); setFieldValue('Radio', 'ReactJS') }}
//                                             color="#007BFF"
//                                             onChangeText={handleChange('Radio')}
//                                         />
//                                         <Text style={styles.radioLabel}> ReactJS</Text>
//                                     </View>

//                                     <View style={styles.radioButton}>
//                                         <RadioButton.Android
//                                             value="option2"
//                                             status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
//                                             onPress={() => { setSelectedValue('option2'); setFieldValue('Radio', 'React Native') }}
//                                             color="#007BFF"
//                                             onChangeText={handleChange('Radio')}
//                                         />
//                                         <Text style={styles.radioLabel}>React Native</Text>
//                                     </View>


//                                 </View>
//                                 <Text style={{ color: 'red' }}>{selectedValue ? '' : errors.Radio}</Text>
//                                 <View style={styles.DropDown}>

//                                     <DropDownPicker

//                                         open={open}
//                                         value={value}
//                                         items={items}
//                                         setOpen={setOpen}
//                                         setValue={setValue}
//                                         setItems={setItems}
//                                         placeholder={'Category'}
//                                         onChangeText={handleChange('dropDownPicker')}
//                                         onPress={() => setDropDownPicker(!dropDownPicker)}
//                                         onSelectItem={(items) => setFieldValue('dropDownPicker', items.value)}
//                                     />
//                                     <Text style={{ color: 'red' }}>{dropDownPicker ? '' : errors.dropDownPicker}</Text>
//                                 </View>


//                                 <TextInput
//                                     name="name"
//                                     style={styles.input}
//                                     color={'black'}
//                                     placeholder='name'
//                                     placeholderTextColor='#9B9B9B'
//                                     onChangeText={handleChange('name')}
//                                     onBlur={handleBlur("name")}
//                                     value={values.name}
//                                 />
//                                 <Text style={{ color: 'red' }}>{errors.name && touched.name ? errors.name : ''}</Text>


//                                 <TextInput
//                                     style={styles.input}
//                                     placeholder='age'
//                                     placeholderTextColor='#9B9B9B'
//                                     onBlur={handleBlur("age")}
//                                     onChangeText={handleChange('age')}
//                                     value={values.age}
//                                 />
//                                 <Text style={{ color: 'red' }}>{errors.age && touched.age ? errors.age : ''}</Text>
//                                 <TextInput
//                                     style={styles.input}
//                                     placeholder='email'
//                                     placeholderTextColor='#9B9B9B'
//                                     onBlur={handleBlur("email")}
//                                     onChangeText={handleChange('email')}
//                                     value={values.email}
//                                 />
//                                 <Text style={{ color: 'red' }}>{errors.email && touched.email ? errors.email : ''}</Text>
//                                 <TextInput
//                                     style={styles.input}
//                                     placeholder='mobile'
//                                     placeholderTextColor='#9B9B9B'
//                                     onChangeText={handleChange('mobile')}
//                                     value={values.mobile}
//                                 />
//                                 <Text style={{ color: 'red' }}>{errors.mobile ? errors.mobile : ''}</Text>

//                                 <TextInput
//                                     style={styles.input}
//                                     placeholder='password'
//                                     placeholderTextColor='#9B9B9B'
//                                     onChangeText={handleChange('password')}
//                                     value={values.password}

//                                 />
//                                 <Text style={{ color: 'red' }}>{errors.password ? errors.password : ''}</Text>

//                                 <Pressable
//                                     style={[styles.button, styles.buttonClose]}
//                                     onPress={() => { handleSubmit(), handleSubmitdata() }}>
//                                     <Text style={styles.textStyle}>{update ? "update" : "submite"}</Text>
//                                 </Pressable>
//                             </View>

//                         </View>
//                     </ScrollView>
//                 </KeyboardAvoidingView>
//             </Modal>


//             {

//                 data.map((v) => (
//                     <View style={styles.Viewman}>
//                         <Text style={{ color: 'black' }}>{v.name}</Text>
//                         <Text style={{ color: 'black' }}>{v.age}</Text>
//                         <View style={styles.iconview}>

//                             <TouchableOpacity onPress={() => Editdata(v)}>
//                                 <MaterialIcons name="delete" size={25} color="green" />
//                             </TouchableOpacity>

//                             <TouchableOpacity onPress={() => handleDelete(v.id)}>
//                                 <MaterialIcons name="edit" size={25} color="red" />
//                             </TouchableOpacity>

//                         </View>

//                     </View>
//                 ))
//             }



//             <Pressable
//                 style={[styles.button, styles.buttonOpen]}
//                 onPress={() => setModalVisible(true)}>
//                 <Text style={styles.textStyle}>Open Modal</Text>
//             </Pressable>

//         </View>
//         </ScrollView>

//     )
// }


// const styles = StyleSheet.create({

//     centeredView: {
//         // flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//     },
//     radioGroup: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         borderRadius: 8,
//         backgroundColor: 'white',
//         padding: 16,
//         elevation: 4,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//     },
//     radioButton: {
//         flexDirection: 'row',
//         alignItems: 'center',

//     },
//     radioLabel: {
//         marginLeft: 8,
//         fontSize: 16,
//         color: '#333',
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     button: {
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2,

//     },
//     buttonOpen: {
//         backgroundColor: '#007BFF',
//     },
//     buttonClose: {
//         backgroundColor: '#007BFF',
//     },
//     textStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//     },
//     DropDown: {
//         paddingBottom: 20,
//         paddingHorizontal: 5,
//         paddingTop: 20

//     },
//     checkboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     checkbox: {
//         padding: 0,
//     },
//     label: {
//         margin: 8,
//         color: 'black'
//     },
//     input: {
//         color: 'black',
//         width: '100%',
//         padding: 8,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         marginVertical: 5,
//         width: 250,
//     },
//     modalContainer: {
//         justifyContent: 'flex-end'
//     },
//     modalContent: {
//     },
//     Viewman: {
//         width: '90%',
//         backgroundColor: '#FFFFFF',
//         borderRadius: 10,
//         elevation: 6,
//         margin: '5%',
//         // justifyContent: 'center',
//         padding: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         // columnGap:90
//     },
//     iconview: {
//         flexDirection: 'row',
//         width: '30%',
//         justifyContent: 'space-between'
//     },
// });




// import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
// import Modal from "react-native-modal";
// import React, { useEffect, useState } from 'react';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { ScrollView } from 'react-native-gesture-handler';
// import { object, string } from 'yup';
// import { useFormik } from 'formik';
// import firestore from '@react-native-firebase/firestore';

// export default function CategoryFire() {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [data, setData] = useState([]);
//     const [update, setUpdate] = useState(null);

//     useEffect(() => {
//         getdata();
//     }, []);

//     const getdata = async () => {
//         const categoryData = [];
//         const querySnapshot = await firestore().collection('Category').get();
//         querySnapshot.forEach(documentSnapshot => {
//             categoryData.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
//         });
//         setData(categoryData);
//     };

//     const handleSubmit1 = async (category) => {
//         try {
//             await firestore().collection('Category').add(category);
//             console.log('Category added!');
//             setModalVisible(false);
//             getdata(); // Refresh data after adding new category
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await firestore().collection('Category').doc(id).delete();
//             console.log('Category deleted!');
//             getdata(); // Refresh data after deleting a category
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const userSchema = object({
//         name: string().required(),
//     });

//     const formik = useFormik({
//         initialValues: { name: '' },
//         validationSchema: userSchema,
//         onSubmit: values => {
//             handleSubmit1(values);
//         },
//     });

//     const { handleChange, errors, values, handleSubmit, handleBlur, touched } = formik;

//     return (
//         <ScrollView>
//             <Modal
//                 isVisible={modalVisible}
//                 animationType='slide'
//                 transparent={false}
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <View style={styles.centeredView}>
//                     <View style={styles.modalView}>
//                         <Text style={styles.modalText}>Add Category Name</Text>
//                         <TextInput
//                             style={styles.input}
//                             placeholder='Category Name'
//                             placeholderTextColor='#9B9B9B'
//                             onChangeText={handleChange('name')}
//                             onBlur={handleBlur('name')}
//                             value={values.name}
//                         />
//                         {errors.name && touched.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
//                         <TouchableOpacity
//                             style={[styles.buttonSumbit, styles.buttonClose]}
//                             onPress={handleSubmit}
//                         >
//                             <Text style={styles.textStyle}>{update ? 'Update' : 'Submit'}</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>
//             <TouchableOpacity
//                 style={[styles.button, styles.buttonOpen]}
//                 onPress={() => setModalVisible(true)}
//             >
//                 <Text style={styles.textStyle}>Add Category Name</Text>
//             </TouchableOpacity>
//             <View style={styles.SumbitView}>
//                 {data.map((v) => (
//                     <View key={v.id} style={styles.TextSView}>
//                         <View style={styles.maleTextView}>
//                             <Text style={styles.maleText}>{v.name}</Text>
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { number, object, string } from 'yup';
import { useFormik } from 'formik';
import firestore from '@react-native-firebase/firestore';

export default function Product() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectCatedrop, setSelectCatedrop] = useState(false);
  const [products, setProducts] = useState([]);

  //Category's Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  //SubCategory's Dropdown
  const [opened, setOpened] = useState(false);
  const [valued, setValued] = useState(null);
  const [itemse, setItemse] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const categoryData = [];
    await firestore()
      .collection('Category')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          categoryData.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
      });
    setItems(categoryData.map(v => ({ label: v.name, value: v.id })));
  };

  const fetchSubCategories = async (categoryId) => {
    const subCategoryData = [];
    await firestore()
      .collection('SubCategory')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          subCategoryData.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
      });
    const filteredSubCategories = subCategoryData.filter(subCat => subCat.category_id === categoryId);
    setItemse(filteredSubCategories.map(v => ({ label: v.name, value: v.id })));
  };

  const fetchProducts = async () => {
    const productsData = [];
    await firestore()
      .collection('Product')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          productsData.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
      });
    setProducts(productsData);
  };

  const handleDelete = async (id) => {
    await firestore()
      .collection('Product')
      .doc(id)
      .delete()
      .then(() => {
        // console.log('Product deleted!');
        fetchProducts();
      });
  };

  const handleSubmitProduct = async (data) => {
    await firestore()
      .collection('Product')
      .add(data)
      .then(() => {
        // console.log('Product added!');
        fetchProducts();
      })
      .catch(error => console.log(error));
  };

  let productSchema = object({
    category_id: string().required('Please select category'),
    Subcategory_id: string().required('Please select Subcategory'),
    Productname: string().required('Please enter product name'),
    Price: number().required('Please enter product price'),
    Description: string().required('Please enter product description')
  });

  const formik = useFormik({
    initialValues: {
      category_id: '',
      Subcategory_id: '',
      Productname: '',
      Price: '',
      Description: ''
    },
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmitProduct(values);
      resetForm();
      setModalVisible(false);
    },
  });

  const { handleChange, errors, values, handleSubmit, handleBlur, touched, setFieldValue } = formik;

  return (
    <ScrollView>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Product Detail</Text>

            <View style={styles.dropdownContainer}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={'Choose Category'}
                onChangeValue={(value) => {
                  setFieldValue('category_id', value);
                  fetchSubCategories(value);
                }}
              />
              {touched.category_id && errors.category_id && <Text style={styles.errorText}>{errors.category_id}</Text>}
            </View>

            <View style={styles.dropdownContainer}>
              <DropDownPicker
                open={opened}
                value={valued}
                items={itemse}
                setOpen={setOpened}
                setValue={setValued}
                setItems={setItemse}
                placeholder={'Choose SubCategory'}
                onChangeValue={(value) => setFieldValue('Subcategory_id', value)}
              />
              {touched.Subcategory_id && errors.Subcategory_id && <Text style={styles.errorText}>{errors.Subcategory_id}</Text>}
            </View>

            <View>
              <TextInput
                style={styles.input}
                placeholder='Product Name'
                placeholderTextColor='#9B9B9B'
                onChangeText={handleChange('Productname')}
                onBlur={handleBlur('Productname')}
                value={values.Productname}
              />
              {touched.Productname && errors.Productname && <Text style={styles.errorText}>{errors.Productname}</Text>}
            </View>

            <View>
              <TextInput
                style={styles.input}
                placeholder='Price'
                placeholderTextColor='#9B9B9B'
                onChangeText={handleChange('Price')}
                onBlur={handleBlur('Price')}
                value={values.Price}
                keyboardType='numeric'
              />
              {touched.Price && errors.Price && <Text style={styles.errorText}>{errors.Price}</Text>}
            </View>

            <View>
              <TextInput
                style={styles.input}
                placeholder='Description'
                placeholderTextColor='#9B9B9B'
                onChangeText={handleChange('Description')}
                onBlur={handleBlur('Description')}
                value={values.Description}
              />
              {touched.Description && errors.Description && <Text style={styles.errorText}>{errors.Description}</Text>}
            </View>

            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={handleSubmit}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Add Product Detail</Text>
      </TouchableOpacity>

      <View style={styles.productsContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.productItem}>
            <Text style={styles.productText}>{product.Productname}</Text>
            <Text style={styles.productText}>Price: {product.Price}</Text>
            <Text style={styles.productText}>Description: {product.Description}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={() => handleDelete(product.id)}>
                <MaterialIcons name="delete" size={32} color="red" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={32} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  modalView: {
    width: 300,
    margin: 20,
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
    marginTop: 20,
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
    fontSize: 17,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  input: {
    width: 250,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    marginBottom: 20,
    paddingLeft: 10,
  }
})