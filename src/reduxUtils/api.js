import axios from 'axios';
import {cookieByName} from "../utils";

//const APIURL = "http://www.reactivers.com:4000";
const APIURL = "http://localhost:3001";

class Api {
    static sendData(data,apiEndPoint){
        return axios.post(APIURL + "/" +  apiEndPoint,data,{headers:{Authorization : cookieByName("aybu-sys-auth")}}).then((response) => {
            return {...response.data}
        }).catch((error) => {
            return {err : error}
        })
    }
    static putData(data,apiEndPoint){
        return axios.put(APIURL + "/" +  apiEndPoint,data,).then((response) => {
            return {...response.data}
        }).catch((error) => {
            return {err : error}
        })
    }
    static getData(apiEndPoint){
        return axios.get(APIURL + "/" +  apiEndPoint,{headers:{Authorization : cookieByName("aybu-sys-auth")}}).then((response) => {
            return {...response.data}
        }).catch((error) => {
            return {err : error}
        })
    }
    static getDataFromOutsider(url){
        return axios.get(url)
            .then(function (response) {
                return {res :response.data}
            })
            .catch(function (error) {
                return {err :error}
            });
    }

}
export default Api;
