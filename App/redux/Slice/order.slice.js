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
                    querySnapshot.forEach(documentSnapshot => {
                        getData.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
                    })

                });

            //    console.log("dkjndsjdjddjjdjdsj", getData);
            return getData;
        } catch (error) {
            console.log("DCDJCDSJDCSJJDCSJDSJDS", error);
        }

    }

)
export const updatestatus = createAsyncThunk(
    'order/updatestatus',
    async (data) => {
        console.log("sssssowowpwpwqppqpqpqpq", data.oldData.Ordernum);

       
            const userRefrence = await firestore().collection('OrderData').doc(data.oldData.address.uid);
            const userdoc = await userRefrence.get();
        console.log("kffkfjkjfjkjfjdfdfjfdjfdjkfdjkfjkdfjkdjfkdfjk",userdoc.data());
            const Fdata = userdoc.data().order.map((v) => {
                if (v.Ordernum === data.oldData.Ordernum) {
                    return { ...v, Status: data.newData.dropdown }
                } else {
                    return v
                }
            })

            try {
                await firestore()
                    .collection('OrderData')
                    .doc(data.oldData.address.uid)
                    .delete()
                    .then(() => {
                        console.log('User deleted!');
                    });

                await firestore()
                    .collection('OrderData')
                    .doc(data.oldData.address.uid)
                    .set({
                        order : Fdata
                    })
                    .then(() => {
                        console.log('User Add!');
                    });

            } catch (error) {
                console.log("errorrorororor", error);
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