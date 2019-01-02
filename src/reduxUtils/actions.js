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

export function showNotification(infoText, notificationType, id) {
    return {
        type: types.PUSH_NOTIFICATION,
        data: {
            infoText,
            notificationType,
            id
        }
    }
}

export function clearNotification(notificationId) {
    return {
        type: types.CLEAR_NOTIFICATION,
        id: notificationId
    }
}
