import * as actionTypes from '../actions/actionTypes';

const initialState = {
    likes: [],
    error: null,
}

const reducers = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_FEED_LIKES:
            return {
                ...state,
                error: null,
            }
        case actionTypes.FETCH_LIKES_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducers;