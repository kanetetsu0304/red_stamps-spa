import Api from "./Api";

export default {

    async sanctuary() {
        return Api.get("/sanctuaries");
    },

    // async redStampDetail(id) {
    //     return Api.get(`/redstamps/${id}`);
    // }
};