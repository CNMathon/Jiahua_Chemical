(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-757bef16"],{"0b7b":function(t,e,n){var r=n("8f95"),a=n("7463"),i=n("0363"),o=i("iterator");t.exports=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||a[r(t)]}},1316:function(t,e,n){t.exports=n("9cd3")},"1d8c":function(t,e,n){},"22cb":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"select-user"},[n("van-nav-bar",{attrs:{title:"人员选择","left-text":"返回","left-arrow":""},on:{"click-left":t.pageBack}}),n("div",{staticClass:"head"},[n("van-search",{attrs:{placeholder:"请输入搜索关键词","show-action":"",shape:"round",clearable:!1},on:{search:t.onSearch,cancel:t.onCancel},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}})],1),n("div",{staticClass:"list"},[n("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.getUserData},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[n("van-checkbox-group",{model:{value:t.result,callback:function(e){t.result=e},expression:"result"}},[n("van-cell-group",t._l(t.list,(function(e,r){return n("van-cell",{key:e.id,attrs:{clickable:""},on:{click:function(e){return t.toggle(r)}}},[n("template",{slot:"title"},[n("div",{staticClass:"cell-title"},[n("div",{staticClass:"header"},[n("img",{attrs:{src:e.avatarUrl,alt:"",srcset:""}})]),n("div",{staticClass:"info"},[n("div",{staticClass:"name"},[t._v(t._s(e.userName))]),n("div",{staticClass:"department"},[t._v(t._s(e.fullName))])])])]),n("van-checkbox",{ref:"checkboxes",refInFor:!0,attrs:{slot:"icon",name:e},slot:"icon"})],2)})),1)],1)],1)],1),n("div",{staticClass:"action",on:{click:t.pageBack}},[t._v(" 确定（"+t._s(t.result.length)+"/"+t._s(t.pageSetting.count)+"） ")])],1)},a=[],i=(n("99af"),n("d81d"),n("ac1f"),n("5319"),n("284c")),o={name:"selectUser",data:function(){return{pageSetting:{count:10,pageNo:1,pageSize:20},searchValue:"",list:[],loading:!1,finished:!1,result:[]}},created:function(){this.storeModule=this.$route.query.storeModule,this.storeKey=this.$route.query.storeKey,this.results=this.$store.state[this.storeModule][this.storeKey]},methods:{onSearch:function(){this.list="",this.getUserData()},onCancel:function(){this.searchValue="",this.list="",this.getUserData(),console.log(123)},onLoad:function(){var t=this;setTimeout((function(){for(var e=0;e<10;e++)t.list.push(t.list.length+1);t.loading=!1,t.list.length>=40&&(t.finished=!0)}),500),this.getUserData()},toggle:function(t){this.$refs.checkboxes[t].toggle()},check:function(){console.log(this.results)},clickChech:function(){var t=this;this.$nextTick((function(e){console.log("this.$refs.checkboxes[index]: ",t.$refs.checkboxes.checked),t.$refs.checkboxes[e].checked=!0}))},getUserData:function(){var t=this,e={refName:this.searchValue,pageNo:this.pageSetting.pageNo,pageSize:this.pageSetting.pageSize,__sid:this.$userInfo.sessionId};this.$api.page_3.userSelect(e).then((function(e){if(t.loading=!1,t.list.length>=t.pageSetting.count)t.finished=!0;else{var n=e.list.map((function(e){var n={};return e.avatarUrl=t.$imageUrl+e.avatarUrl.replace("/ctxPath",""),n.avatarUrl=e.avatarUrl,n.userName=e.userName,n.userCode=e.userCode,n.fullName=e.refObj.office.officeName,n}));t.pageSetting.count=e.count,t.pageSetting.pageNo=e.pageNo+1,t.list=[].concat(Object(i["a"])(t.list),Object(i["a"])(n)),t.check()}})).catch((function(){}))},pageBack:function(){var t={key:this.storeKey,value:this.result};this.$store.dispatch("".concat(this.storeModule,"/changTag"),t),this.$router.back()}}},s=o,c=(n("f94e"),n("2877")),l=Object(c["a"])(s,r,a,!1,null,"21944537",null);e["default"]=l.exports},2616:function(t,e,n){var r=n("0363"),a=n("7463"),i=r("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(a.Array===t||o[i]===t)}},"284c":function(t,e,n){"use strict";var r=n("1316"),a=n.n(r);function i(t){if(a()(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}var o=n("a06f"),s=n.n(o),c=n("2dc0"),l=n.n(c);function u(t){if(l()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return s()(t)}function f(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function h(t){return i(t)||u(t)||f()}n.d(e,"a",(function(){return h}))},"2dc0":function(t,e,n){t.exports=n("588c")},"471b":function(t,e,n){"use strict";var r=n("194a"),a=n("4fff"),i=n("faaa"),o=n("2616"),s=n("6725"),c=n("6c15"),l=n("0b7b");t.exports=function(t){var e,n,u,f,h=a(t),d="function"==typeof this?this:Array,v=arguments.length,g=v>1?arguments[1]:void 0,p=void 0!==g,b=0,x=l(h);if(p&&(g=r(g,v>2?arguments[2]:void 0,2)),void 0==x||d==Array&&o(x))for(e=s(h.length),n=new d(e);e>b;b++)c(n,b,p?g(h[b],b):h[b]);else for(f=x.call(h),n=new d;!(u=f.next()).done;b++)c(n,b,p?i(f,g,[u.value,b],!0):u.value);return n.length=b,n}},"484e":function(t,e,n){var r=n("a5eb"),a=n("471b"),i=n("7de7"),o=!i((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:o},{from:a})},"588c":function(t,e,n){n("5145"),n("3e47"),t.exports=n("59d7")},"59d7":function(t,e,n){var r=n("8f95"),a=n("0363"),i=n("7463"),o=a("iterator");t.exports=function(t){var e=Object(t);return void 0!==e[o]||"@@iterator"in e||i.hasOwnProperty(r(e))}},"5ab9":function(t,e,n){n("e519");var r=n("764b");t.exports=r.Array.isArray},"74e7":function(t,e,n){t.exports=n("bc59")},"7de7":function(t,e,n){var r=n("0363"),a=r("iterator"),i=!1;try{var o=0,s={next:function(){return{done:!!o++}},return:function(){i=!0}};s[a]=function(){return this},Array.from(s,(function(){throw 2}))}catch(c){}t.exports=function(t,e){if(!e&&!i)return!1;var n=!1;try{var r={};r[a]=function(){return{next:function(){return{done:n=!0}}}},t(r)}catch(c){}return n}},"9cd3":function(t,e,n){t.exports=n("5ab9")},a06f:function(t,e,n){t.exports=n("74e7")},bc59:function(t,e,n){n("3e47"),n("484e");var r=n("764b");t.exports=r.Array.from},e519:function(t,e,n){var r=n("a5eb"),a=n("6220");r({target:"Array",stat:!0},{isArray:a})},f94e:function(t,e,n){"use strict";var r=n("1d8c"),a=n.n(r);a.a},faaa:function(t,e,n){var r=n("6f8d");t.exports=function(t,e,n,a){try{return a?e(r(n)[0],n[1]):e(n)}catch(o){var i=t["return"];throw void 0!==i&&r(i.call(t)),o}}}}]);
//# sourceMappingURL=chunk-757bef16.d2dc1424.js.map