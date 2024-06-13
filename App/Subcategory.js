import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Subcategory() {
  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
      {label: 'Men', value: 'men'},
      {label: 'Women', value: 'women'},
      {label: 'Mens Shirt', value: 'mens shirt'},
  ]);

  return (
    <View style={{paddingHorizontal:90,marginTop:50}}>
   <Modal
        isVisible={modalVisible}
        animationType='slide'
        transparent={true}
        visible={modalVisible}
      >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add SubCategory Name</Text>

            <View
                style={{
                  width:200,
                    position:'relative',
                    zIndex:999,
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
            />
            </View>
           

            <TouchableOpacity
              style={[styles.Sumbitbutton, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Add SubCategory name</Text>
      </TouchableOpacity>
      
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
    height:320,
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
    width:260,
    borderRadius: 35,
    padding: 10,
    elevation: 2,
    marginTop:20,

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
  Sumbitbutton:{
    width:200,
    borderRadius: 35,
    padding: 10,
    elevation: 2,
    marginTop:20,
  }
});
