import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Modal from "react-native-modal";
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import firestore from '@react-native-firebase/firestore';
import { getcatedata } from '../redux/action/categoryfire.action';



export default function CategoryFire() {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [data, setdata] = useState([]);
    const [update, setUpdate] = useState(null)
    const [isConnected, SetIsConnected] = useState(true);
    useEffect(() => {
        getdata()
    }, [])

    const getdata = async () => {
        getcatedata()
          setdata(categoryData);
    }

    const handleSubmit1 = async (data) => {
       
        setModalVisible(false)
        if (update) {
          await firestore()
                .collection('Category')
                .doc(update)
                .set(data)
                .then(() => {
                    console.log('User added!');
                });
                console.log("Sssss",data);
        } else {
            await firestore()
                .collection('Category')
                .add(data)
                .then(() => {
                    console.log('Category added!');
                })
                .catch((errors) => console.log(errors))
        }
        getdata();
        setUpdate(null)

    }

    let userSchema = object({
        name: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: userSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            handleSubmit1(values)
            resetForm();
        },
    });
    const handaldelte = async (id) => {
        await firestore()
            .collection('Category')
            .doc(id)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
        getdata();
    }

    const { handleChange, errors, values, handleSubmit, handleBlur, touched, setValues } = formik

    const handalEdit = async (data) => {
        setModalVisible(true)
        setValues(data)
        setUpdate(data.id)
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
                            placeholder='Category Name'
                            placeholderTextColor='#9B9B9B'
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                        />
                        <Text style={{ color: 'red' }}>{errors.name && touched.name ? errors.name : ''}</Text>
                        <TouchableOpacity
                            style={[styles.buttonSumbit, styles.buttonClose]}
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
                    <View key={i} style={styles.TextSView}>
                        <View style={styles.maleTextView}>
                            <Text style={styles.maleText}>{v.name}</Text>
                        </View>

                        <TouchableOpacity onPress={() => handaldelte(v.id)} style={styles.deleteEditView}>
                            <MaterialIcons name="delete" size={33} color="red" paddingLeft={8} marginTop={7} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handalEdit(v)} style={styles.deleteEditView}>
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
        marginTop: 40,
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
        width: 200,
        borderRadius: 35,
        padding: 10,
        paddingHorizontal: 0,
        elevation: 2,
        marginTop: 24,
        marginLeft: 210

    },
    buttonSumbit: {
        width: 200,
        borderRadius: 35,
        padding: 10,
        elevation: 2,
        marginTop: 24

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
        marginTop: 40,
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
        paddingVertical: 14
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
