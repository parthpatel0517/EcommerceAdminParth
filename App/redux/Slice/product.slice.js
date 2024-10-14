import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore';

const initialState = {
    isLoading: false,
    Productfire: [],
    error: null
}

export const productgetData = createAsyncThunk(
    'Productfire/productgetData',
    async () => {
        try {
            const progetData = [];
            await firestore()
            .collection('Product')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot =>{
                    progetData.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
                })
                   
            });

       console.log("progetDataprogetDataprogetDataprogetData", progetData);
       return progetData;
        } catch (error) {
            console.log("DCDJCDSJDCSJJDCSJDSJDS",error);
        }
    
    }
 
)


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(productgetData.fulfilled, (state, action) => {
            state.order = action.payload;
        });
    }
});


export default productSlice.reducer
