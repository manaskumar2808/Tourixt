import * as actionTypes from './actionTypes';
import axios from '../../axios-auth';

export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT,
    }
}

export const authAutoLogin = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    return dispatch => {
        if(token == null || token === 'undefined'){
            dispatch(authLogout());
        } else {
            dispatch(authSuccess(token,userId,userName));
        }
    }
}

export const authLogin = (userName,password) => {
    return dispatch => {
        const authData = {
            username: userName,
            password: password,
        };
        axios.post('auth-login/',authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(
                response.data.token,
                response.data.id,
                response.data.username,
            ));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        });
    }
}

export const authSignup = (userName,email,password,passwordConfirm) => {
    return dispatch => {
        const authData = {
            username: userName,
            email: email,
            password: password,
        };
        axios.post('auth-register/',authData)
        .then(response => {
            const userId = response.data.id
           dispatch(createProfile(userId,userName,email));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        });
    }
}


export const createProfile = (userId,userName,email) => {
    return dispatch => {
        const profileData = {
            userName: userName,
            email: email,
            firstName: null,
            lastName: null,
            profileImageUrl: null,
            phoneNo: null,
            user: userId,
        }
        axios.post('profile/create/',profileData).
        then(response => {
            console.log(response.data);
            dispatch(setProfileSuccess(response.data.id));
        }).
        catch(error => {
            console.log(error);
            dispatch(setProfileFailed(error));
        });
    }
}


export const setProfileSuccess = (profileId) => {
    localStorage.setItem('profileId',profileId);
    return {
        type: actionTypes.SET_PROFILE_SUCCESS,
        profileId: profileId,
    }
}

export const setProfileFailed = (error) => {
    return {
        type: actionTypes.SET_PROFILE_FAILED,
        error: error,
    }
}


export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('profileId');
    return {
        type: actionTypes.AUTH_LOGOUT,
        token: null,
    }
}

export const authSuccess = (token,userId,userName) => {
    localStorage.setItem('token',token);
    localStorage.setItem('userId',userId);
    localStorage.setItem('userName',userName);
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        expiryDate: null,
        userId: userId,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}  


