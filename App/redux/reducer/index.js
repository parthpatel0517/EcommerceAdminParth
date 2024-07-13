// import { combineReducers } from "redux";
import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { categoryReducer } from "./categoryfire.reducer";
import { subcategoryReducer } from "./subcategory.reducer";
import { productsReducer } from "./product.reducer";


export const rootReducer = combineReducers({
    count : counterReducer,
    category : categoryReducer,
    subcategory : subcategoryReducer,
    product : productsReducer

})