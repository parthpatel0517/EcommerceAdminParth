import { GET_CATEGORYDATA } from "../ActionType";


const initialState = {
    isLoading: false,
    subcategoryfire: [],
    error: null
}

export const subcategoryReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_CATEGORYDATA:
            return {
                isLoading: false,
                subcategoryfire: action.payload,
                error: null
            }
        default:
            return state
    }
}   