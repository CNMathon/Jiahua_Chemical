(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-961a6348"],{"6d50":function(t,e,a){"use strict";var i=a("805a"),s=a.n(i);s.a},"6f5d":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("van-nav-bar",{attrs:{title:"动土安全","left-text":"返回","right-text":"发起","left-arrow":""},on:{"click-left":t.pageBack,"click-right":t.onClickRight}}),a("j-filter-bar",{attrs:{placeholder:"请输入作业地点名称"},on:{search:t.getPageData,tap:function(e){t.showFilter=!0}},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}}),a("j-filter",{on:{confirm:t.getPageData},model:{value:t.showFilter,callback:function(e){t.showFilter=e},expression:"showFilter"}},[a("j-filter-search",{on:{search:t.filterSearch},model:{value:t.searchValues,callback:function(e){t.searchValues=e},expression:"searchValues"}}),a("j-filter-item",{attrs:{title:"作业票状态",actions:t.zypztList},on:{select:t.filterSelect_1}}),a("j-filter-cell",{attrs:{title:"申请部门"}}),a("j-filter-cell",{attrs:{title:"申请人"}})],1),a("div",{staticClass:"list-card-area"},[a("div",{staticClass:"app"},[a("van-skeleton",{staticClass:"skeleton",attrs:{title:"",row:3,loading:t.isLoading}},t._l(t.listData,(function(e,i){return a("label",{key:i},[a("div",{staticClass:"donghuo-list-card donghuo-list-card-nolast",on:{click:function(a){return t.tap(e)}}},[a("div",{staticClass:"left"},[a("div",{staticClass:"left-line left-line-notlast"},[t._v("动土作业票编号："+t._s(e.dtzypCode))]),a("div",{staticClass:"left-line left-line-notlast"},[t._v("作业地点："+t._s(e.mbzypCode))]),a("div",{staticClass:"left-line left-line-notlast left-line-hor"},[t._v("申请部门："+t._s(e.applyDept))]),a("div",{staticClass:"left-line left-line-notlast left-line-hor"},[t._v("申请人："+t._s(e.applyer))]),a("div",{staticClass:"left-line left-line-notlast"},[t._v("动土开始时间："+t._s(e.dtStarttime_gte))]),a("div",{staticClass:"left-line"},[t._v("动土结束时间："+t._s(e.dtEndtime_gte))])]),1==e.htStatus?a("div",{staticClass:"right"},[t._v("编辑")]):t._e(),2==e.htStatus?a("div",{staticClass:"right"},[t._v("初审")]):t._e(),3==e.htStatus?a("div",{staticClass:"right"},[t._v("审核")]):t._e(),4==e.htStatus?a("div",{staticClass:"right"},[t._v("有效")]):t._e(),5==e.htStatus?a("div",{staticClass:"right"},[t._v("已终结")]):t._e()])])})),0)],1)])],1)},s=[],l=a("e09c"),n={data:function(){return{showFilter:!1,searchValue:"",searchValues:"",zypztList:[{index:-1,name:"请选择"},{index:1,name:"编辑"},{index:2,name:"初审"},{index:3,name:"有效"},{index:4,name:"已验票"},{index:5,name:"已终结"}],listData:[],isLoading:!0,status:""}},mixins:[l["a"]],methods:{onClickRight:function(){this.$router.push({path:"../dongtu"})},getPageData:function(){var t=this;this.isLoading=!0,this.$api.page_3.htHseDtzypListData({__sid:localStorage.getItem("JiaHuaSessionId"),htStatus:this.status,dtSite:this.searchValue}).then((function(e){t.listData=e.list,t.isLoading=!1,console.log(t.listData)}))},tap:function(t){console.log("info: ",t);var e=t.dtzypCode;this.$router.push({path:"../dongtu",query:{id:e}})},filterSelect_1:function(t){console.log(t),-1==t.index?this.status="":this.status=t.index},confirmFilter:function(){},filterSearch:function(){}},created:function(){this.getPageData()}},c=n,o=(a("6d50"),a("da8e"),a("2877")),r=Object(o["a"])(c,i,s,!1,null,"2ba83218",null);e["default"]=r.exports},"805a":function(t,e,a){},da8e:function(t,e,a){"use strict";var i=a("e8f3"),s=a.n(i);s.a},e09c:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var i={methods:{pageBack:function(){this.$router.back()}}}},e8f3:function(t,e,a){}}]);
//# sourceMappingURL=chunk-961a6348.df6ad1e8.js.map