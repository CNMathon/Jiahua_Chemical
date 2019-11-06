const routes = {
	path: "/Component",
	name: "Component",
	component: () => import("../components/Home.vue"),
	children: [
		// 页面级联选择器
		{
			path: "/Component/CasSelect",
			name: "Component_CasSelect",
			component: () => import("../components/Home.vue"),
			meta: {
		    keepAlive: false //此组件不需要被缓存
		  },
			children: [
				// 选择项目 
				{
					path: "/Component/CasSelect/Project",
					name: "Component_CasSelect_Project",
					component: () => import("../components/CasSelect/Project.vue"),
				}
			]
		}
	]
}
export default routes