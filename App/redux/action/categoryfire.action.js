import { GETDATA, INCREMENT_COUNTER } from "../ActionType"

export const getcatedata = () => async (dispatch) => {
    dispatch({ type: GETDATA })
    try {
        const categoryData = [];
        const CategoryDetail = await firestore()
            .collection('Category')
            .get()
            .then(querySnapshot => {
                console.log('Total Category: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    categoryData.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
                });
                
            });
    } catch (error) {

    }


}