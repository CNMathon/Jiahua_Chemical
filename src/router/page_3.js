// Mine的子组件 用户中心
const SelectDaiBanRen = () =>
  import("../views/pages/page_3/DaiBanRen/index.vue");
const routes = {
  path: "/page_3",
  name: "page_3",
  component: () => import("../views/pages/page_3/Home.vue"),
  redirect: "/page_3/index",
  children: [
    {
      path: "/page_3/index",
      name: "page_3_index",
      component: () => import("../views/pages/page_3/Home/Home.vue"),
      meta: {
        showTabBar: true, //是否显示tabBar
        tabBar: 2,
        keepAlive: true //此组件需要被缓存
      }
    },
    {
      // 选择待办人
      path: "/page_3/daibanren",
      name: "daibanren",
      component: SelectDaiBanRen
    },
    // 我发起的
    {
      path: "/page_3/wofaqi/index",
      name: "WoFaqi_Index",
      component: () => import("../views/pages/page_3/WoFaQi/Index.vue")
    },
    // 我处理的
    {
      path: "/page_3/wochuli/index",
      name: "WoChuLi_Index",
      component: () => import("../views/pages/page_3/WoChuLi/Index.vue")
    },
    // 热力机械管理
    {
      path: "/page_3/relijixie",
      name: "ReLiJiXie",
      redirect: "/page_3/relijixie/index",
      component: () => import("../views/pages/page_3/ReLiJiXie/Home.vue"),
      children: [
        {
          path: "/page_3/relijixie/index",
          name: "ReLiJiXie_Index",
          component: () => import("../views/pages/page_3/ReLiJiXie/Index.vue"),
          meta: {
            name: "热力机械"
          }
        },
        {
          path: "/page_3/relijixie/details",
          name: "relijixie_Details",
          component: () => import("../views/pages/page_3/ReLiJiXie/Details.vue"),
          meta: {
            name: "热力机械-详情"
          }
        },
      ]
    },
    // 电气第一种工作票
    {
      path: "/page_3/dianqi",
      name: "DianQi",
      redirect: "/page_3/dianqi/index",
      component: () => import("../views/pages/page_3/DianQi/Home.vue"),
      children: [
        {
          path: "/page_3/dianqi/index",
          name: "DianQi_Index",
          component: () => import("../views/pages/page_3/DianQi/Index.vue"),
          meta: {
            name: "电气第一种工作票"
          }
        },
        {
          path: "/page_3/dianqi/details",
          name: "DianQi_Details",
          component: () => import("../views/pages/page_3/DianQi/Details.vue"),
          meta: {
            name: "电气第一种工作票-详情"
          }
        },
        {
          path: "/page_3/dianqi/yijian",
          name: "DianQi_YiJian",
          component: () => import("../views/pages/page_3/DianQi/YiJian.vue"),
          meta: {
            name: "填写审批意见"
          }
        },
        {
          path: "/page_3/dianqi/liucheng",
          name: "DianQi_LiuCheng",
          component: () => import("../views/pages/page_3/DianQi/LiuCheng.vue"),
          meta: {
            name: "查看流程记录"
          }
        }
      ]
    },
    //电气第二种工作票
    {
      path: "/page_3/dianqi_2",
      name: "DianQi_2",
      redirect: "/page_3/dianqi_2/index",
      component: () => import("../views/pages/page_3/DianQi_2/Home.vue"),
      children: [
        {
          path: "/page_3/dianqi_2/index",
          name: "DianQi_2_Index",
          component: () => import("../views/pages/page_3/DianQi_2/Index.vue"),
          meta: {
            name: "电气第二种工作票"
          }
        },
        {
          path: "/page_3/dianqi_2/details",
          name: "DianQi_2_Details",
          component: () => import("../views/pages/page_3/DianQi_2/Details.vue"),
          meta: {
            name: "电气第二种工作票-详情"
          }
        },
        {
          path: "/page_3/dianqi_2/yijian",
          name: "DianQi_2_YiJian",
          component: () => import("../views/pages/page_3/DianQi_2/YiJian.vue"),
          meta: {
            name: "填写审批意见"
          }
        },
        {
          path: "/page_3/dianqi_2/liucheng",
          name: "DianQi_2_LiuCheng",
          component: () => import("../views/pages/page_3/DianQi_2/LiuCheng.vue"),
          meta: {
            name: "查看流程记录"
          }
        }
      ]
    },
    // 工单管理
    {
      path: "/page_3/gongdanguanli/index",
      name: "GongDanGuanLi_Index",
      component: () => import("../views/pages/page_3/GongDanGuanLi/Index.vue")
    },
    // 动火安全
    {
      path: "/page_3/donghuo",
      name: "donghuo",
      component: () => import("../views/pages/page_3/DongHuo/Home.vue"),
      redirect: "/page_3/donghuo/index",
      children: [
        {
          path: "/page_3/donghuo/index",
          name: "donghuo_index",
          component: () => import("../views/pages/page_3/DongHuo/Index.vue"),
          meta: {
            name: "动火安全"
          }
        },
        {
          path: "/page_3/donghuo/index2",
          name: "donghuo_index2",
          component: () => import("../views/pages/page_3/DongHuo/Index2.vue"),
          meta: {
            name: "动火安全-安全员"
          }
        },
        {
          path: "/page_3/donghuo/index3",
          name: "donghuo_index3",
          component: () => import("../views/pages/page_3/DongHuo/Index3.vue"),
          meta: {
            name: "动火安全-初审人"
          }
        },
        {
          path: "/page_3/donghuo/index4",
          name: "donghuo_index3",
          component: () => import("../views/pages/page_3/DongHuo/Index4.vue"),
          meta: {
            name: "动火安全-不可编辑"
          }
        },
        {
          path: "/page_3/donghuo/list",
          name: "donghuo_list",
          component: () => import("../views/pages/page_3/DongHuo/List.vue")
        },
        {
          path: "/page_3/donghuo/select",
          name: "donghuo_select",
          component: () =>
            import("../views/pages/page_3/components/TagSelect.vue")
        },
        {
          path: "/page_3/donghuo/select_user",
          name: "Donghuo_SelectUser",
          component: () => import("../views/pages/page_3/SelectUser/Index.vue")
        },
        {
          path: "/page_3/donghuo/list",
          name: "donghuo_list",
          component: () => import("../views/pages/page_3/DongHuo/List.vue")
        },
      ]
    },
    {
      path: "/page_3/kongjian",
      name: "kongjian",
      component: () => import("../views/pages/page_3/KongJian/Home.vue"),
      redirect: "/page_3/kongjian/index",
      children: [
        {
          path: "/page_3/kongjian/index",
          name: "kongjian_index",
          component: () => import("../views/pages/page_3/KongJian/Index.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/kongjian/index2",
          name: "kongjian_index2",
          component: () => import("../views/pages/page_3/KongJian/Index2.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/kongjian/select_user",
          name: "DongTu_SelectUser",
          component: () => import("../views/pages/page_3/SelectUser/Index.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/kongjian/list",
          name: "kongjian_list",
          component: () => import("../views/pages/page_3/KongJian/List.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/kongjian/analysis",
          name: "kongjian_analysis",
          component: () =>
            import("../views/pages/page_3/KongJian/Analysis.vue"),
          meta: {
            name: "受限空间-安全分析",
            keepAlive: true //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/kongjian/add_analysis",
          name: "kongjian_add_analysis",
          component: () =>
            import("../views/pages/page_3/KongJian/AddAnalysis.vue"),
          meta: {
            name: "受限空间-安全分析",
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/kongjian/select",
          name: "kongjian_select",
          component: () =>
            import("../views/pages/page_3/components/TagSelect.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/kongjian/kongjian_select_department",
          name: "kongjian_select_department",
          component: () =>
            import("../views/pages/page_3/SelectDepartment/Index.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/kongjian/confirm",
          name: "kongjian_confirm",
          component: () => import("../views/pages/page_3/KongJian/Confirm.vue"),
          meta: {
            name: "受限空间-确认签字",
            keepAlive: false //此组件不需要被缓存
          }
        }
      ]
    },
    // 盲板
    {
      path: "/page_3/mangban",
      name: "mangban",
      component: () => import("../views/pages/page_3/MangBan/Home.vue"),
      redirect: "/page_3/mangban/index",
      children: [
        {
          path: "/page_3/mangban/index",
          name: "mangban_index",
          component: () => import("../views/pages/page_3/MangBan/Index.vue")
        },
        {
          path: "/page_3/mangban/index2",
          name: "mangban_index2",
          component: () => import("../views/pages/page_3/MangBan/Index2.vue")
        },
        {
          path: "/page_3/mangban/select_user",
          name: "Donghuo_SelectUser",
          component: () => import("../views/pages/page_3/SelectUser/Index.vue")
        },
        {
          path: "/page_3/mangban/list",
          name: "mangban_list",
          component: () => import("../views/pages/page_3/MangBan/List.vue")
        },
        {
          path: "/page_3/mangban/add_device",
          name: "mangban_add_device",
          component: () => import("../views/pages/page_3/MangBan/AddDevice.vue")
        },
        {
          path: "/page_3/mangban/select",
          name: "mangban_select",
          component: () =>
            import("../views/pages/page_3/components/TagSelect.vue")
        },
        {
          path: "/page_3/mangban/confirm",
          name: "mangban_confirm",
          component: () => import("../views/pages/page_3/MangBan/Confirm.vue")
        }
      ]
    },
    // 高处安全
    {
      path: "/page_3/gaochu",
      name: "gaochu",
      component: () => import("../views/pages/page_3/GaoChu/Home.vue"),
      redirect: "/page_3/gaochu/index",
      children: [
        {
          path: "/page_3/gaochu/index",
          name: "gaochu_index",
          component: () => import("../views/pages/page_3/GaoChu/Index.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/gaochu/index2",
          name: "gaochu_index2",
          component: () => import("../views/pages/page_3/GaoChu/Index2.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/gaochu/list",
          name: "gaochu_list",
          component: () => import("../views/pages/page_3/GaoChu/List.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/gaochu/select",
          name: "gaochu_select",
          component: () =>
            import("../views/pages/page_3/components/TagSelect.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/gaochu/select_user",
          name: "GaoChu_SelectUser",
          component: () => import("../views/pages/page_3/SelectUser/Index.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/gaochu/confirm",
          name: "gaochu_confirm",
          component: () => import("../views/pages/page_3/GaoChu/Confirm.vue"),
          meta: {
            name: "高出安全-确认签字",
            keepAlive: false //此组件不需要被缓存
          }
        }
      ]
    },
    // 吊装安全
    {
      path: "/page_3/diaozhuang",
      name: "diaozhuang",
      component: () => import("../views/pages/page_3/DiaoZhuang/Home.vue"),
      redirect: "/page_3/diaozhuang/index",
      children: [
        {
          path: "/page_3/diaozhuang/index",
          name: "diaozhuang_index",
          component: () => import("../views/pages/page_3/DiaoZhuang/Index.vue"),
          meta: {
            keepAlive: false //此组件需要被缓存
          }
        },
        {
          path: "/page_3/diaozhuang/index2",
          name: "diaozhuang_index2",
          component: () =>
            import("../views/pages/page_3/DiaoZhuang/Index2.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/diaozhuang/list",
          name: "diaozhuang_list",
          component: () => import("../views/pages/page_3/DiaoZhuang/List.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/diaozhuang/select",
          name: "diaozhuang_select",
          component: () =>
            import("../views/pages/page_3/components/TagSelect.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/diaozhuang/select_work_permit",
          name: "diaozhuang_select_work_permit",
          component: () =>
            import("../views/pages/page_3/DiaoZhuang/SelectWorkPermit.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/diaozhuang/select_user",
          name: "DiaoZhuang_SelectUser",
          component: () => import("../views/pages/page_3/SelectUser/Index.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/diaozhuang/initial_review",
          name: "DiaoZhuang_initial_review",
          component: () =>
            import("../views/pages/page_3/DiaoZhuang/InitialReview.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/diaozhuang/confirm",
          name: "diaozhuang_confirm",
          component: () =>
            import("../views/pages/page_3/DiaoZhuang/Confirm.vue"),
          meta: {
            name: "吊装安全-确认签字",
            keepAlive: false //此组件不需要被缓存
          }
        }
      ]
    },
    // 临时用电
    {
      path: "/page_3/linshi",
      name: "linshi",
      component: () => import("../views/pages/page_3/LinShi/Home.vue"),
      redirect: "/page_3/linshi/index",
      children: [
        {
          path: "/page_3/linshi/index",
          name: "linshi_index",
          component: () => import("../views/pages/page_3/LinShi/Index.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/linshi/index2",
          name: "linshi_index2",
          component: () => import("../views/pages/page_3/LinShi/Index2.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/linshi/list",
          name: "linshi_list",
          component: () => import("../views/pages/page_3/LinShi/List.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/linshi/select",
          name: "linshi_select",
          component: () =>
            import("../views/pages/page_3/components/TagSelect.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/linshi/select_user",
          name: "LinShi_SelectUser",
          component: () => import("../views/pages/page_3/SelectUser/Index.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/linshi/confirm",
          name: "linshi_confirm",
          component: () => import("../views/pages/page_3/LinShi/Confirm.vue"),
          meta: {
            name: "临时用电-确认签字",
            keepAlive: false //此组件不需要被缓存
          }
        }
      ]
    },
    // 动土安全
    {
      path: "/page_3/dongtu",
      name: "dongtu",
      component: () => import("../views/pages/page_3/DongTu/Home.vue"),
      redirect: "/page_3/dongtu/index",
      children: [
        {
          path: "/page_3/dongtu/index",
          name: "dongtu_index",
          component: () => import("../views/pages/page_3/DongTu/Index.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          },
          props: true
        },
        {
          path: "/page_3/dongtu/index2",
          name: "dongtu_index",
          component: () => import("../views/pages/page_3/DongTu/Index2.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          },
          props: true
        },
        {
          path: "/page_3/dongtu/index_2",
          name: "dongtu_index_2",
          component: () => import("../views/pages/page_3/DongTu/Index2.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          },
          props: true
        },
        {
          path: "/page_3/dongtu/list",
          name: "dongtu_list",
          component: () => import("../views/pages/page_3/DongTu/List.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/dongtu/select",
          name: "dongtu_select",
          component: () =>
            import("../views/pages/page_3/components/TagSelect.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/dongtu/select_user",
          name: "DongTu_SelectUser",
          component: () => import("../views/pages/page_3/SelectUser/Index.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/dongtu/confirm",
          name: "dongtu_confirm",
          component: () => import("../views/pages/page_3/DongTu/Confirm.vue"),
          meta: {
            name: "动土安全-确认签字",
            keepAlive: false //此组件不需要被缓存
          }
        }
      ]
    },
    // 断路安全
    {
      path: "/page_3/duanlu",
      name: "duanlu",
      component: () => import("../views/pages/page_3/DuanLu/Home.vue"),
      redirect: "/page_3/duanlu/index",
      children: [
        {
          path: "/page_3/duanlu/index",
          name: "duanlu_index",
          component: () => import("../views/pages/page_3/DuanLu/Index.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/duanlu/index2",
          name: "duanlu_index2",
          component: () => import("../views/pages/page_3/DuanLu/Index2.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/duanlu/list",
          name: "duanlu_list",
          component: () => import("../views/pages/page_3/DuanLu/List.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/duanlu/select",
          name: "duanlu_select",
          component: () =>
            import("../views/pages/page_3/components/TagSelect.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/duanlu/select_user",
          name: "DuanLu_SelectUser",
          component: () => import("../views/pages/page_3/SelectUser/Index.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/duanlu/confirm",
          name: "duanlu_confirm",
          component: () => import("../views/pages/page_3/DuanLu/Confirm.vue"),
          meta: {
            name: "断路安全-确认签字",
            keepAlive: false //此组件不需要被缓存
          }
        }
      ]
    },
    // 缺陷
    {
      path: "/page_3/quexian",
      name: "quexian",
      component: () => import("../views/pages/page_3/QueXian/Home.vue"),
      redirect: "/page_3/quexian/index",
      children: [
        {
          path: "/page_3/quexian/index",
          name: "quexiano_index",
          component: () => import("../views/pages/page_3/QueXian/Index.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/quexian/list",
          name: "quexiano_list",
          component: () => import("../views/pages/page_3/QueXian/List.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/quexian/select_user",
          name: "QueXian_SelectUser",
          component: () => import("../views/pages/page_3/SelectUser/Index.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/quexian/acceptance",
          name: "quexiano_acceptance",
          component: () =>
            import("../views/pages/page_3/QueXian/Acceptance.vue"),
          meta: {
            keepAlive: false //此组件需要被缓存
          }
        }
      ]
    },
    // 违章
    {
      path: "/page_3/weizhang",
      name: "weizhang",
      component: () => import("../views/pages/page_3/QueXian/Home.vue"),
      redirect: "/page_3/weizhang/index",
      children: [
        {
          path: "/page_3/weizhang/index",
          name: "weizhang_index",
          component: () => import("../views/pages/page_3/WeiZhang/Index.vue"),
          meta: {
            keepAlive: false //此组件需要被缓存
          }
        },
        {
          path: "/page_3/weizhang/list",
          name: "weizhang_list",
          component: () => import("../views/pages/page_3/WeiZhang/List.vue"),
          meta: {
            keepAlive: false //此组件需要被缓存
          }
        },
        {
          path: "/page_3/weizhang/acceptance",
          name: "weizhang_acceptance",
          component: () =>
            import("../views/pages/page_3/WeiZhang/Acceptance.vue"),
          meta: {
            keepAlive: false //此组件需要被缓存
          }
        }
      ]
    },
    // 隐患
    {
      path: "/page_3/yinhuan",
      name: "yinhuan",
      component: () => import("../views/pages/page_3/YinHuan/Home.vue"),
      redirect: "/page_3/yinhuan/index",
      children: [
        {
          path: "/page_3/yinhuan/index",
          name: "yinhuan_index",
          component: () => import("../views/pages/page_3/YinHuan/Index.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/yinhuan/select_user",
          name: "yinhuan_SelectUser",
          component: () => import("../views/pages/page_3/SelectUser/Index.vue"),
          meta: {
            keepAlive: false //此组件不需要被缓存
          }
        },
        {
          path: "/page_3/yinhuan/list",
          name: "yinhuan_list",
          component: () => import("../views/pages/page_3/YinHuan/List.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/yinhuan/feedback",
          name: "yinhuan_feedback",
          component: () => import("../views/pages/page_3/YinHuan/Feedback.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        },
        {
          path: "/page_3/yinhuan/acceptance",
          name: "yinhuan_acceptance",
          component: () =>
            import("../views/pages/page_3/YinHuan/Acceptance.vue"),
          meta: {
            keepAlive: true //此组件需要被缓存
          }
        }
      ]
    }
  ]
};

export default routes;
