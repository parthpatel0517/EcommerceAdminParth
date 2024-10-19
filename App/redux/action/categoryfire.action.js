import axios from "axios";
import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../ActionType"
import firestore from '@react-native-firebase/firestore';
import { date } from "yup";

export const getcategorydata = () => async (dispatch) => {

    try {
        // const categoryData = [];
        // await firestore()
        //     .collection('Category')
        //     .get()
        //     .then(querySnapshot => {
        //         // console.log('Total Category: ', querySnapshot.size);

        //         querySnapshot.forEach(documentSnapshot => {
        //             categoryData.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        //         });
        //     });

        const response = await axios.get("http://192.168.1.6:8000/api/v1/categories/list-categories", 
        { headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzExMWM1NTY1MGM3ZTEwZDcxNGFjZjEiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MzQ3MzEwLCJleHAiOjE3MjkzNTA5MTB9.q9trtYzKgrmySQhQwbCOQJfksvN9v2aFl-A4n1waklQ`} });
        // console.log("rrrrrrrrrrssshshshshrrr",response.data.data)

        // // console.log("actionnnnnn", categoryData);
        dispatch({ type: GET_CATEGORY, payload: response.data.data })
    } catch (error) {
        // console.log(error);
    }
}
export const addcategory = (data) => async (dispatch) => {
    console.log("lllslslslllslsllslslsllsllslslslsls", data);
    try {
        // await firestore()
        //     .collection('Category')
        //     .add(data)
        //     .then((doc) => {
        //         // console.log('Category addd!', doc.id);
        //         dispatch({ type: ADD_CATEGORY, payload: { ...data, id: doc.id } })
        //     })
        //     .catch((errors) =>
        //     console.log(errors)
        //     )
        const response = await axios.post("http://192.168.1.6:8000/api/v1/categories/add-category", data,
        { headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzExMWM1NTY1MGM3ZTEwZDcxNGFjZjEiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MjU1MjkwLCJleHAiOjE3MjkyNTg4OTB9.ddg4iMjJjCKdKBDJacciEHJVTbMVrEk9vk0FHjPidi4`} },   
        )
        console.log("rrrrrrrrrrrrr",response.data.data)

        dispatch({ type: ADD_CATEGORY, payload: response.data.data})

    } catch (error) {
        // console.log(error);
    }
}
export const deletecategory = (id) => async (dispatch) => {
    try {
        // await firestore()
        //     .collection('Category')
        //     .doc(id)
        //     .delete()
        //     .then(() => {
        //         dispatch({ type: DELETE_CATEGORY, payload: id })
        //     });
        const response = await axios.delete("http://192.168.1.6:8000/api/v1/categories/delete-category/"+ id, 
        { headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzExMWM1NTY1MGM3ZTEwZDcxNGFjZjEiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MzQ3MzEwLCJleHAiOjE3MjkzNTA5MTB9.q9trtYzKgrmySQhQwbCOQJfksvN9v2aFl-A4n1waklQ`} });
        // console.log("resppfdkkfkjkffkjfdkjjkdfkjdfkjdf",id);

        dispatch({ type: DELETE_CATEGORY, payload: id })


    } catch (error) {
        console.log(error);
    }

}
export const updatecategory = (data) => async (dispatch) => {
    try {
        // const temp = { ...data }
        // delete temp.id
        // firestore()
        //     .collection('Category')
        //     .doc(data.id)
        //     .update(temp)
        //     .then((doc) => {
        //         dispatch({ type: UPDATE_CATEGORY, payload: data })
        //     });

        const response = await axios.put(
            "http://192.168.1.6:8000/api/v1/categories/update-category/" + data._id,{name : data.name , description : data.description},
            {headers: {
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzExMWM1NTY1MGM3ZTEwZDcxNGFjZjEiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MzQ3MzEwLCJleHAiOjE3MjkzNTA5MTB9.q9trtYzKgrmySQhQwbCOQJfksvN9v2aFl-A4n1waklQ`,
                },
            }
        );
        console.log("Update response:", response);
        dispatch({ type: UPDATE_CATEGORY, payload: response.data.data });
    } catch (error) {
        // console.log(error);
    }
}
