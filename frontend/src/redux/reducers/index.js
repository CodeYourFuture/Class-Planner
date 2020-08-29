import { combineReducers } from "redux";
import PageReducer from "./PageReducer"
import ClassReducer from "./ClassReducer";
import BookingReducer from "./BookingReducer";
import CourseReducer from "./CourseReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  PageReducer,
  ClassReducer,
  BookingReducer,
  CourseReducer,
  getErrors: errorReducer,
});
