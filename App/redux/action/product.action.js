import { ADD_PRODUCTDATA, DELETE_PRODUCTDATA, GET_PRODUCTDATA, UPDATE_PRODUCTDATA } from "../ActionType";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const initialstate = {
  isLoading: false,
  productdata: [],
  error: null,
};


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
    if(data.url === ""){
      await firestore()
      .collection('Product')
      .add({ ...data, url: data.url })
      .then((doc) => {
        console.log('Product added!', doc.id);
        dispatch({ type: ADD_PRODUCTDATA, payload: { ...data, id: doc.id, url:data.url } })
      })
      .catch((errors) => (console.log(errors)))

    }
    let arr = data.url.split("/");

    const rNo = Math.floor(Math.random() * 10000);

    const fileName = rNo + arr[arr.length - 1];

    const reference = await storage().ref('/Product/' + fileName);

    const task = await reference.putFile(data.url);

    const url = await storage().ref('/Product/' + fileName).getDownloadURL();

    await firestore()
      .collection('Product')
      .add({ ...data, url: url, imgName: fileName })
      .then((doc) => {
        console.log('Product added!', doc.id);
        dispatch({ type: ADD_PRODUCTDATA, payload: { ...data, id: doc.id, url: url, imgName: fileName } })
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
        dispatch({ type: DELETE_PRODUCTDATA, payload: id })
        // Products();
      });
  } catch (error) {
    console.log(error);
  }
}
export const updateproductdata = (data) => async (dispatch) => {
  try {
    console.log('kkkkkkkkkkkkkkkkk', data);


    if (data.url === "") {
      console.log("hjkhjkhjkhkl"); 

      await firestore()
        .collection('Product')
        .doc(data.id)
        .update({
          url: data.url,
          brand_id: data.brand_id,
          color_id: data.color_id,
          Subcategory_id: data.Subcategory_id,
          category_id: data.category_id,
          Description: data.Description,
          Productname: data.Productname,
          Price: data.Price,
        })
        .then(() => {
          console.log('User updated!');
          dispatch({
            type: UPDATE_PRODUCTDATA,
            payload: {
              ...data,
              url: data.url,
              brand_id: data.brand_id,
              color_id: data.color_id,
              Subcategory_id: data.Subcategory_id,
              category_id: data.category_id,
              Description: data.Description,
              Productname: data.Productname,
              Price: data.Price,
            },
          });
        });


    } else {
      let check = data.url.split('/')[0];
      console.log('checkcjffsda', check)

      // console.log('AFAFASDFASDF', data?.imgName);

      if (check === 'https:') {
        await firestore()
          .collection('Product')
          .doc(data.id)
          .update({

            url: data.url,
            brand_id: data.brand_id,
            color_id: data.color_id,
            Subcategory_id: data.Subcategory_id,
            category_id: data.category_id,
            Description: data.Description,
            Productname: data.Productname,
            Price: data.Price,
          })
          .then(() => {
            console.log('User updated!');
            dispatch({
              type: UPDATE_PRODUCTDATA,
              payload: {
                ...data,
                url: data.url,
                brand_id: data.brand_id,
                color_id: data.color_id,
                Subcategory_id: data.Subcategory_id,
                category_id: data.category_id,
                Description: data.Description,
                Productname: data.Productname,
                Price: data.Price,
              },
            });
          });


      } else {
        console.log('lllllll', data);

        if (data?.imgName) {
          const reference = await storage().ref('/Product/' + data?.imgName);
          reference.delete();
        }
        const arr = data.url.split('/');

        console.log(arr[arr.length - 1]);

        const Rno = Math.floor(Math.random() * 10000);

        const fileName = Rno + arr[arr.length - 1];
        console.log('finamjaisfhasf', fileName);

        const reference = await storage().ref('/Product/' + fileName);

        const task = await reference.putFile(data.url);

        const url = await storage().ref('/Product/' + fileName).getDownloadURL();
        console.log('urlurlrurl', url);

        await firestore()
          .collection('Product')
          .doc(data.id)
          .update({

            url: url,
            brand_id: data.brand_id,
            color_id: data.color_id,
            Subcategory_id: data.Subcategory_id,
            category_id: data.category_id,
            Description: data.Description,
            Productname: data.Productname,
            Price: data.Price,
            imgName: fileName
          })
          .then(() => {
            console.log('User updated!');
            dispatch({
              type: UPDATE_PRODUCTDATA,
              payload: {
                ...data,
                url: data.url,
                brand_id: data.brand_id,
                color_id: data.color_id,
                Subcategory_id: data.Subcategory_id,
                category_id: data.category_id,
                Description: data.Description,
                Productname: data.Productname,
                Price: data.Price,
                imgName: fileName,
              }, 
            });
          });

      }
    }
  } catch (error) {
    console.log("rerwerwerwe", error);

  }
}



