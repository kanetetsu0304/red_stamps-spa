import axios from "axios";

let Api = axios.create({
    baseURL: "https://redstampapi.naoya-sawaguchi.jp/api"
});

Api.defaults.withCredentials = true;

export default Api;