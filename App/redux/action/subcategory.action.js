import firestore from '@react-native-firebase/firestore';
import { ADD_SUBCATEGORYDATA, DELETE_SUBCATEGORYDATA, GET_CATEGORYDATA, GET_SUBCATEGORYDATA, UPDATE_SUBCATEGORYDATA } from '../ActionType';

export const getsubcategorydata = () => async (dispatch) => {

    try {
        const subCategoryData = [];
        await firestore()
          .collection('SubCategory')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                subCategoryData.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
            });
          });

        // console.log("actionnnnnn", subCategoryData);
        dispatch({ type: GET_SUBCATEGORYDATA, payload: subCategoryData })
    } catch (error) {
        // console.log(error);
    }
}


export const addsubcategorysdata = (data) => async (dispatch) => {
    console.log("aoaooaaoaoaaoooaoaoaoaaoaoaoa",data);
    try {
        await firestore()
            .collection('SubCategory')
            .add(data)
            .then((doc) => {
                // console.log('SubCategory added!',doc.id);
                dispatch({ type: ADD_SUBCATEGORYDATA, payload:  { ...data, id: doc.id }  })
            })
            .catch((errors) => console.log(errors))
        
    } catch (error) {
        // console.log(error);
    }
}
export const deletesubcategory = (id) => async (dispatch) => {
    try {
        await firestore()
            .collection('SubCategory')
            .doc(id)
            .delete()
            .then(() => {
                dispatch({ type: DELETE_SUBCATEGORYDATA, payload: id })
            });

    } catch (error) {
        // console.log(error);
    }

}
export const updatesubcategory = (data) => async (dispatch) => {
    try {
        const temp = { ...data }
        delete temp.id
        firestore()
            .collection('SubCategory')
            .doc(data.id)
            .update(temp)
            .then((doc) => {
                dispatch({ type: UPDATE_SUBCATEGORYDATA, payload: data })
            });
    } catch (error) {
        // console.log(error);
    }
}
