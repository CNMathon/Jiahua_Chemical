import Vue from "vue";
import VueRouter from "vue-router";
import Page_1 from "./page_1.js";
import Page_2 from "./page_2.js";
import Page_3 from "./page_3.js";
import page_4 from "./page_4.js";
import page_5 from "./page_5.js";
import page_component from "./component.js"; // 公共组件库

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    redirect: "/page_1",
    children: [Page_1, Page_2, Page_3, page_4, page_5, page_component]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/pages/login/Index.vue")
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
router.beforeEach((to, _from, next) => {
	
  if (to.name === "login") {
    next();
    return;
  } else {
    let sessionId = localStorage.getItem("JiaHuaSessionId");
    if (sessionId === "" || sessionId === null || sessionId === undefined) {
      next("/login");
      return;
    } else {
      Vue.prototype.$userInfo = {
        sessionId: localStorage.getItem("JiaHuaSessionId"),
        userName: localStorage.getItem("JiaHuaUserName"),
        userCode: localStorage.getItem("JiaHuaUserCode"),
        refCode: localStorage.getItem("JiaHuaRefCode"),
        officeCode: localStorage.getItem("JiaHuaOfficeCode"),
        officeName: localStorage.getItem("JiaHuaOfficeName")
      };
      next();
    }
  }
});

export default router;
