import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { object, string, number, date, InferType, boolean } from 'yup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
// import { CheckBox } from 'react-native-elements';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import NetInfo from "@react-native-community/netinfo";



export default function Validation() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [selectdrop, setSelectdrop] = useState('')
    const [name, setName] = useState('');
    const [data, setdata] = useState([]);
    const [update, setUpdate] = useState(null)
    const [isConnected, SetIsConnected] = useState(true);
    // useEffect(() => {
    //     const unsubscribe = NetInfo.addEventListener(state => {
    //         SetIsConnected(state.isConnected)
    //     });
    //     return () => {
    //         unsubscribe()
    //     }
    // }, [])

    useEffect(() => {
        getdata();
    }, [isConnected]);

    const getdata = async () => {
        // if (isConnected) {
        //     const response = await fetch("https://dummyjson.com/products/categories")
        //     const data = await response.json()

        //     setdata(data)
        // } else {
            const Cat_data = await AsyncStorage.getItem("category");
            if (Cat_data) {
                setdata(JSON.parse(Cat_data));
            }
        // }
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
        { label: 'Mens Shirt', value: 'mens shirt' },
    ]);
    let userSchema = object({
        name: string().required("Please enter name").matches(/^[a-zA-Z ]+$/, "Please enter valid name"),
        email: string().required().email(),
        mobilenumber: string().required().matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        age: number().required().min(18, "Minimum 18 age allowed").typeError("Please enter age in digit"),
        password: string().required().matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must be 8 combination of alpabet, digit and special symbol."),
        checkbox: boolean().required("Please select the checkbox").oneOf([true]),
        radiobutton: string().required("Please select at list one"),
        dropdown: string().required('Please select category')
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            email: '',
            mobilenumber: '',
            password: '',
            checkbox: '',
            radiobutton: '',
            dropdown: ''
        },
        validationSchema: userSchema,

        onSubmit: async (values) => {
            console.log(values);
            setModalVisible(!modalVisible)
            const catData = await AsyncStorage.getItem("ValidationInfo");

            //console.log(update, "pppp");

            if (update) {
                const Udata = JSON.parse(catData).map((v) => {
                    if (v.id === update) {
                        return ({ id: update, name: values.name, age: values.age })
                    } else {
                        return v;
                    }
                })

                await AsyncStorage.setItem("ValidationInfo", JSON.stringify(Udata))
                setdata(Udata)
                //  console.log(Udata);
            } else {
                if (catData) {
                    console.log("fffffff");
                    const asyncData = JSON.parse(catData);

                    asyncData.push({ id: Math.floor(Math.random() * 10000), name: values.name, age: values.age })

                    await AsyncStorage.setItem("ValidationInfo", JSON.stringify(asyncData))
                    setdata(asyncData)
                } else {
                    let data = [{ id: Math.floor(Math.random() * 10000), name: values.name, age: values.age }];

                    await AsyncStorage.setItem("ValidationInfo", JSON.stringify(data))
                    setdata(asyncData)
                }
            }

            setName('')
            setUpdate(null)
            formik.resetForm()
        },

    });
    const { handleChange, errors, values, handleSubmit, setFieldValue ,setValues} = formik

    const handaldelte = async (id) => {
        const data = await AsyncStorage.getItem("ValidationInfo");
        const fData = JSON.parse(data).filter((v) => v.id !== id);

        await AsyncStorage.setItem("ValidationInfo", JSON.stringify(fData));

        setdata(fData);
    }
    const handalEdit = async (data) => {
        setModalVisible(true);
        setValues(data);
        setUpdate(data);
    }

    return (
        <ScrollView>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <BouncyCheckbox 
                                style={{ marginLeft: 100, marginBottom: 10 }}
                                size={25}
                                fillColor="red"
                                unFillColor="#FFFFFF"
                                text="CheckBox"
                                iconStyle={{ borderColor: "red" }}
                                innerIconStyle={{ borderWidth: 2 }}
                                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                onPress={() => { setSelection(!isSelected); setFieldValue('checkbox', !isSelected) }}
                                onChangeText={handleChange('checkbox')}
                            />
                            <Text style={{ color: 'red' }}>{isSelected ? '' : errors.checkbox}</Text>

                            <View style={styles.radioGroup}>
                                <View style={styles.radioButton}>
                                    <RadioButton.Android
                                        value="option1"
                                        status={selectedValue === 'option1' ?
                                            'checked' : 'unchecked'}
                                        onPress={() => { setSelectedValue('option1'); setFieldValue('radiobutton', 'ReactJS') }}
                                        onChangeText={handleChange('radiobutton')}

                                        color="#007BFF"
                                    />
                                    <Text style={styles.radioLabel}>ReactJS</Text>
                                </View>

                                <View style={styles.radioButton}>
                                    <RadioButton.Android
                                        value="option2"
                                        status={selectedValue === 'option2' ?
                                            'checked' : 'unchecked'}
                                        onPress={() => { setSelectedValue('option2'); setFieldValue('radiobutton', 'NextJs') }}
                                        onChangeText={handleChange('radiobutton')}
                                        color="#007BFF"
                                    />
                                    <Text style={styles.radioLabel}>NextJs</Text>
                                </View>

                                <View style={styles.radioButton}>
                                    <RadioButton.Android
                                        value="option3"
                                        status={selectedValue === 'option3' ?
                                            'checked' : 'unchecked'}
                                        onPress={() => { setSelectedValue('option3'); setFieldValue('radiobutton', 'React Native') }}
                                        onChangeText={handleChange('radiobutton')}
                                        color="#007BFF"
                                    />
                                    <Text style={styles.radioLabel}>React Native</Text>

                                </View>
                            </View>
                            <Text style={{ color: 'red', marginBottom: 20 }}>{selectedValue ? '' : errors.radiobutton}</Text>
                            
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
                                    onPress={() => setSelectdrop(!selectdrop)}
                                    onChangeText={handleChange('dropdown')}
                                    onSelectItem={(items) => setFieldValue('dropdown', items.value)}
                                />
                                <Text style={{ color: 'red', marginBottom: 20 }}>{selectdrop ? '' : errors.dropdown}</Text>
                            </View>


                            <TextInput

                                color='red'
                                placeholder='Category name'
                                placeholderTextColor='#9B9B9B'
                                style={styles.input}
                                onChangeText={handleChange('name')}
                                value={values.name}
                            />
                            <Text style={{ color: 'red' }}>{errors.name ? errors.name : ''}</Text>
                            <TextInput

                                color='red'
                                placeholder='Category age'
                                placeholderTextColor='#9B9B9B'
                                style={styles.input}
                                onChangeText={handleChange('age')}
                                value={values.age > 18}
                            />
                            <Text style={{ color: 'red' }}>{errors.age ? errors.age : ''}</Text>
                            <TextInput
                                color='red'
                                placeholder='Category email'
                                placeholderTextColor='#9B9B9B'
                                style={styles.input}
                                onChangeText={handleChange('email')}
                                value={values.email}
                            />
                            <Text style={{ color: 'red' }}>{errors.email ? errors.email : ''}</Text>
                            <TextInput
                                color='red'
                                placeholder='Category mobilenumber'
                                placeholderTextColor='#9B9B9B'
                                style={styles.input}
                                onChangeText={handleChange('mobilenumber')}
                                value={values.mobilenumber}
                            />
                            <Text style={{ color: 'red' }}>{errors.mobilenumber ? errors.mobilenumber : ''}</Text>
                            <TextInput
                                color='red'
                                placeholder='Category password'
                                placeholderTextColor='#9B9B9B'
                                style={styles.input}
                                onChangeText={handleChange('password')}
                                value={values.password}
                            />
                            <Text style={{ color: 'red' }}>{errors.password ? errors.password : ''}</Text>

                            <TouchableOpacity
                                style={[styles.button1, styles.buttonClose]}
                                onPress={() => handleSubmit()}>
                                <Text style={styles.textStyle}>Sumbit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>Show Modal</Text>
                </TouchableOpacity>

                <View style={styles.SumbitView}>
                    {data.map((v, i) => (
                        <View key={v.id} style={styles.TextSView}>
                            <View style={styles.maleTextView}>
                                <Text style={styles.maleText}>Name: {v.name}</Text>
                                {/* <Text style={styles.age}>age: {v.age}</Text> */}
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
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 26,
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
        borderRadius: 50,
        paddingVertical: 15,
        elevation: 2,
        position: 'absolute',
        top: 0,
        paddingHorizontal: 90
    },
    button1: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        paddingHorizontal: 30,
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
        fontSize: 16
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 5,
        borderRadius: 8,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 10
    },

    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        marginRight: 10,
        fontSize: 16,
        color: '#333',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        padding: 0,
    },
    label: {
        margin: 8,
        color: 'black'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    SumbitView: {
        elevation: 9,
        borderRadius: 10,
        padding: 14,
        marginTop: 100,
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
        width: 270,
        paddingVertical: 200,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 4,
        paddingVertical: 14,
        flexDirection: 'row'
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
    },
    age: {
        color: 'black',
        fontSize: 17,
        marginLeft: 13,
        fontWeight: '500',
    }
});
