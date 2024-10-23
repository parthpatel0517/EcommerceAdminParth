import { createContext, useReducer } from "react"
import { CounterReducer } from "./reducer/counter.reducer"
import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "./ActionTypes"


const initialstate = {
    count: 0
}


export const CounterContext = createContext();


export const CounterProvider = ({children}) => {
    const [state, dispatch] = useReducer(CounterReducer, initialstate)

    const increment = (data) => {
        dispatch({ type: INCREMENT_COUNTER, payload: data + 1 })
    }
    const decrement = (data) => {
        dispatch({ type: DECREMENT_COUNTER, payload: data - 1 })
    }


    return (
          <CounterContext.Provider
            value={{
                ...state,
                increment,
                decrement
            }}
          >
            {children}
          </CounterContext.Provider>
   
   )
}