import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { object, string, number, date, InferType } from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';

export default function Validation() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('option1');
    const [isSelected, setSelection] = useState(false);

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
        password: string().required().matches(/^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be 8 combination of alpabet, digit and special symbol.")
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            email: '',
            mobilenumber: '',
            password: ''
        },
        validationSchema: userSchema,
        onSubmit: values => {
            console.log(values);
            setModalVisible(!modalVisible)
        },
    });
    const { handleChange, errors, values, handleSubmit } = formik

    return (
        <View style={styles.centeredView}>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    checked={isSelected}
                    onPress={() => setSelection(!isSelected)}
                    containerStyle={styles.checkbox}
                />
                <Text style={styles.label}>Do you like React Native?</Text>
            </View>
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
                       

                        <View style={styles.radioGroup}>
                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                    value="option1"
                                    status={selectedValue === 'option1' ?
                                        'checked' : 'unchecked'}
                                    onPress={() => setSelectedValue('option1')}
                                    color="#007BFF"
                                />
                                <Text style={styles.radioLabel}>
                                    ReactJS
                                </Text>
                            </View>

                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                    value="option2"
                                    status={selectedValue === 'option2' ?
                                        'checked' : 'unchecked'}
                                    onPress={() => setSelectedValue('option2')}
                                    color="#007BFF"
                                />
                                <Text style={styles.radioLabel}>
                                    NextJs
                                </Text>
                            </View>

                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                    value="option3"
                                    status={selectedValue === 'option3' ?
                                        'checked' : 'unchecked'}
                                    onPress={() => setSelectedValue('option3')}
                                    color="#007BFF"
                                />
                                <Text style={styles.radioLabel}>
                                    React Native
                                </Text>
                            </View>
                        </View>


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


                        <TextInput
                            color='red'
                            placeholder='Category name'
                            placeholderTextColor='#9B9B9B'
                            onChangeText={handleChange('name')}
                            value={values.name}
                        />
                        <Text style={{ color: 'red' }}>{errors ? errors.name : ''}</Text>
                        <TextInput
                            color='red'
                            placeholder='Category age'
                            placeholderTextColor='#9B9B9B'
                            onChangeText={handleChange('age')}
                            value={values.age > 18}
                        />
                        <Text style={{ color: 'red' }}>{errors ? errors.age : ''}</Text>
                        <TextInput
                            color='red'
                            placeholder='Category email'
                            placeholderTextColor='#9B9B9B'
                            onChangeText={handleChange('email')}
                            value={values.email}
                        />
                        <Text style={{ color: 'red' }}>{errors ? errors.email : ''}</Text>
                        <TextInput
                            color='red'
                            placeholder='Category mobilenumber'
                            placeholderTextColor='#9B9B9B'
                            onChangeText={handleChange('mobilenumber')}
                            value={values.mobilenumber}
                        />
                        <Text style={{ color: 'red' }}>{errors ? errors.mobilenumber : ''}</Text>
                        <TextInput
                            color='red'
                            placeholder='Category password'
                            placeholderTextColor='#9B9B9B'
                            onChangeText={handleChange('password')}
                            value={values.password}
                        />
                        <Text style={{ color: 'red' }}>{errors ? errors.password : ''}</Text>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => handleSubmit()}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
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
        marginBottom: 20
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
});
