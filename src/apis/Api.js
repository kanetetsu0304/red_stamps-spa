import axios from "axios";

let Api = axios.create({
    baseURL: "http://ec2-52-195-2-179.ap-northeast-1.compute.amazonaws.com:8000/api"
});

Api.defaults.withCredentials = true;

export default Api;