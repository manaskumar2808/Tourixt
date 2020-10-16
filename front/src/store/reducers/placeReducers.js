import * as actionTypes from '../actions/actionTypes';

const initialState = {
    places: [],
    place: {
        id: null,
        name: null,
        location: null,
        imageUrl: null,
        cost: null,
        elevation: null,
        type: null,
        description: null,
        isUWHS: false,
        population: null,
    },
    error: null,
}

const reducers = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_PLACES:
            return {
                ...state,
                places: action.places,
                error: null,
            }
        case actionTypes.FETCH_PLACES_FAIL:
            return {
                ...state,
                error: action.error,
            }
        case actionTypes.SET_PLACE:
            return {
                ...state,
                place: action.place,
                error: null,
            }
        case actionTypes.FETCH_PLACE_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default: 
            return state;
    }
}


export default reducers;