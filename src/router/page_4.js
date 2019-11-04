const routes = {
  path: "/page_4",
  name: "page_4",
  component: () => import("../views/pages/page_4/Home.vue"),
  redirect: "/page_4/index",
  children: [
    {
      path: "/page_4/index",
      name: "page_4_index",
      component: () => import("../views/pages/page_4/Index/Index.vue"),
      meta: {
        name: "信息查询",
        keepAlive: true, //此组件需要被缓存
        showTabBar: true, //是否显示tabBar
        tabBar: 3
      }
    },
    {
      path: "/page_4/jian_che/chan_pin",
      name: "page_4_chan_pin",
      component: () => import("../views/pages/page_4/JianChe/ChanPin.vue"),
      meta: {
        name: "产品",
        keepAlive: false //此组件需要被缓存
      }
    },
    {
      path: "/page_4/jian_che/yuan_liao",
      name: "page_4_yuan_liao",
      component: () => import("../views/pages/page_4/JianChe/YuanLiao.vue"),
      meta: {
        name: "原料",
        keepAlive: false //此组件需要被缓存
      }
    },
    {
      path: "/page_4/cheng_bao_shang",
      name: "chengBaoShang",
      component: () => import("../views/pages/page_4/ChengBaoShang/Home.vue"),
      redirect: "/page_4/cheng_bao_shang/index",
      children: [
        {
          path: "/page_4/cheng_bao_shang/index",
          name: "chengBaoShangHome",
          component: () =>
            import("../views/pages/page_4/ChengBaoShang/Index.vue"),
          meta: {
            name: "承包商信息",
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_4/cheng_bao_shang/detail/:id",
          name: "chengBaoShangHomeDetail",
          component: () =>
            import("../views/pages/page_4/ChengBaoShang/Detail.vue"),
          meta: {
            name: "承包商详情",
            keepAlive: false //此组件需要被缓存
          },
          props: true
        }
      ]
    },
    {
      path: "/page_4/cheng_bao_shang_ren_yuan",
      name: "chengBaoShangRenYuan",
      component: () =>
        import("../views/pages/page_4/ChengBaoShangRenYuan/Home.vue"),
      redirect: "/page_4/cheng_bao_shang_ren_yuan/index",
      children: [
        {
          path: "/page_4/cheng_bao_shang_ren_yuan/index",
          name: "chengBaoShangRenYuanHome",
          component: () =>
            import("../views/pages/page_4/ChengBaoShangRenYuan/Index.vue"),
          meta: {
            name: "承包商人员信息",
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_4/cheng_bao_shang_ren_yuan/detail/:id",
          name: "chengBaoShangHomeRenYuanDetail",
          component: () =>
            import("../views/pages/page_4/ChengBaoShangRenYuan/Detail.vue"),
          meta: {
            name: "人员信息详细",
            keepAlive: false //此组件需要被缓存
          },
          props: true
        }
      ]
    },
    {
      path: "/page_4/she_bei_dang_an",
      name: "sheBeiDangAn",
      component: () => import("../views/pages/page_4/SheBeiDangAn/Home.vue"),
      redirect: "/page_4/she_bei_dang_an/index",
      children: [
        {
          path: "/page_4/she_bei_dang_an/index",
          name: "sheBeiDangAnHome",
          component: () =>
            import("../views/pages/page_4/SheBeiDangAn/Index.vue"),
          meta: {
            name: "设备档案",
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_4/she_bei_dang_an/detail/:id",
          name: "sheBeiDangAnDetailHome",
          component: () =>
            import("../views/pages/page_4/SheBeiDangAn/Detail/Home.vue"),
          meta: {
            name: "设备详情",
            keepAlive: false //此组件需要被缓存
          },
          redirect: "/page_4/she_bei_dang_an/detail/index/:id",
          children: [
            {
              path: "/page_4/she_bei_dang_an/detail/index/:id",
              name: "sheBeiDangAnDetail",
              component: () =>
                import("../views/pages/page_4/SheBeiDangAn/Detail/Index.vue"),
              meta: {
                name: "设备详情",
                keepAlive: true //此组件需要被缓存
              },
              props: true
            },
            {
              path: "/page_4/she_bei_dang_an/detail/qushitu/:id",
              name: "sheBeiDangAnQuShiTu",
              component: () =>
                import("../views/pages/page_4/SheBeiDangAn/Detail/QuShiTu.vue"),
              meta: {
                name: "设备详情-趋势图",
                keepAlive: false //此组件需要被缓存
              },
              props: true
            },
            {
              path: "/page_4/she_bei_dang_an/detail/baojing/:id",
              name: "sheBeiDangAnQuBaoJing",
              component: () =>
                import("../views/pages/page_4/SheBeiDangAn/Detail/BaoJing.vue"),
              meta: {
                name: "设备详情-设备报警",
                keepAlive: false //此组件需要被缓存
              },
              props: true
            }
          ]
        }
      ]
    },
    {
      path: "/page_4/wei_hu_bao_yang",
      name: "weiHuBaoYang",
      component: () => import("../views/pages/page_4/WeiHuBaoYang/Home.vue"),
      redirect: "/page_4/wei_hu_bao_yang/index",
      children: [
        {
          path: "/page_4/wei_hu_bao_yang/index",
          name: "weiHuBaoYangHome",
          component: () =>
            import("../views/pages/page_4/WeiHuBaoYang/Index.vue"),
          meta: {
            name: "维护保养",
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_4/wei_hu_bao_yang/shen_qing_bian_geng/:id",
          name: "weiHuBaoYangJiHuaBianGeng",
          component: () =>
            import(
              "../views/pages/page_4/WeiHuBaoYang/ShenQingXingBianGeng.vue"
            ),
          meta: {
            name: "维护保养-申请变更",
            keepAlive: false //此组件需要被缓存
          },
          props: true
        },
        {
          path: "/page_4/wei_hu_bao_yang/yu_fang/:id",
          name: "weiHuBaoYangYuFang",
          component: () =>
            import("../views/pages/page_4/WeiHuBaoYang/YuFang.vue"),
          meta: {
            name: "维护保养-预防",
            keepAlive: true //此组件需要被缓存
          },
          props: true
        },
        {
          path: "/page_4/wei_hu_bao_yang/yu_fang_zhi_xing/:id",
          name: "weiHuBaoYangYuFangZhiXing",
          component: () =>
            import("../views/pages/page_4/WeiHuBaoYang/YuFangZhiXing.vue"),
          meta: {
            name: "维护保养-预防-非工单处理",
            keepAlive: false //此组件需要被缓存
          },
          props: true
        },
        {
          path: "/page_4/wei_hu_bao_yang/bao_yang/:id",
          name: "weiHuBaoYangBaoYang",
          component: () =>
            import("../views/pages/page_4/WeiHuBaoYang/BaoYang.vue"),
          meta: {
            name: "维护保养-保养",
            keepAlive: true //此组件需要被缓存
          },
          props: true
        },
        {
          path: "/page_4/wei_hu_bao_yang/bao_yang_zhi_xing/:id",
          name: "weiHuBaoYangBaoYangZhiXing",
          component: () =>
            import("../views/pages/page_4/WeiHuBaoYang/BaoYangZhiXing.vue"),
          meta: {
            name: "维护保养-保养执行",
            keepAlive: false //此组件需要被缓存
          },
          props: true
        },
        {
          path: "/page_4/wei_hu_bao_yang/run_hua/:id",
          name: "weiHuBaoYangRunHua",
          component: () =>
            import("../views/pages/page_4/WeiHuBaoYang/RunHua.vue"),
          meta: {
            name: "维护保养-润滑",
            keepAlive: true //此组件需要被缓存
          },
          props: true
        },
        {
          path: "/page_4/wei_hu_bao_yang/run_hua_zhi_xing/:id",
          name: "weiHuBaoYangRunHuaZhiXing",
          component: () =>
            import("../views/pages/page_4/WeiHuBaoYang/RunHuaZhiXing.vue"),
          meta: {
            name: "维护保养-润滑执行",
            keepAlive: false //此组件需要被缓存
          },
          props: true
        }
      ]
    },
    {
      path: "/page_4/yuan_gong_an_quan",
      name: "yuanGongAnQuan",
      component: () => import("../views/pages/page_4/YuanGongAnQuan/Home.vue"),
      redirect: "/page_4/yuan_gong_an_quan/index",
      children: [
        {
          path: "/page_4/yuan_gong_an_quan/index",
          name: "yuanGongAnQuanHome",
          component: () =>
            import("../views/pages/page_4/YuanGongAnQuan/Index.vue"),
          meta: {
            name: "人员证件证书",
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_4/yuan_gong_an_quan/detail/:id",
          name: "yuanGongAnQuanDetail",
          component: () =>
            import("../views/pages/page_4/YuanGongAnQuan/Detail.vue"),
          meta: {
            name: "员工信息详细",
            keepAlive: false //此组件需要被缓存
          },
          props: true
        }
      ]
    }
  ]
};

export default routes;
