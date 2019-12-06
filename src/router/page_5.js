const routes = {
    path: '/page_5',
    name: 'page_5',
    component: () => import('../views/pages/page_5/Home.vue'),
    meta: {
        keepAlive: true //此组件需要被缓存
    },
    redirect: '/page_5/index',
    children: [
        {
            path: '/page_5/index',
            name: 'page_5_index',
            component: () => import('../views/pages/page_5/Index/Index.vue'),
            meta: {
                name: '信息查询',
                keepAlive: true, //此组件需要被缓存
                showTabBar: true, //是否显示tabBar
                tabBar: 4
            }
        },
        {
            path: '/page_5/zi_liao_ku',
            name: 'page_5_zi_liao_ku',
            component: () => import('../views/pages/page_5/ZiLiaoKu/Index.vue'),
            meta: {
                name: '资料库',
                keepAlive: false //此组件需要被缓存
            }
        },
        {
            path: '/page_5/qian_dao',
            name: 'page_5_qian_dao',
            component: () => import('../views/pages/page_5/QianDao/Index.vue'),
            meta: {
                name: '签到',
                keepAlive: false //此组件需要被缓存
            }
        },
        {
            path: '/page_5/photo',
            name: 'page_5_qian_dao_photo',
            component: () => import('../views/pages/page_5/QianDao/Photo.vue'),
            meta: {
                name: '签到-拍照',
                keepAlive: false //此组件需要被缓存
            }
        },
        {
            path: '/page_5/xue_xi',
            name: 'page_5_xue_xi',
            component: () => import('../views/pages/page_5/XueXi/Home.vue'),
            meta: {
                keepAlive: false //此组件需要被缓存
            },
            redirect: '/page_5/xue_xi_index',
            children: [
                {
                    path: '/page_5/xue_xi_index',
                    name: 'page_5_xue_xi_index',
                    component: () =>
                        import('../views/pages/page_5/XueXi/Index.vue'),
                    meta: {
                        name: '学习',
                        keepAlive: false //此组件需要被缓存
                    }
                },
                {
                    path: '/page_5/xue_xi_detail',
                    name: 'page_5_xue_xi_detail',
                    component: () =>
                        import('../views/pages/page_5/XueXi/Detail.vue'),
                    meta: {
                        name: '学习-详情',
                        keepAlive: false //此组件需要被缓存
                    },
                    props: true
                }
            ]
        },
        {
            path: '/page_5/kao_shi',
            name: 'page_5_kao_shi',
            component: () => import('../views/pages/page_5/KaoShi/Home.vue'),
            meta: {
                keepAlive: false //此组件需要被缓存
            },
            redirect: '/page_5/kao_shi_index',
            children: [
                {
                    path: '/page_5/kao_shi_index',
                    name: 'page_5_kao_shi_index',
                    component: () =>
                        import('../views/pages/page_5/KaoShi/Index.vue'),
                    meta: {
                        name: '考试',
                        keepAlive: false //此组件需要被缓存
                    }
                },
                {
                    path: '/page_5/kao_shi_answer',
                    name: 'page_5_kao_shi_answer',
                    component: () =>
                        import('../views/pages/page_5/KaoShi/Answer.vue'),
                    meta: {
                        name: '考试-答题',
                        keepAlive: false //此组件需要被缓存
                    },
                    props: true
                },
                {
                    path: '/page_5/kao_shi_analysis',
                    name: 'page_5_kao_shi_analysis',
                    component: () =>
                        import('../views/pages/page_5/KaoShi/Analysis.vue'),
                    meta: {
                        name: '考试-查看解析',
                        keepAlive: false //此组件需要被缓存
                    },
                    props: true
                }
            ]
        },
        {
            path: '/page_5/qrcode_ks',
            name: 'page_5_qrcode_ks',
            component: () => import('../views/pages/page_5/qrcode_ks/Index.vue'),
        },
        {
            path: '/page_5/qrcode_qd',
            name: 'page_5_qrcode_qd',
            component: () => import('../views/pages/page_5/qrcode_qd/Index.vue'),
        },
    ]
};

export default routes;
