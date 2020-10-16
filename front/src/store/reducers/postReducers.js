import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: [],
    post: {
        id: null,
        title: null,
        content: null,
        creator: {
            userName: null,
            email: null,
            profileImageUrl: null,
            firstName: null,
            lastName: null,
            user: null,
        },
        image: null,
        imageUrl: null,
        videoUrl: null,
    },
    userPosts: [],
    isLoading: false,
}

const reducers = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.INIT_POSTS: 
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.SET_ALL_POSTS: 
            return {
                ...state,
                posts: action.posts,
                isLoading: false,
            }
        case actionTypes.SET_POST:
            return {
                ...state,
                post: action.post,
            }
        case actionTypes.SET_USER_POSTS:
            return {
                ...state,
                userPosts: action.userPosts,
            }
        default: 
            return state;
    }
}


export default reducers;