import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../ActionType";


const initialState = {
    isLoading: false,
    categoryfire: [],
    error: null
}

export const categoryReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_CATEGORY:
            return {
                isLoading: false,
                categoryfire: action.payload,
                error: null
            }
        case ADD_CATEGORY:
            return {
                isLoading: false,
                categoryfire: state.categoryfire.concat(action.payload),
                error: null
            }
        case DELETE_CATEGORY:
            return {
                isLoading: false,
                categoryfire: state.categoryfire.filter((v) => v._id !== action.payload),
                error: null
            }
        case UPDATE_CATEGORY:
            return {
                isLoading: false,
                categoryfire: state.categoryfire.map((v) => {
                    if (v._id === action.payload._id) {
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