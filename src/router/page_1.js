const routes = {
  path: "/page_1",
  name: "page_1",
  component: () => import("../views/pages/page_1/Home.vue"),
  meta: {
    keepAlive: true //此组件需要被缓存
  },
  redirect: "/page_1/index",
  children: [
    {
      path: "/page_1/index",
      name: "index",
      component: () => import("../views/pages/page_1/Index/Index.vue"),
      meta: {
        name: "首页",
        keepAlive: true, //此组件需要被缓存
        showTabBar: true, //是否显示tabBar
        tabBar: 0
      }
    },
    {
      path: "/page_1/tagsThistory",
      name: "tagsThistory",
      component: () => import("../components/TagHistory/index.vue"),
    },
    {
      path: "/page_1/danger",
      component: () => import("../views/pages/page_1/danger/Home.vue"),
      // redirect: "/page_1/index",
      name: "danger",
      children: [
        {
          path: "/page_1/danger/sj",
          name: "dangerSj",
          component: () => import("@/views/pages/page_1/danger/sj/Index.vue"),
        },
        {
          path: "/page_1/danger/xcl",
          name: "dangerXcl",
          component: () => import("@/views/pages/page_1/danger/xcl/Index.vue"),
        },
        {
          path: "/page_1/danger/ls",
          name: "dangerLs",
          component: () => import("@/views/pages/page_1/danger/ls/Index.vue"),
        },
      ]
    },
    {
      path: "/page_1/dongli",
      name: "dongli",
      component: () => import("../views/pages/page_1/DongLi/Index.vue"),
      meta: {
        name: "首页-动力中心"
      }
    },
    {
      path: "/page_1/shaojian",
      name: "shaojian",
      component: () => import("../views/pages/page_1/ShaoJian/Index.vue"),
      meta: {
        name: "首页-烧碱"
      }
    },
    {
      path: "/page_1/gongyi",
      name: "gongyi",
      component: () => import("../views/pages/page_1/GongYi/Index.vue"),
      meta: {
        name: "首页-工艺卡片"
      }
    },
    {
      path: "/page_1/xincailiao_1",
      name: "xincailiao",
      component: () => import("../views/pages/page_1/XinCaiLiao/Index1.vue"),
      meta: {
        name: "首页-新材料"
      }
    },
    {
      path: "/page_1/xincailiao_2",
      name: "xincailiao",
      component: () => import("../views/pages/page_1/XinCaiLiao/Index2.vue"),
      meta: {
        name: "首页-新材料"
      }
    },
    {
      path: "/page_1/liusuan_1",
      name: "liusuan",
      component: () => import("../views/pages/page_1/LiuSuan/Index1.vue"),
      meta: {
        name: "首页-硫酸"
      }
    },
    {
      path: "/page_1/liusuan_2",
      name: "liusuan",
      component: () => import("../views/pages/page_1/LiuSuan/Index2.vue"),
      meta: {
        name: "首页-硫酸"
      }
    },
    {
      path: "/page_1/zhifangchun",
      name: "zhifangchun",
      component: () => import("../views/pages/page_1/ZhiFangChun/Index.vue"),
      meta: {
        name: "首页-脂肪醇"
      }
    },
    {
      path: "/page_1/error",
      name: "error",
      component: () => import("../views/pages/page_1/Error/Index.vue"),
      meta: {
        name: "首页-异常报警"
      }
    },
    {
      path: "/page_1/shebei",
      name: "shebei",
      component: () => import("../views/pages/page_1/SheBei/Index.vue"),
      meta: {
        name: "首页-设备分类"
      }
    },
    {
      path: "/page_1/guanjianzhuangtai",
      name: "guanjianzhuangtai",
      component: () => import("../views/pages/page_1/GuanJianZhuangTai/Index.vue"),
      meta: {
        name: "首页-关键状态"
      }
    },
    {
      path:'/page_1/keranyoudu',
      name:'KeRanYouDu',
      component:() => import('../views/pages/page_1/KeRanYouDu/Index.vue')
    }
  ]
};

export default routes;
