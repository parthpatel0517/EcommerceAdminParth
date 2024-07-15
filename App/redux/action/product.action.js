import { ADD_PRODUCTDATA, GET_PRODUCTDATA } from "../ActionType";
import firestore from '@react-native-firebase/firestore';

export const getproductdata = () => async (dispatch) => {
    console.log("okokkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    try {
        const productsData = [];
        await firestore()
          .collection('Product')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                
              productsData.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
            });
            console.log("slslssskkkkkkkkkkkkkkkkkkk",productsData);
          });
        
          dispatch({type: GET_PRODUCTDATA , payload:productsData})
    } catch (error) {
        console.log(error);
    }
}

export const addproductdata = (data) => async (dispatch) => {
    try {
        console.log("pppspsppsspspspspspsppsp",data);
        await firestore()
          .collection('Product')
          .add(data)
          .then((doc) => {
            console.log('Product added!',doc.id);
            dispatch({ type: ADD_PRODUCTDATA, payload:  { ...data, id: doc.id }  })
          })
          .catch((errors)=>(console.log(errors)))
    
    } catch (error) {
      console.log(error)
    }
}