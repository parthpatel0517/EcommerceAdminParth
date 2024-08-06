// import { combineReducers } from "redux";
import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { categoryReducer } from "./categoryfire.reducer";
import { subcategoryReducer } from "./subcategory.reducer";
import { productsReducer } from "./product.reducer";
import  brandslice  from "../Slice/brand.slice";
import colorSlice from "../Slice/color.slice";




export const rootReducer = combineReducers({
    count : counterReducer,
    category : categoryReducer,
    subcategory : subcategoryReducer,
    product : productsReducer,
    brands : brandslice,
    colors : colorSlice
})