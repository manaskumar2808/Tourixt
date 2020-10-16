import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentUser: {
        userName: null,
        email: null,
        profileImageUrl: null,
        profileImage: null,
        firstName: null,
        lastName: null,
        phoneNo: null,
    },
    users: [],
}

const reducers = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CURRENT_USER:
            return {
                ...state,
                currentUser: action.user,
            };
        case actionTypes.ALL_USERS: 
            return {
                ...state,
                users: action.users,
            };
        default: 
            return state;
    }
}

export default reducers;

