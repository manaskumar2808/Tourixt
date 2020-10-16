import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    expiryDate: null,
    userId: null,
    error: null,
    isLoading: false,
    justRegistered: false,
    profileId: null,
};

const reducers = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_INIT:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                token: action.token,
                expiryDate: action.expiryDate,
                userId: action.userName,
                justRegistered: false,
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                isLoading: false,
                token: null,
                userId: null,
            }
        case actionTypes.SET_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: null,
                userId: null,
                justRegistered: true,
                profileId: action.profileId,
            }
        case actionTypes.SET_PROFILE_FAILED:
            return {
                ...state,
                isLoading: false,
                token: null,
                userId: null,
                justRegistered: false,
                error: action.error,
                profileId: null,
            }
        default: 
            return state;
    }
}


export default reducers;