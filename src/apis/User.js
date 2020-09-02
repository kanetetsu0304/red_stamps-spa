import Api from "./Api";
import Csrf from "./Csrf";

export default {
    async register(form) {
        await Csrf.getCookie();
        return Api.post("/register", form);
    },

    async login(form) {
        await Csrf.getCookie();
        return Api.post("/login", form);
    },

    async logout() {
        await Csrf.getCookie();
        return Api.post("/logout");
    },

    async auth() {
        return Api.get("/user");
    },

    async users() {
        return Api.get("/users");
    },

    async usersDetail(id) {
        return Api.get(`/users/${id}`);
    },

    // async usersRedStamp(id) {
    //     return Api.get(`/redstamps/${id}`);
    // },
};