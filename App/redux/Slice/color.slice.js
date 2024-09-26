import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';

const intialState = {
    isLoading: false,
    color: [],
    error: null
}

export const addcolor = createAsyncThunk(
    'color/addcolor',
    async (data) => {

        try {
            let id = '';
            await firestore()
                .collection('Color')
                .add(data)
                .then((doc) => {
                    id = doc.id

                })
            return { ...data, id: id };

        } catch (error) {
            // console.log("colordata", colordata);
            // console.log(error);
        }
    },
)

export const getcolor = createAsyncThunk(
    'color/getcolor',
    async () => {


        try {
            const getcolordata = [];
            await firestore()
                .collection('Color')
                .get()
                .then(querySnapshot => {

                    querySnapshot.forEach(documentSnapshot => {

                        getcolordata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
                    });
                });

            return getcolordata;

        } catch (error) {
            // console.log(error);
        }
    },
)
export const Deletecolor = createAsyncThunk(
    'color/Deletcolor',
    async (id) => {

        try {
            await firestore()
                .collection('Color')
                .doc(id)
                .delete()
                .then(() => {

                });

            return id;

        } catch (error) {
            // console.log(error);
        }
    },
)

export const updatecolor = createAsyncThunk(
    'color/updatecolor',
    async (data) => {

        try {
            const temp = { ...data };
            delete temp.id;
            await firestore()
                .collection('Color')
                .doc(data.id)
                .update(temp)

            return data;

        } catch (error) {


        }

    },
)

export const colorSlice = createSlice({
    name: 'color',
    initialState: intialState,
    extraReducers: (builder) => {
        builder
            .addCase(getcolor.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.color = action.payload;
                state.error = null;
            })
            .addCase(addcolor.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.color = state.color.concat(action.payload),
                    state.error = null
            })
            .addCase(Deletecolor.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.color = state.color.filter((v) => v.id !== action.payload),
                    state.error = null
            })
            .addCase(updatecolor.fulfilled, (state, action) => {
                state.isLoading = false,
                state.color = state.color.map((v) => {
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
export default colorSlice.reducer