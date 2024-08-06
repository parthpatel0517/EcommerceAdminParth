import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';

const intialState = {
    isLoading: false,
    brand: [],
    error: null
}

export const addbrand = createAsyncThunk(
    'brand/addbrand',
    async (data) => {

        try {
            let id = '';
            await firestore()
                .collection('Brand')
                .add(data)
                .then((doc) => {
                    id = doc.id

                })
            return { ...data, id: id };

        } catch (error) {
            // console.log("Branddata", Branddata);
            // console.log(error);
        }
    },
)

export const getbrand = createAsyncThunk(
    'brand/getbrand',
    async () => {


        try {
            const getbranddata = [];
            await firestore()
                .collection('Brand')
                .get()
                .then(querySnapshot => {

                    querySnapshot.forEach(documentSnapshot => {

                        getbranddata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
                    });
                });

            return getbranddata;

        } catch (error) {
            console.log(error);
        }
    },
)
export const Deletebrand = createAsyncThunk(
    'brand/Deletbrand',
    async (id) => {

        try {
            await firestore()
                .collection('Brand')
                .doc(id)
                .delete()
                .then(() => {

                });

            return id;

        } catch (error) {
            console.log(error);
        }
    },
)

export const updatebrand = createAsyncThunk(
    'brand/updatebrand',
    async (data) => {

        try {
            const temp = { ...data };
            delete temp.id;
            await firestore()
                .collection('Brand')
                .doc(data.id)
                .update(temp)

            return data;

        } catch (error) {


        }

    },
)

export const brandSlice = createSlice({
    name: 'brand',
    initialState: intialState,
    extraReducers: (builder) => {
        builder
            .addCase(getbrand.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.brand = action.payload;
                state.error = null;
            })
            .addCase(addbrand.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.brand = state.brand.concat(action.payload),
                    state.error = null
            })
            .addCase(Deletebrand.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.brand = state.brand.filter((v) => v.id !== action.payload),
                    state.error = null
            })
            .addCase(updatebrand.fulfilled, (state, action) => {
                state.isLoading = false,
                state.brand = state.brand.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v;
                    }
                }),
                state.error = null
            })

    },
})
export default brandSlice.reducer