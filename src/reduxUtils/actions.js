import Api from './api';
import {removeCookie} from "../utils";

export const types = {
    LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
    PUSH_NOTIFICATION: 'PUSH_NOTIFICATION',
    CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
    FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
    FETCH_DATA_FAILED: 'FETCH_DATA_FAILED',
    POST_DATA_SUCCESS: 'POST_DATA_SUCCESS',
    POST_DATA_FAILED: 'POST_DATA_FAILED',
    LOGOUT_USER_SUCCESS : 'LOGOUT_USER_SUCCESS'
};

export function postForm(options) {
    return function (dispatch, getState) {
        let currentState = getState();
        let formValues = currentState.form[options.formName].values;
        Api.sendData(formValues, options.endPoint, options.isFormData || false).then((newData) => {
            if (newData.success) {
                dispatch({
                    name: options.formName,
                    type: types.POST_DATA_SUCCESS,
                    data: {...newData}
                })
                if (options.onSuccess) {
                    options.onSuccess(newData)
                }
                if (options.notifications && options.notifications.success) {
                    dispatch(showNotification(options.notifications.success.text || newData.message, "success"))
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
                if (options.notifications && options.notifications.error) {
                    dispatch(showNotification(options.notifications.error.text || newData.message, "error"))
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
            if (options.notifications && options.notifications.error) {
                dispatch(showNotification(options.notifications.error.text || err.toString(), "error"))
            }
        })
        if (options.notifications && options.notifications.info) {
            dispatch(showNotification(options.notifications.info.text, "info"))
        }
    }
}

export function putForm(options) {
    return function (dispatch, getState) {
        let currentState = getState()
        let formValues
        if (!options.customValues) {
            formValues = currentState.form[options.formName].values
        } else {
            formValues = options.customValues
        }
        Api.putData(formValues, options.endPoint, options.isFormData || false).then((newData) => {
            if (newData.success) {
                dispatch({
                    name: options.formName,
                    type: types.POST_DATA_SUCCESS,
                    data: {...newData}
                })
                if (options.onSuccess) {
                    options.onSuccess(newData)
                }
                if (options.notifications && options.notifications.success) {
                    dispatch(showNotification(options.notifications.success.text || newData.message, "success"))
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
                if (options.notifications && options.notifications.error) {
                    dispatch(showNotification(options.notifications.error.text || newData.message, "error"))
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
            if (options.notifications && options.notifications.error) {
                dispatch(showNotification(options.notifications.error.text || err.toString(), "error"))
            }
        })
        if (options.notifications && options.notifications.info) {
            dispatch(showNotification(options.notifications.info.text, "info"))
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
                if (options.notifications && options.notifications.success) {
                    dispatch(showNotification(options.notifications.success.text || newData.message, "success"))
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
                if (options.notifications && options.notifications.error) {
                    dispatch(showNotification(options.notifications.error.text || newData.message, "error"))
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
            if (options.notifications && options.notifications.error) {
                dispatch(showNotification(options.notifications.error.text || err.toString(), "error"))
            }
        })
        if (options.notifications && options.notifications.info) {
            dispatch(showNotification(options.notifications.info.text, "error"))
        }
    }
}

export function deleteData(options) {
    return function (dispatch, getState) {
        Api.deleteData(options.endPoint).then((newData) => {
            if (newData.success) {
                if (options.onSuccess) {
                    options.onSuccess(newData)
                }
                if (options.notifications && options.notifications.success) {
                    dispatch(showNotification(options.notifications.success.text || newData.message, "success"))
                }
            } else {
                if (options.onError) {
                    options.onError(newData)
                }
                if (options.notifications && options.notifications.error) {
                    dispatch(showNotification(options.notifications.error.text || newData.message, "error"))
                }
            }
        }).catch((err) => {
            if (options.onError) {
                options.onError(err)
            }
            if (options.notifications && options.notifications.error) {
                dispatch(showNotification(options.notifications.error.text || err.toString(), "error"))
            }
        })
        if (options.notifications && options.notifications.info) {
            dispatch(showNotification(options.notifications.info.text, "error"))
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

export function logOut() {
    return function (dispatch, getState) {
        removeCookie("aybu-sys-auth")
        dispatch({
            type: types.LOGOUT_USER_SUCCESS,
        })
    }
}

export function showNotification(infoText, notificationType, id = parseInt(Math.random() * 10000)) {

    if (!infoText) return function (dispatch, getState) {
    };
    return function (dispatch, getState) {
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
    return function (dispatch, getState) {
        dispatch({
            type: types.CLEAR_NOTIFICATION,
            id: notificationId
        })
    }
}
