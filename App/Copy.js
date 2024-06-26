import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { object, string, number, boolean } from 'yup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import NetInfo from "@react-native-community/netinfo";

export default function Validation() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [selectdrop, setSelectdrop] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(null);
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        getData();
    }, [isConnected]);

    const getData = async () => {
        if (isConnected) {
            const response = await fetch("https://dummyjson.com/products/categories");
            const data = await response.json();
            setData(data);
            await AsyncStorage.setItem("category", JSON.stringify(data));
        } else {
            const Cat_data = await AsyncStorage.getItem("category");
            if (Cat_data) {
                setData(JSON.parse(Cat_data));
            }
        }
    };

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Men', value: 'men' },
        { label: 'Women', value: 'women' },
        { label: 'Mens Shirt', value: 'mens shirt' },
    ]);

    const userSchema = object({
        name: string().required("Please enter name").matches(/^[a-zA-Z ]+$/, "Please enter valid name"),
        email: string().required().email(),
        mobilenumber: string().required().matches(/^\d{10}$/, "Mobile number must be 10 digits"),
        age: number().required().min(18, "Minimum 18 age allowed").typeError("Please enter age in digits"),
        password: string().required().matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Password must be 8 combination of alphabet, digit, and special symbol."),
        checkbox: boolean().oneOf([true], "Please select the checkbox"),
        radiobutton: string().required("Please select at least one"),
        dropdown: string().required('Please select category')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            email: '',
            mobilenumber: '',
            password: '',
            checkbox: false,
            radiobutton: '',
            dropdown: ''
        },
        validationSchema: userSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
            setModalVisible(false);
            const catData = await AsyncStorage.getItem("ValidationInfo");
            if (update) {
                const Udata = JSON.parse(catData).map((v) => {
                    if (v.id === update.id) {
                        return { ...v, ...values };
                    }
                    return v;
                });
                await AsyncStorage.setItem("ValidationInfo", JSON.stringify(Udata));
                setData(Udata);
            } else {
                const newData = { id: Math.floor(Math.random() * 10000), ...values };
                const asyncData = catData ? JSON.parse(catData).concat(newData) : [newData];
                await AsyncStorage.setItem("ValidationInfo", JSON.stringify(asyncData));
                setData(asyncData);
            }
            setName('');
            setUpdate(null);
            resetForm();
        },
    });

    const { handleChange, errors, values, handleSubmit, setFieldValue, setValues } = formik;

    const handleDelete = async (id) => {
        const data = await AsyncStorage.getItem("ValidationInfo");
        const filteredData = JSON.parse(data).filter((v) => v.id !== id);
        await AsyncStorage.setItem("ValidationInfo", JSON.stringify(filteredData));
        setData(filteredData);
    };

    const handleEdit = (data) => {
        setModalVisible(true);
        setValues(data);
        setUpdate(data);
    };

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
                                isChecked={values.checkbox}
                                onPress={() => setFieldValue('checkbox', !values.checkbox)}
                            />
                            <Text style={{ color: 'red' }}>{errors.checkbox}</Text>

                            <View style={styles.radioGroup}>
                                {['ReactJS', 'NextJs', 'React Native'].map((option, index) => (
                                    <View style={styles.radioButton} key={index}>
                                        <RadioButton.Android
                                            value={option}
                                            status={values.radiobutton === option ? 'checked' : 'unchecked'}
                                            onPress={() => setFieldValue('radiobutton', option)}
                                            color="#007BFF"
                                        />
                                        <Text style={styles.radioLabel}>{option}</Text>
                                    </View>
                                ))}
                            </View>
                            <Text style={{ color: 'red', marginBottom: 20 }}>{errors.radiobutton}</Text>
                            
                            <View style={{ width: 200, position: 'relative', zIndex: 1000, paddingHorizontal: 15 }}>
                                <DropDownPicker
                                    open={open}
                                    value={value}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={(val) => {
                                        setFieldValue('dropdown', val);
                                        setValue(val);
                                    }}
                                    setItems={setItems}
                                    placeholder={'Choose Category.'}
                                />
                                <Text style={{ color: 'red', marginBottom: 20 }}>{errors.dropdown}</Text>
                            </View>

                            <TextInput
                                color='red'
                                placeholder='Category name'
                                placeholderTextColor='#9B9B9B'
                                style={styles.input}
                                onChangeText={handleChange('name')}
                                value={values.name}
                            />
                            <Text style={{ color: 'red' }}>{errors.name}</Text>
                            <TextInput
                                color='red'
                                placeholder='Category age'
                                placeholderTextColor='#9B9B9B'
                                style={styles.input}
                                onChangeText={handleChange('age')}
                                value={values.age}
                            />
                            <Text style={{ color: 'red' }}>{errors.age}</Text>
                            <TextInput
                                color='red'
                                placeholder='Category email'
                                placeholderTextColor='#9B9B9B'
                                style={styles.input}
                                onChangeText={handleChange('email')}
                                value={values.email}
                            />
                            <Text style={{ color: 'red' }}>{errors.email}</Text>
                            <TextInput
                                color='red'
                                placeholder='Category mobilenumber'
                                placeholderTextColor='#9B9B9B'
                                style={styles.input}
                                onChangeText={handleChange('mobilenumber')}
                                value={values.mobilenumber}
                            />
                            <Text style={{ color: 'red' }}>{errors.mobilenumber}</Text>
                            <TextInput
                                color='red'
                                placeholder='Category password'
                                placeholderTextColor='#9B9B9B'
                                style={styles.input}
                                onChangeText={handleChange('password')}
                                value={values.password}
                            />
                            <Text style={{ color: 'red' }}>{errors.password}</Text>

                            <TouchableOpacity onPress={handleSubmit}>
                                <View style={{ padding: 10, backgroundColor: '#0D99FF', borderRadius: 10, marginBottom: 10 }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
                                </View>
                            </TouchableOpacity>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>Add Category</Text>
                </Pressable>
            </View>
            {data.map((v) => (
                <View key={v.id} style={{ padding: 10, backgroundColor: '#E5E5E5', margin: 10 }}>
                    <Text>{v.name}</Text>
                    <Text>{v.age}</Text>
                    <Text>{v.email}</Text>
                    <Text>{v.mobilenumber}</Text>
                    <TouchableOpacity onPress={() => handleEdit(v)}>
                        <MaterialIcons name="edit" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(v.id)}>
                        <MaterialIcons name="delete" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
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
        borderRadius: 20,
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
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        marginLeft: 5,
    },
    input: {
        height: 40,
        borderColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 10,
        width: '100%',
    },
});
