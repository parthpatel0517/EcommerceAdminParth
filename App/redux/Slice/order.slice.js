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

    //    console.log("dkjndsjdjddjjdjdsj", getData);
       return getData;
        } catch (error) {
            console.log("DCDJCDSJDCSJJDCSJDSJDS",error);
        }
    
    }
 
)
export const updatestatus = createAsyncThunk(
    'order/updatestatus',
    async (data) => {
        console.log("sssssowowpwpwqppqpqpqpq", data);

        try {
            const userRefrence = await firestore().collection('OrderData').doc(data.oldData.uid);

            try {
                await userRefrence.update(
                    {
                        Status: firebase.firestore.FieldValue.arrayRemove(
                            data.oldData
                        )
                    }
                );

                await userRefrence.update(
                    {
                        Status: firebase.firestore.FieldValue.arrayUnion(
                            data.newData
                        )
                    }
                );
                console.log("ksksksksssjksjsdjjdjdjdjdjkdjkdjdjkdjsdj");
            } catch (error) {
                console.log("dlspkxscdfjdoijhihufhfiu", error);
            }

            const getaddshipdata = [];
            await firestore()
                .collection('OrderData')
                .doc(data.oldData.uid)
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        getaddshipdata.push({ id: documentSnapshot.id, ...documentSnapshot.data() })

                    }
                });

            return getaddshipdata;
        } catch (error) {
            console.log("alallalallllskskkwowpqosks", error);
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
        builder.addCase(updatestatus.fulfilled, (state, action) => {
            state.order = action.payload;
        });

    }
});


export default orderSlice.reducer