import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../ActionTypes";



export const CounterReducer = (state , action) => {
    console.log(action);

    switch (action.type) {
        case INCREMENT_COUNTER :
            return{
                count : action.payload
            }
        case DECREMENT_COUNTER :
            return{
                count : action.payload
            }


        default : return state

    }
}