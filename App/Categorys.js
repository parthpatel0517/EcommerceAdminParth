import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Modal from "react-native-modal";
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function Categorys() {
  const [modalVisible, setModalVisible] = useState(false);
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
            <Text style={styles.modalText}>Add Category Name</Text>
            <TextInput
              style={styles.input}
              placeholder='Category Name'
              placeholderTextColor='#9B9B9B'
            />
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
        <Text style={styles.textStyle}>Add Category name</Text>
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
    width: 250,
    margin: 25,
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
  },
  input: {
    width: 190,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
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