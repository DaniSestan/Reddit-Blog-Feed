import _ from 'lodash';

import jsonPlaceholder from "../api/jsonPlaceholder";
import {postsRequestTypes, usersRequestTypes} from "../constants";

export const fetchPostsAndUsers = subreddit => async (dispatch, getState) => {
    dispatch(fetchPosts(subreddit)).then(()=>{
        _.chain(getState().posts.posts)
            .map('data.author')
            .uniq()
            .forEach(user => dispatch(fetchUser(user)))
            .value();
    });
};

export const fetchPosts = subreddit => dispatch => {
    dispatch(requestLoading(postsRequestTypes.FETCH_POSTS_REQUEST));
    return jsonPlaceholder
        .get(`/r/${subreddit}.json`)
        .then (res => {
            dispatch(requestSuccess(postsRequestTypes.FETCH_POSTS_SUCCESS, res.data.data.children));
        })
        // .then (() => {
        //     _.chain(getState().posts.posts)
        //         .map('data.author')
        //         .uniq()
        //         .forEach(user => dispatch(fetchUser(user)))
        //         .value();
        // })
        .catch(err => {
            dispatch(requestFailure(postsRequestTypes.FETCH_POSTS_FAILURE, err.message));
        })
};

export const fetchUser = id => dispatch => {
    dispatch(requestLoading(usersRequestTypes.FETCH_USERS_REQUEST));
    return jsonPlaceholder
        .get(`/user/${id}/about.json`)
        .then(res => {
            dispatch(requestSuccess(usersRequestTypes.FETCH_USERS_SUCCESS, res.data.data))
        })
        .catch(err => {
            dispatch(requestFailure(usersRequestTypes.FETCH_USERS_FAILURE, err.message))
        })
};

const requestLoading = type => ({
    type: type,
    payload: null
});

const requestSuccess = (type, response) => ({
    type: type,
    payload: response
});

const requestFailure = (type, error) => ({
    type: type,
    payload: {error}
});
