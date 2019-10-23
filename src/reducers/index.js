import usersChanger from "./user-reducers";
import notesFilter from "./notes-filter";
import {combineReducers} from "redux";

export default combineReducers({
    usersChanger,
    notesFilter
});
