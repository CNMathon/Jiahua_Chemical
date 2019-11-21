const routes = {
  path: "/page_2",
  name: "page_2",
  component: () => import("../views/pages/page_2/Home.vue"),
  redirect: "/page_2/index",
  children: [
    {
      path: "/page_2/index",
      name: "page_2_index",
      component: () => import("../views/pages/page_2/Index/Index.vue"),
      meta: {
        name: "数据监控",
        keepAlive: true, //此组件需要被缓存
        showTabBar: true, //是否显示tabBar
        tabBar: 1
      }
    },
    {
      path: "/page_2/templatepage",
      name: "templatepage",
      component: () => import("../views/pages/page_2/TemplatePage/Index.vue"),
      meta: {
        name: "数据监控-模板界面"
      }
    },
    {
      path: "/page_2/weihua",
      name: "weihua",
      component: () => import("../views/pages/page_2/WeiHua/Index.vue"),
      meta: {
        name: "危化品库存"
      }
    },
    {
      path: "/page_2/weihuakucun",
      name: "weihuakucun",
      component: () => import("../views/pages/page_2/WeiHuaKuCun/Index.vue"),
      meta: {
        name: "危化品库存"
      }
    },
    {
      path:'/page_2/sjjk_dlzx',
      name:'dlzx',
      component:() => import('../views/pages/page_2/sjjk_dlzx/Index.vue')
    },
  ]
};

export default routes;
