import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../ActionType"
import firestore from '@react-native-firebase/firestore';

export const getcategorydata = () => async (dispatch) => {

    try {
        const categoryData = [];
        await firestore()
            .collection('Category')
            .get()
            .then(querySnapshot => {
                console.log('Total Category: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    categoryData.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
                });

            });

        console.log("actionnnnnn", categoryData);
        dispatch({ type: GET_CATEGORY, payload: categoryData })
    } catch (error) {
        console.log(error);
    }
}
export const addcategory = (data) => async (dispatch) => {
    console.log("lllslslslllslsllslslsllsllslslslsls", data);
    try {
        await firestore()
            .collection('Category')
            .add(data)
            .then((doc) => {
                console.log('Category addd!', doc.id);
                dispatch({ type: ADD_CATEGORY, payload: { ...data, id: doc.id } })
            })
            .catch((errors) => console.log(errors))


    } catch (error) {
        console.log(error);
    }
}
export const deletecategory = (id) => async (dispatch) => {
    try {
        await firestore()
            .collection('Category')
            .doc(id)
            .delete()
            .then(() => {
                dispatch({ type: DELETE_CATEGORY, payload: id })
            });
    } catch (error) {
        console.log(error);
    }

}
export const updatecategory = (data) => async (dispatch) => {
    try {
        const temp = {...data}
        delete temp.id
        firestore()
            .collection('Category')
            .doc(data.id)
            .update(temp)
            .then((doc) => {
                dispatch({type:UPDATE_CATEGORY,payload:data})
            });
    } catch (error) {
        console.log(error);
    }
}
