(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-101e6d56"],{"6df3":function(e,a,s){"use strict";var t=s("f3e9"),i=s.n(t);i.a},b969:function(e,a,s){"use strict";s.r(a);var t=function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("div",{staticClass:"login",style:{height:e.screenHeight}},[e._m(0),s("div",{staticClass:"content"},[s("div",{staticClass:"cell-box"},[s("van-field",{staticClass:"field",attrs:{clearable:"",label:"用户名",placeholder:"请输入用户名"},model:{value:e.username,callback:function(a){e.username=a},expression:"username"}}),s("van-field",{staticClass:"field password",attrs:{type:"password",label:"密码",placeholder:"请输入密码"},model:{value:e.password,callback:function(a){e.password=a},expression:"password"}})],1),s("div",{staticClass:"action"},[s("van-button",{staticClass:"aaa",attrs:{type:"primary",loading:e.loading,"loading-text":"正在登录...",size:"large",color:"#6096F8"},on:{click:e.tapLogin}},[e._v("登录")])],1)])])},i=[function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("div",{staticClass:"title"},[s("div",{staticClass:"title-1"},[e._v("浙江嘉化能源安全生产")]),s("div",{staticClass:"title-2"},[e._v("运营管理系统移动端")])])}],o=(s("ac1f"),s("5319"),{name:"login",data:function(){return{loading:!1,screenHeight:0,username:"",password:""}},methods:{tapLogin:function(){var e=this,a=this;this.loading=!0;var s={username:this.username,password:this.password,__ajax:"json"};this.$api.common.userLogin(s).then((function(s){console.log(s),localStorage.setItem("JiaHuaSessionId",s.sessionid),localStorage.setItem("JiaHuaUserName",s.user.userName),localStorage.setItem("JiaHuaRefCode",s.user.refCode),localStorage.setItem("JiaHuaUserCode",s.user.userCode),"system"!=e.username&&(localStorage.setItem("JiaHuaOfficeCode",s.user.refObj.office.officeCode),localStorage.setItem("JiaHuaOfficeName",s.user.refObj.office.officeName)),e.loading=!1,e.$toast.success({duration:1e3,message:"登录成功",onClose:function(){a.$router.replace({path:"/"})}})}))}},created:function(){this.screenHeight="".concat(document.documentElement.clientHeight,"px"),console.log(this.screenHeight)}}),n=o,l=(s("6df3"),s("2877")),c=Object(l["a"])(n,t,i,!1,null,"744d2bb6",null);a["default"]=c.exports},f3e9:function(e,a,s){}}]);
//# sourceMappingURL=chunk-101e6d56.2bfa5438.js.map