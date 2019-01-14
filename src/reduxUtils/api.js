import axios from 'axios';
import {cookieByName} from "../utils";

const APIURL = "http://localhost:3001";

class Api {
    static sendData(data, apiEndPoint, isFormData) {
        if (isFormData) {
            const formData = new FormData();
            if (data && Object.keys(data).length > 0) {
                Object.keys(data).map((kk, ind) => {
                    formData.append(kk, data[kk])
                })
            }
            return axios.post(APIURL + "/" + apiEndPoint, formData, {
                headers: {
                    "Authorization": cookieByName("aybu-sys-auth"),
                    "Content-Type": "multipart/form-data"
                }
            }).then((response) => {
                return {...response.data}
            }).catch((error) => {
                return {err: error}
            })
        }
        return axios.post(APIURL + "/" + apiEndPoint, data, {headers: {Authorization: cookieByName("aybu-sys-auth")}}).then((response) => {
            return {...response.data}
        }).catch((error) => {
            return {err: error}
        })
    }

    static putData(data, apiEndPoint, isFormData) {
        if (isFormData) {
            const formData = new FormData();
            if (data && Object.keys(data).length > 0) {
                Object.keys(data).map((kk, ind) => {
                    formData.append(kk, data[kk])
                })
            }
            return axios.put(APIURL + "/" + apiEndPoint, formData, {
                headers: {
                    "Authorization": cookieByName("aybu-sys-auth"),
                    "Content-Type": "multipart/form-data"
                }
            }).then((response) => {
                return {...response.data}
            }).catch((error) => {
                return {err: error}
            })
        }
        return axios.put(APIURL + "/" + apiEndPoint, data, {headers: {Authorization: cookieByName("aybu-sys-auth")}}).then((response) => {
            return {...response.data}
        }).catch((error) => {
            return {err: error}
        })
    }

    static getData(apiEndPoint) {
        return axios.get(APIURL + "/" + apiEndPoint, {headers: {Authorization: cookieByName("aybu-sys-auth")}}).then((response) => {
            return {...response.data}
        }).catch((error) => {
            return {err: error}
        })
    }

    static deleteData(apiEndPoint) {
        return axios.delete(APIURL + "/" + apiEndPoint, {headers: {Authorization: cookieByName("aybu-sys-auth")}}).then((response) => {
            return {...response.data}
        }).catch((error) => {
            return {err: error}
        })
    }

    static getDataFromOutsider(url) {
        return axios.get(url)
            .then(function (response) {
                return {res: response.data}
            })
            .catch(function (error) {
                return {err: error}
            });
    }

}

export default Api;
