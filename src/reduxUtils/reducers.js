import {types} from './actions';

export function userReducer(state = {}, action) {
    switch (action.type) {
        case types.LOGIN_USER_SUCCESS:
            document.cookie = "bikriptAuth="+action.data.token
            console.log("ACTİON DATA",action.data)
            return {...state, ...action.data}
        case types.COOKIE_IS_VALID:
            console.log("ACTİON DATA",action.data)
            return {...state, ...action.data}
        case types.COOKIE_IS_NOT_VALID:
            console.log("ACTİON DATA",action.data)
            return {...state, ...action.data}
        default :
            return state
    }
}
export function notificationReducers(state = [], action) {
    switch (action.type) {
        case types.PUSH_NOTIFICATION:
            if(state.filter( (i1) => i1.id === action.id).length <= 0){
                return [...state,action.data]
            }
            return state
        case types.CLEAR_NOTIFICATION:
            return [...state.filter( (i1) => i1.id !== action.id)];
        default :
            return state
    }
}
export function dataReducers(state = {}, action) {
    switch (action.type) {
        case types.DATA_LOADING:
            return {...state,loading : action.status};
        case types.FETCH_DATA_SUCCESS:
            return {...state,[action.data_name] : action.data}
        case types.FETCH_DATA_FAILED:
            return {...state,[action.data_name] : null}
        case types.POST_DATA_SUCCESS:
            return {...state,[action.data_name] : action.data}
        default :
            return state
    }
}