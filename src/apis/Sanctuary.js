import Api from "./Api";

export default {

    async sanctuaryAsc() {
        return Api.get("/sanctuariesAsc");
    },

    async sanctuaryDesc() {
        return Api.get("/sanctuariesDesc");
    },

    async sanctuaryTokyo() {
        return Api.get("/sanctuariesTokyo");
    },

    async sanctuaryKyoto() {
        return Api.get("/sanctuariesKyoto");
    },

    async usersSanctuaryAsc(id) {
        return Api.get(`/usersSanctuariesAsc/${id}`);
    },

    // async redStampDetail(id) {
    //     return Api.get(`/redstamps/${id}`);
    // }
};