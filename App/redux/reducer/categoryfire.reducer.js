import { DECREMENT_COUNTER, GETDATA, INCREMENT_COUNTER } from "../ActionType";


const initialState = {
    count: []
}

export const categoryReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case GETDATA:
            return {
                count: action.payload
            }
        default:
            return state
    }
}   