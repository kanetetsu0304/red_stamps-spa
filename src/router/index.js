import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../components/Dashboard.vue'
import RedStampList from '../components/RedStampList.vue'
import RedStampDetail from '../components/RedStampDetail.vue'
import RedStampCreate from '../components/RedStampCreate.vue'
import RedStampEdit from '../components/RedStampEdit.vue'
import Users from '../components/Users.vue'
import UsersRedStampList from '../components/UsersRedStampList.vue'
import UsersRedStampDetail from '../components/UsersRedStampDetail.vue'
// import Followings from '../components/Followings.vue'
// import Followers from '../components/Followers.vue'
import UsersFollowings from '../components/UsersFollowings.vue'
import UsersFollowers from '../components/UsersFollowers.vue'
import RedStampBook from '../components/RedStampBook.vue'
import RedStampBookEdit from '../components/RedStampBookEdit.vue'
import RedStampBookCreate from '../components/RedStampBookCreate.vue'
import UsersRedStampBook from '../components/UsersRedStampBook.vue'





Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guestOnly: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { authOnly: true }
  },
  {
    path: '/redstamp',
    name: 'RedStampList',
    component: RedStampList,
    meta: { authOnly: true }
  },
  {
    path: '/redstamp/:id',
    name: 'RedStampDetail',
    component: RedStampDetail,
    meta: { authOnly: true }
  },
  {
    path: '/create',
    name: 'RedStampCreate',
    component: RedStampCreate,
    meta: { authOnly: true }
  },
  {
    path: '/edit/:id',
    name: 'RedStampEdit',
    component: RedStampEdit,
    meta: { authOnly: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { authOnly: true }
  },
  {
    path: '/users/:id',
    name: 'UsersRedStampList',
    component: UsersRedStampList,
    meta: { authOnly: true }
  },
  {
    path: '/users/:userId/:id',
    name: 'UsersRedStampDetail',
    component: UsersRedStampDetail,
    meta: { authOnly: true }
  },
  // {
  //   path: '/followings',
  //   name: 'Followings',
  //   component: Followings,
  //   meta: { authOnly: true }
  // },
  // {
  //   path: '/followers',
  //   name: 'Followers',
  //   component: Followers,
  //   meta: { authOnly: true }
  // },
  {
    path: '/usersfollowings/:id',
    name: 'UsersFollowings',
    component: UsersFollowings,
    meta: { authOnly: true }
  },
  {
    path: '/usersfollowers/:id',
    name: 'UsersFollowers',
    component: UsersFollowers,
    meta: { authOnly: true }
  },
  {
    path: '/profile',
    name: 'RedStampBook',
    component: RedStampBook,
    meta: { authOnly: true }
  },
  {
    path: '/profile/edit',
    name: 'RedStampBookEdit',
    component: RedStampBookEdit,
    meta: { authOnly: true }
  },
  {
    path: '/profile/create',
    name: 'RedStampBookCreate',
    component: RedStampBookCreate,
    meta: { authOnly: true }
  },
  {
    path: '/usersprofile/:id',
    name: 'UsersRedStampBook',
    component: UsersRedStampBook,
    meta: { authOnly: true }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function isLoggedIn() {
  return localStorage.getItem("auth");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/redstamp",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router
