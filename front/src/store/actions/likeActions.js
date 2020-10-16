import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-like';

export const fetchLikesCount = (feedId) => {
    return dispatch => {
        axios.get(`${feedId}/likes/count/`)
        .then(response => {
            dispatch(setLikesCount(response.data));
        })
        .catch(error => {
            dispatch(fetchLikesError(error));
        })
    }
}

export const setLikesCount = (count) => {
    return {
        type: actionTypes.SET_FEED_LIKES,
        count: count,
    }
}

export const fetchLikesError = (error) => {
    return {
        type: actionTypes.FETCH_LIKES_FAIL,
        error: actionTypes.error,
    }
}