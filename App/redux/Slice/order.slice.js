import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore, { firebase } from '@react-native-firebase/firestore';

const initialState = {
    isLoading: false,
    order: [],
    error: null
}
export const ordergetData = createAsyncThunk(
    'order/ordergetData',
    async () => {
        try {
            const getData = [];
            await firestore()
            .collection('OrderData')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot =>{
                    getData.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
                })
                   
            });

       console.log("dkjndsjdjddjjdjdsj", getData);
       return getData;
        } catch (error) {
            console.log("DCDJCDSJDCSJJDCSJDSJDS",error);
        }
    
    }
 
)




const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ordergetData.fulfilled, (state, action) => {
            state.order = action.payload;
        });
    }
});


export default orderSlice.reducer