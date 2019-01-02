import axios from 'axios';

//const APIURL = "http://www.reactivers.com:4000";
const APIURL = "http://localhost:4000";

class Api {
    static async sendData(data,apiEndPoint){
        return axios.post(APIURL + "/" +  apiEndPoint,data,).then((response) => {
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
        return axios.get(APIURL + "/" +  apiEndPoint,).then((response) => {
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
