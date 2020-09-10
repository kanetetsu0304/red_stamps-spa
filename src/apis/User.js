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

    async usersAsc() {
        return Api.get("/usersAsc");
    },

    async usersDetail(id) {
        return Api.get(`/users/${id}`);
    },

    // async usersRedStamp(id) {
    //     return Api.get(`/redstamps/${id}`);
    // },

    async userFollowings(id) {
        return Api.get(`/users/followings/${id}/`);
    },

    async userFollowers(id) {
        return Api.get(`/users/followers/${id}/`);
    },

    async userFollow(response) {
        return Api.post(`/users/follow`,response);
    },

    async userUnfollow(userId,followUserId) {
        return Api.delete(`/users/unfollow/${userId}/${followUserId}/`);
    },

    async userFollowed(userId,followUserId) {
        return Api.get(`/users/followed/${userId}/${followUserId}/`);
    },
};