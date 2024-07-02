import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import firestore from '@react-native-firebase/firestore';

export default function Subcategory() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setdata] = useState([]);
  const [update, setUpdate] = useState(null)
  const [selectdrop, setSelectdrop] = useState('')
  // const [subitems , setSubitems] = useState('')/

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getdata()
  }, [])

  const getdata = async () => {
    const categoryData = [];
    const CategoryDetail = await firestore()
      .collection('Category')
      .get()
      .then(querySnapshot => {
        console.log('Total Category: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          categoryData.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
      });

    const subCategoryData = [];
    const subCategoryDetail = await firestore()
      .collection('SubCategory')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          subCategoryData.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
      });

    // const cat_id = categoryData.find((v) => v.id == value.id).name
    // setdata(categoryData);
    setdata(subCategoryData);
    setItems(categoryData.map(v => ({ label: v.name, value: v.id })));


  }

  const handalSumbit = async (data) => {

    if (update) {

      await firestore()
        .collection('SubCategory')
        .doc(update)
        .set(data)
        .then(() => {
          console.log('SubCategory Update!');
        })
    } else {
      await firestore()
        .collection('SubCategory')
        .add(data)
        .then(() => {
          console.log('SubCategory added!');
        })
        .catch((errors) => console.log(errors))


    }
    getdata();
  }
  const handaldelte = async (id) => {
    await firestore()
      .collection('SubCategory')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
    getdata();
  }

  let userSchema = object({
    name: string().required().matches(/^[a-zA-Z ]+$/, "Please enter valid name"),
    dropdown: string().required('Please select category')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      dropdown: ''
    },
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      handalSumbit(values)
      resetForm();
      setModalVisible(!modalVisible)
    },
  });


  const { handleChange, errors, values, handleSubmit, handleBlur, touched, setValues, setFieldValue } = formik

  const handaledit = async (data) => {
    setModalVisible(true)
    setValues(data)
    setUpdate(data.id)
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={modalVisible}
        animationType='slide'
        transparent={false}
        visible={modalVisible}
      >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add SubCategory Name</Text>

            <View
              style={{
                width: 200,
                position: 'relative',
                zIndex: 999,
                paddingHorizontal: 15,
              }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={'Choose Category.'}
                onPress={() => setSelectdrop(!selectdrop)}
                onChangeText={handleChange('dropdown')}
                onSelectItem={(items) => setFieldValue('dropdown', items.value)}
              // onBlur={handleBlur('dropdown')}

              />
              <Text style={{ color: 'red', marginBottom: 3 }}>{selectdrop && touched.dropdown ? '' : errors.dropdown}</Text>

            </View>

            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text>Choose Category. {value === null ? 'none' : value}</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder='SubCategory Name'
                placeholderTextColor='#9B9B9B'
                onChangeText={handleChange('name')}
                value={values.name}
                onBlur={handleBlur('name')}
              />
              <Text style={{ color: 'red', marginBottom: -28 }}>{errors.name && touched.name ? errors.name : ''}</Text>
            </View>


            <TouchableOpacity
              style={[styles.Sumbitbutton, styles.buttonClose]}
              onPress={handleSubmit}>
              <Text style={styles.textStyle}>{update ? 'update' : 'Sumbit'}</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>


      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => { setModalVisible(true), setUpdate(null) }}>
        <Text style={styles.textStyle}>Add SubCategory name</Text>
      </TouchableOpacity>


      <View style={styles.SumbitView}>
        {data.map((v, i) => (
          <View style={styles.TextSView}>
            <View style={styles.maleTextView}>
              <Text style={styles.maleText}>{v.name}</Text>
              <Text style={styles.maleText}>{v.dropdown}</Text>
            </View>
            <TouchableOpacity onPress={() => handaldelte(v.id)} style={styles.deleteEditView}>
              <MaterialIcons name="delete" size={32} color="red" paddingLeft={9} marginTop={5} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handaledit(v)} style={styles.deleteEditView}>
              <MaterialIcons name="edit" size={32} color="blue" paddingLeft={10} marginTop={5} />
            </TouchableOpacity>
          </View>
        ))}

      </View>

    </View>
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
    height: 320,
    width: 290,
    marginTop: 250,
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
    width: 260,
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
    padding: 2,
    paddingHorizontal: 29,
    fontSize: 17
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 19,
  },
  input: {
    width: 210,
    backgroundColor: '#FFFFFF',
    marginVertical: 30,
    paddingVertical: 10,
    marginBottom: 25,
    paddingLeft: 10,
    color: 'black',
    borderRadius: 5,
    fontSize: 18,
    fontWeight: '400',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 3,
  },
  Sumbitbutton: {
    width: 200,
    borderRadius: 35,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  SumbitView: {
    width: 410,
    // height: 250,
    elevation: 9,
    borderRadius: 10,
    padding: 14,
    marginTop: 100,
    backgroundColor: 'white'
  },
  TextSView: {
    width: '100%',
    height: 45,
    // backgroundColor: 'green',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 3,
    marginBottom: 18
  },
  maleTextView: {
    width: 240,
    // height: '100%',
    // backgroundColor: 'pink',

    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4
  },
  maleText: {
    color: 'black',
    fontSize: 17,
    marginLeft: 13,
    fontWeight: '500',
    marginTop: 10
  },
  deleteEditView: {
    elevation: 5,
    backgroundColor: 'white',
    width: 50,
    borderRadius: 5
  }
});
