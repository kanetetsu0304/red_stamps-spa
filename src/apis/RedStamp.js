import Api from "./Api";
import Csrf from "./Csrf";


export default {

    async redStamp() {
        return Api.get("/redstamps");
    },
    async redStampAsc() {
        return Api.get("/redstampsAsc");
    },

    async redStampDetail(id) {
        return Api.get(`/redstamps/${id}`);
    },

    // async postImage(posts) {
    //     await Csrf.getCookie();
    //     return Api.post("/redstamps",posts);
    // },

    async redStampPost(formData, config) {
        await Csrf.getCookie();
        return Api.post(
            '/redstamps',
            formData,
            config,
        );
    },

    async redStampPut(id,formData, config) {
        await Csrf.getCookie();
        return Api.post(
            `/redstamps/${id}`,
            formData,
            config,
        );
    },

    // async redStampEdit(id,puts) {
    //     return Api.put(`/redstamps/${id}`,puts);
    // },

    async redStampDelete(id) {
        return Api.delete(`/redstamps/${id}`);
    },

    async usersRedStamp(userId) {
        return Api.get(`/usersRedstamps/${userId}`);
    },

    async usersRedStampAsc(userId) {
        return Api.get(`/usersRedstampsAsc/${userId}`);
    },

    async usersRedStampDetail(userId,id) {
        return Api.get(`/usersRedstamps/${userId}/${id}`);
    },


    
};