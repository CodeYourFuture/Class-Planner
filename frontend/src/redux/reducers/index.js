import { combineReducers } from "redux";
import ClassReducer from "./ClassReducer";
import BookingReducer from "./BookingReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  ClassReducer,
  BookingReducer,
  getErrors: errorReducer,
});
