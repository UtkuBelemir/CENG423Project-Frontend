import {types} from './actions';

export function userReducer(state = {}, action) {
    switch (action.type) {
        case types.LOGIN_USER_SUCCESS:
            return {...state, ...action.data}
        case types.LOGOUT_USER_SUCCESS:
            return {}
        default :
            return state
    }
}

export function notificationReducers(state = [], action) {
    switch (action.type) {
        case types.PUSH_NOTIFICATION:
            return [...state, action.data]
        case types.CLEAR_NOTIFICATION:
            return [...state.filter((i1) => i1.id !== action.id)]
        default :
            return state
    }
}

export function dataReducers(state = {}, action) {
    switch (action.type) {
        case types.FETCH_DATA_SUCCESS:
        case types.FETCH_DATA_FAILED:
        case types.POST_DATA_SUCCESS:
        case types.POST_DATA_FAILED:
            return {...state, [action.name]: action.data}
        default :
            return state
    }
}