import { ADD_PRODUCTDATA, DELETE_PRODUCTDATA, GET_PRODUCTDATA, UPDATE_PRODUCTDATA } from "../ActionType";
import firestore from '@react-native-firebase/firestore';

export const getproductdata = () => async (dispatch) => {
  // console.log("okokkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  try {
    const productsData = [];
    await firestore()
      .collection('Product')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {

          productsData.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
        // console.log("slslssskkkkkkkkkkkkkkkkkkk", productsData);
      });

    dispatch({ type: GET_PRODUCTDATA, payload: productsData })
  } catch (error) {
    console.log(error);
  }
}

export const addproductdata = (data) => async (dispatch) => {
  console.log("pppspsppppspaaaaaaaaaaaaaaa", data);
  try {

    await firestore()
      .collection('Product')
      .add(data)
      .then((doc) => {
        console.log('Product added!', doc.id);
        dispatch({ type: ADD_PRODUCTDATA, payload: { ...data, id: doc.id } })
      })
      .catch((errors) => (console.log(errors)))

  } catch (error) {
    console.log(error)
  }
}

export const deleteproductdata = (id) => async (dispatch) => {
  try {
    await firestore()
      .collection('Product')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
        dispatch({type:DELETE_PRODUCTDATA , payload:id})
        // Products();
      });
  } catch (error) {
    console.log(error);
  }
}
export const updateproductdata = (data) => async (dispatch) => {
  try {
    const temp = { ...data }
    delete temp.id
    await firestore()
    .collection('Product')
    .doc(data.id)
    .set(temp)
    .then(() => {
      console.log('Product Update!');
      dispatch({type:UPDATE_PRODUCTDATA , payload : data})
    })
  } catch (error) {
    console.log(error);
  }
}

