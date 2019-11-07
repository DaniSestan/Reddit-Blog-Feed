import { combineReducers } from "redux";
import postsReducer from './postListReducers'
import userReducers from "./userReducers";

export default combineReducers({
    posts: postsReducer,
    users: userReducers
})