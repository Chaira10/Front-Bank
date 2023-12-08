import { combineReducers } from "redux";
import dataReducer from "../features/dataReducer";

export default combineReducers({
    data: dataReducer,
})