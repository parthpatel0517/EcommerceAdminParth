import { ADD_PRODUCTDATA, GET_PRODUCTDATA } from "../ActionType";

const initialState = {
    isLoading: false,
    productfire: [],
    error: null
}

export const productsReducer = (state = initialState, action)=> {
    console.log("slslslslsllllllllllllllll",action); 

    switch(action.type){
        case GET_PRODUCTDATA:
            return {
                isLoading: false,
                productfire: action.payload,
                error: null
            }
            case ADD_PRODUCTDATA:
                return {
                    isLoading: false,
                    productfire: state.productfire.concat(action.payload),
                    error: null
                }
            default:
                return state
    }
}