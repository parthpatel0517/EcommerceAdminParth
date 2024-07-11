import firestore from '@react-native-firebase/firestore';
import { DELETE_SUBCATEGORYDATA, GET_CATEGORYDATA, UPDATE_SUBCATEGORYDATA } from '../ActionType';

export const getcategorysssdata = (data) =>async (dispatch) => {
    try {
        await firestore()
        .collection('SubCategory')
        .add(data)
        .then(() => {
          console.log('SubCategory added!');
        })
        .catch((errors) => console.log(errors))
        dispatch({typr: GET_CATEGORYDATA , payload : data})
    } catch (error) {

    }
}
export const deletesubcategory = (id) => async (dispatch) => {
    try {
        await firestore()
        .collection('SubCategory')
        .doc(id)
        .delete()
        .then(() => {
            dispatch({typr: DELETE_SUBCATEGORYDATA , payload : id})
        });

    } catch (error) {
        console.log(error);
    }

}
export const updatesubcategory = (data) => async (dispatch) => {
    try {
        const temp = {...data}
        delete temp.id
        await firestore()
        .collection('SubCategory')
        .doc(data.id)
        .update(temp)
        .then((doc) => {
            dispatch({type:UPDATE_SUBCATEGORYDATA,payload:data})
        });
    } catch (error) {
        console.log(error);
    }
}
