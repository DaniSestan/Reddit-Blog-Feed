import { usersRequestTypes } from "../constants";

const initialState = {
    loading: false,
    error: null,
    users: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case usersRequestTypes.FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case usersRequestTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                users: [
                    ...state.users,
                    action.payload
                ]
            };
        case usersRequestTypes.FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}