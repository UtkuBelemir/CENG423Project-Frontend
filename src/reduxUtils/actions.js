import {cookieByName} from "../utils";
import Api from './api';

export const types = {
    POST_DATA_FAILED: 'POST_DATA_FAILED',
    POST_DATA_SUCCESS: 'POST_DATA_SUCCESS',
    UPSERT_DATA_FAILED: 'UPSERT_DATA_FAILED',
    UPSERT_DATA_SUCCESS: 'UPSERT_DATA_SUCCESS',
    PUSH_NOTIFICATION: 'PUSH_NOTIFICATION',
    CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
    LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
    LOGIN_USER_FAILED: 'LOGIN_USER_FAILED',
    DATA_LOADING: 'DATA_LOADING',
    FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
    FETCH_DATA_FAILED: 'FETCH_DATA_FAILED',
    COOKIE_IS_VALID: 'COOKIE_IS_VALID',
    COOKIE_IS_NOT_VALID: 'COOKIE_IS_NOT_VALID',
    GET_DATA_FAILED: 'GET_DATA_FAILED',
    GET_DATA_SUCCESS: 'GET_DATA_SUCCESS',
};
export function postForm(options) {
    return function (dispatch, getState) {
        let currentState = getState();
        let formValues = currentState.form[options.formName].values;
        Api.sendData(formValues, options.endPoint).then((newData) => {
            if (newData.success) {
                dispatch({
                    name: options.formName,
                    type: types.POST_DATA_SUCCESS,
                    data: {...newData}
                })
                if (options.onSuccess) {
                    options.onSuccess(newData)
                }
                if(options.notifications && options.notifications.success){
                    dispatch(showNotification(options.notifications.success.text || newData.message,"success"))
                }
            } else {
                dispatch({
                    name: options.formName,
                    type: types.POST_DATA_FAILED,
                    data: {...newData}
                })
                if (options.onError) {
                    options.onError(newData)
                }
                if(options.notifications && options.notifications.error){
                    dispatch(showNotification(options.notifications.error.text || newData.message,"error"))
                }
            }
        }).catch((err) => {
            dispatch({
                name: options.formName,
                type: types.POST_DATA_FAILED,
                data: err.toString()
            })
            if (options.onError) {
                options.onError(err)
            }
            if(options.notifications && options.notifications.error){
                dispatch(showNotification(options.notifications.error.text || err.toString(),"error"))
            }
        })
        if(options.notifications && options.notifications.info){
            dispatch(showNotification(options.notifications.info.text,"info"))
        }
    }
}

export function getData(options) {
    return function (dispatch, getState) {
        let currentState = getState();
        let getMethod = Api.getData
        if (options.source && options.source == "outside") {
            getMethod = Api.getDataFromOutsider
        }
        getMethod(options.endPoint).then((newData) => {
            if (newData.success) {
                dispatch({
                    name: options.name,
                    type: types.FETCH_DATA_SUCCESS,
                    data: {...newData}
                })
                if (options.onSuccess) {
                    options.onSuccess(newData)
                }
                if(options.notifications && options.notifications.success){
                    dispatch(showNotification(options.notifications.success.text || newData.message,"success"))
                }
            } else {
                dispatch({
                    name: options.name,
                    type: types.FETCH_DATA_FAILED,
                    data: {...newData}
                })
                if (options.onError) {
                    options.onError(newData)
                }
                if(options.notifications && options.notifications.error){
                    dispatch(showNotification(options.notifications.error.text || newData.message,"error"))
                }
            }
        }).catch((err) => {
            dispatch({
                name: options.name,
                type: types.FETCH_DATA_FAILED,
                data: err.toString()
            })
            if (options.onError) {
                options.onError(err)
            }
            if(options.notifications && options.notifications.error){
                dispatch(showNotification(options.notifications.error.text || err.toString(),"error"))
            }
        })
        if(options.notifications && options.notifications.info){
            dispatch(showNotification(options.notifications.info.text,"error"))
        }
    }
}

export function setUser(userData) {
    return function (dispatch, getState) {
        dispatch({
            type: types.LOGIN_USER_SUCCESS,
            data: userData
        })
    }
}

export function cookieLogin() {
    return function (dispatch, state) {
        let token = cookieByName("bikriptAuth")
        if (token != null) {
            Api.sendData(token, "isloggedin").then((newData) => {
                if (newData.err == null) {
                    dispatch({
                        type: types.COOKIE_IS_VALID,
                        data: newData
                    })
                } else {
                    dispatch({
                        type: types.COOKIE_IS_NOT_VALID,
                        data: {err: "cookie_is_not_valid"}
                    })
                }
            }).catch(err => {
                dispatch({
                    type: types.COOKIE_IS_NOT_VALID,
                    data: {err: "cookie_is_not_valid"}
                })
            })
        } else {
            dispatch({
                type: types.COOKIE_IS_NOT_VALID,
                data: {err: "cookie_is_not_valid"}
            })
        }
    }
}

// dispatch(showNotification('Kullanıcı Adı veya Şifre Hatalı', "error"));

export function setLoading(status = true) {
    return {
        type: types.DATA_LOADING,
        status
    }
}

export function showNotification(infoText, notificationType, id = parseInt(Math.random()*10000)) {
    if (!infoText) return;
    return function (dispatch,getState) {
        dispatch({
            type: types.PUSH_NOTIFICATION,
            data: {
                infoText,
                notificationType,
                id
            }
        })
    }
}

export function clearNotification(notificationId) {
    return function (dispatch,getState) {
        dispatch({
            type: types.CLEAR_NOTIFICATION,
            id: notificationId
        })
    }
}
