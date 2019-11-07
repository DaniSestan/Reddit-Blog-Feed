import { postsRequestTypes } from "../constants";

const initialState = {
  loading: false,
  error: null,
  posts: []  
};

export default (state = initialState, action) => {
    switch (action.type) {
        case postsRequestTypes.FETCH_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case postsRequestTypes.FETCH_POSTS_SUCCESS: 
            return {
                ...state,
                loading: false,
                error: null,
                posts: action.payload
            };
        case postsRequestTypes.FETCH_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default: return state;
    }
}