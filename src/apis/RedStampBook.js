import Api from "./Api";
import Csrf from "./Csrf";


export default {

    // async redStamp() {
    //     return Api.get("/redstamps");
    // },
    async redStampBook() {
        return Api.get(`/redstampBook`);
    },

    async usersRedStampBook(id) {
        return Api.get(`/usersRedstampBook/${id}`);
    },
    async redStampBookPost(formData, config) {
        await Csrf.getCookie();
        return Api.post(
            `/redstampBook`,
            formData,
            config,
        );
    },

    async redStampBookPut(id,formData, config) {
        await Csrf.getCookie();
        return Api.post(
            `/redstampBook/${id}`,
            formData,
            config,
        );
    },

    // async redStampEdit(id,puts) {
    //     return Api.put(`/redstamps/${id}`,puts);
    // },

    // async redStampDelete(id) {
    //     return Api.delete(`/redstamps/${id}`);
    // },

    // async usersRedStamp(userId) {
    //     return Api.get(`/usersRedstamps/${userId}`);
    // },

    // async usersRedStampAsc(userId) {
    //     return Api.get(`/usersRedstampsAsc/${userId}`);
    // },

    // async usersRedStampDetail(userId,id) {
    //     return Api.get(`/usersRedstamps/${userId}/${id}`);
    // },


    
};