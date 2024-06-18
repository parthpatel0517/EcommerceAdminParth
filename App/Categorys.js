import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Modal from "react-native-modal";
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

export default function Categorys() {
  const [modalVisible, setModalVisible] = useState(false);
  const [Catname, setName] = useState('');
  const [data, setdata] = useState([]);
  const [update,setUpdate] = useState(null)

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const Cat_data = await AsyncStorage.getItem("category");
    setdata(JSON.parse(Cat_data));
  }


  const handleSubmit = async () => {
    setModalVisible(false);

    const catData = await AsyncStorage.getItem("category");
    if(update){
      const Udata = JSON.parse(catData).map((v)=>{
        if(v.id===update){
          return ({id: update , cat_name: Catname})
        } else{
          return v;
        }
      })

      await AsyncStorage.setItem("category", JSON.stringify(Udata))
      setUpdate(Udata)
      console.log(Udata);
    } else{
      if (catData) {
        console.log("fffffff");
        const asyncData = JSON.parse(catData);
  
        asyncData.push({ id: Math.floor(Math.random() * 10000), cat_name: Catname })
  
        await AsyncStorage.setItem("category", JSON.stringify(asyncData))
        setdata(asyncData)
      } else {
        let data = [{ id: Math.floor(Math.random() * 10000), cat_name: Catname }];
  
        await AsyncStorage.setItem("category", JSON.stringify(data))
        setdata(asyncData)
      }  
    }
   
    setName('')
    setUpdate(null)
    // console.log("async", catData);
    console.log(Catname);
  }

  const handaldelte = async (id) => {
    const data = await AsyncStorage.getItem("category");
    const fData = JSON.parse(data).filter((v) => v.id !== id);

    await AsyncStorage.setItem("category", JSON.stringify(fData));

    setdata(fData);
  }
  const handalEdit = async (id) => {
    console.log(id);

    setModalVisible(true)

    const data = await AsyncStorage.getItem("category");
    const fData = JSON.parse(data).find((v) => v.id === id);

    console.log(fData);


    setName(fData.cat_name);

    setUpdate(true)
  }

  return (
    <ScrollView>
      <Modal
        isVisible={modalVisible}
        animationType='slide'
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Category Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              placeholder='Category Name'
              placeholderTextColor='#9B9B9B'
              value={Catname}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleSubmit}>
              <Text style={styles.textStyle}>{update ? 'update' : 'Sumbit'}</Text>
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
        {data.map((v, i) => (
          <View key={v.id} style={styles.TextSView}>
            <View style={styles.maleTextView}>
              <Text style={styles.maleText}>{v.cat_name}</Text>
            </View>
    
              <TouchableOpacity onPress={() => handaldelte(v.id)}  style={styles.deleteEditView}>
                <MaterialIcons name="delete" size={33} color="red" paddingLeft={8} marginTop={7} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handalEdit(v.id)} style={styles.deleteEditView}>
                <MaterialIcons name="edit" size={33} color="blue" paddingLeft={10} marginTop={6} />
              </TouchableOpacity>
            </View>
        ))}
      </View>

    </ScrollView >
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40
  },
  modalView: {
    width: 300,
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
    borderRadius: 35,
    padding: 10,
    paddingHorizontal: 40,
    elevation: 2,
    marginTop: 10
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
    width: 240,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
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
  SumbitView: {
    elevation: 9,
    borderRadius: 10,
    padding: 14,
    marginTop: 60,
    backgroundColor: 'white'
  },
  TextSView: {
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 3,
    marginBottom: 18
  },
  maleTextView: {
    width: 220,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    paddingVertical:14
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
    borderRadius: 5,
  }
});
