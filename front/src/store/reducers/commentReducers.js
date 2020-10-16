import * as actionTypes from '../actions/actionTypes';

const initialState = {
    comments: [],
    latestComments: [],
    fetchError: null,
    addError: null,
}

const reducers = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_FEED_COMMENTS:
            return {
                ...state,
                comments: action.comments,
            }
        case actionTypes.SET_FEED_LATEST_COMMENTS:
            return {
                ...state,
                latestComments: action.latestComments,
            }
        case actionTypes.COMMENT_FETCH_FAIL:
            return {
                ...state,
                fetchError: action.error,
            }
        case actionTypes.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addError: null,
            }
        case actionTypes.ADD_COMMENT_FAIL:
            return {
                ...state,
                addError: action.error,
            }
        
        default: 
            return state;
    }
}

export default reducers;