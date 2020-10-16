import * as actionTypes from '../actions/actionTypes';

const initialState = {
    followers: [],
    followeds: [],
    error: null,
}

const reducers = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.SET_FOLLOWERS:
            return {
                ...state,
                followers: action.followers,
            }
        case actionTypes.SET_FOLLOWEDS:
            return {
                ...state,
                followeds: action.followeds,
            }
        case actionTypes.FOLLOW_FETCH_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducers;