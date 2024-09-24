import { ADD_SUBCATEGORYDATA, DELETE_SUBCATEGORYDATA, GET_SUBCATEGORYDATA, UPDATE_SUBCATEGORYDATA } from "../ActionType";


const initialState = {
    isLoading: false,
    subcategoryfire: [],
    error: null
}

export const subcategoryReducer = (state = initialState, action) => {
    // console.log("sjsjjsjjsjjsj",action);

    switch (action.type) {
        case GET_SUBCATEGORYDATA:
            return {
                isLoading: false,
                subcategoryfire: action.payload,
                error: null
            }
        case ADD_SUBCATEGORYDATA:
            return {
                isLoading: false,
                subcategoryfire: state.subcategoryfire.concat(action.payload),
                error: null
            }
            case DELETE_SUBCATEGORYDATA:
                return {
                    isLoading: false,
                    subcategoryfire: state.subcategoryfire.filter((v) => v.id !== action.payload),
                    error: null
                }
                case UPDATE_SUBCATEGORYDATA:
                    return {
                        isLoading: false,
                        subcategoryfire: state.subcategoryfire.map((v) => {
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