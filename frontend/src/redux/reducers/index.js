import { combineReducers } from "redux";
import ClassReducer from "./ClassReducer";
import BookingReducer from "./BookingReducer";

export default combineReducers({ ClassReducer, BookingReducer });
