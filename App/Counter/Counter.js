import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '@react-native-firebase/firestore';
import { CounterContext } from '../context/CounterContext';


export default function Counter() {
    // const dispatch = useDispatch();

    // const counter = useSelector(state => state.count)
    // // console.log(counter.count);

    // const handalInc = () => {
    //     dispatch(increment());
    // }
    // const handalDec = () => {
    //     dispatch(decrement());
    // }
    const co = useContext(CounterContext)
    const handalInc = () => {
        co.increment(co.count)
    }

    const handalDec = () => {
        co.decrement(co.count)
    }

    return (

        <View>
            <Text>Counter</Text>
            {/* 1 */}
            <TouchableOpacity onPress={handalInc}>
                <Text>+</Text>
            </TouchableOpacity>

            <Text>{co.count}</Text>

            <TouchableOpacity onPress={handalDec}>
                <Text>-</Text>
            </TouchableOpacity>

        </View>
    )
}
