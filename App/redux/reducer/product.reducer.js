import { ADD_PRODUCTDATA, DELETE_PRODUCTDATA, GET_PRODUCTDATA, UPDATE_PRODUCTDATA } from "../ActionType";

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
            case DELETE_PRODUCTDATA:
                return{
                    isLoading: false,
                    productfire: state.productfire.filter((v) => v.id !== action.payload),
                    error: null
                }
                case UPDATE_PRODUCTDATA:
                    return {
                        isLoading: false,
                        productfire: state.productfire.map((v) => {
                            if (v.id === action.payload.id) {
                                return action.payload
                            } else {
                                return v;
                            }
                        }),
                        error: null
                    }
            default:
                return state
    }
}