import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function Product() {
  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Mens Shirt', value: 'mens shirt' },
  ]);
  const [opened, setOpened] = useState(false);
  const [valued, setValued] = useState(null);
  const [itemse, setItemse] = useState([
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Mens Shirt', value: 'mens shirt' },
  ]);

  return (
    <View style={styles.centeredView}>
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
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={'Choose Category.'}
              />

            </View>
            <View
              style={{
                marginTop:30,
                width: 250,
                position: 'relative',
                zIndex: 999,
                paddingHorizontal: 15,
              }}>
              <DropDownPicker
                open={opened}
                value={valued}
                items={itemse}
                setOpen={setOpened}
                setValue={setValued}
                setItems={setItemse}
                placeholder={'Choose SubCategory.'}
              />
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
                placeholder='Name'
                placeholderTextColor='#9B9B9B'
              />
            </View>
            <View>
              <TextInput
                style={[styles.input,styles.PriceInput]}
                placeholder='Price'
                placeholderTextColor='#9B9B9B'
              />
            </View>
            <View>
              <TextInput
                style={[styles.input,styles.descriptionInput]}
                placeholder='Description'
                placeholderTextColor='#9B9B9B'
              />
            </View>


            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Submit</Text>
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
        <View style={styles.TextSView}>
          <View style={styles.maleTextView}>
            <Text style={styles.maleText}>Male</Text>
          </View>
          <View style={styles.deleteEditView}>
            <MaterialIcons name="delete" size={32} color="red" paddingLeft={9} marginTop={5} />
          </View>
          <View style={styles.deleteEditView}>
            <MaterialIcons name="edit" size={32} color="blue" paddingLeft={10} marginTop={5} />
          </View>
        </View>
        <View style={styles.TextSView}>
          <View style={styles.maleTextView}>
            <Text style={styles.maleText}>Male</Text>
          </View>
          <View style={styles.deleteEditView}>
            <MaterialIcons name="delete" size={32} color="red" paddingLeft={9} marginTop={5} />
          </View>
          <View style={styles.deleteEditView}>
            <MaterialIcons name="edit" size={32} color="blue" paddingLeft={10} marginTop={5} />
          </View>
        </View>
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
    // height: 60,
    width: 290,
    marginTop: 60,
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
    fontWeight:'500'
  },
  input: {
    width: 210,
    backgroundColor: '#FFFFFF',
    marginTop: 40,
    paddingVertical: 10,
    marginBottom: 25,
    paddingLeft: 10,
    color: 'white',
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
  PriceInput:{
    marginTop:10
  },
  descriptionInput:{
    marginTop:10
  },
  SumbitView: {
    width: 410,
    height: 250,
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
    marginBottom:18
  },
  maleTextView: {
    width: 200,
    height: '100%',
    // backgroundColor: 'pink',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4
  },
  maleText: {
    color: 'black',
    fontSize: 17,
    marginLeft: 13,
    fontWeight: '500',
  },
  deleteEditView: {
    elevation: 5,
    backgroundColor: 'white',
    width: 50,
    borderRadius: 5
  }
});