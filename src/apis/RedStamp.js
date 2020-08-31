import Api from "./Api";
import Csrf from "./Csrf";


export default {

    async redStamp() {
        return Api.get("/redstamps");
    },

    async redStampDetail(id) {
        return Api.get(`/redstamps/${id}`);
    },

    async postImage() {
        await Csrf.getCookie();
        return Api.post(`/redstamps`);
    }
};