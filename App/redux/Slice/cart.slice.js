import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore, { firebase } from '@react-native-firebase/firestore';


const initialState = {
    isLoading: false,
    cart: [],
    error: null
}
export const cartgetData = createAsyncThunk(
    'cart/cartgetData',
    async () => {
        try {
            const cartgetData = [];
            await firestore()
            .collection('Cart')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot =>{
                    cartgetData.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
                })
                   
            });

    //    console.log("dkjndsjdjddjjdjdsj", cartgetData[0].cart);
       return cartgetData;
        } catch (error) {
            console.log("DCDJCDSJDCSJJDCSJDSJDS",error);
        }
    
    }
 
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(cartgetData.fulfilled, (state, action) => {
            state.order = action.payload;
        });
    }
})
