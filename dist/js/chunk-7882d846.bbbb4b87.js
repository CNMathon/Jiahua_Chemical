(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7882d846"],{4039:function(t,e,a){},c2cc:function(t,e,a){"use strict";var s=a("4039"),l=a.n(s);l.a},de20:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"acceptance"},[a("van-nav-bar",{attrs:{title:"缺陷","left-text":"返回","left-arrow":""},on:{"click-left":t.pageBack}}),a("div",{staticClass:"cell_group"},[a("div",{staticClass:"cell"},[a("div",{staticClass:"cell_user_header"},[a("van-image",{attrs:{round:"",width:"3.125rem",height:"3.125rem",src:"https://img.yzcdn.cn/vant/cat.jpeg"}})],1),t._m(0)]),t._m(1),t._m(2),t._m(3),t._m(4),t._m(5),a("div",{staticClass:"cell"},[t._m(6),a("div",{staticClass:"cell_value",on:{click:function(e){t.timeShow=!0}}},[a("span",[t._v("2019-01-01 12:00")]),a("span",{staticClass:"cell_value_arrow"},[a("van-icon",{attrs:{name:"arrow"}})],1)])])]),a("div",{staticClass:"cell_group"},[a("div",{staticClass:"cell"},[t._m(7),a("div",{staticClass:"cell_other"},[a("div",{staticClass:"upload"},[a("div",{staticClass:"upload_icon"},[a("van-icon",{attrs:{name:"photo-o"}})],1),a("div",{staticClass:"upload_box"},[a("van-uploader",{attrs:{"after-read":t.afterRead,"preview-size":"5rem",multiple:""},model:{value:t.fileList,callback:function(e){t.fileList=e},expression:"fileList"}})],1)])])]),a("div",{staticClass:"cell"},[t._m(8),a("div",{staticClass:"cell_value"},[t._m(9),a("span",{staticClass:"cell_value_arrow"},[a("van-icon",{attrs:{name:"search"}})],1)])]),t._m(10)]),a("div",{staticClass:"next",on:{click:t.Next}},[t._v("提交")]),a("van-popup",{attrs:{position:"bottom"},model:{value:t.timeShow,callback:function(e){t.timeShow=e},expression:"timeShow"}},[a("van-datetime-picker",{attrs:{type:"datetime","min-date":new Date},on:{cancel:t.onTimeCancel,confirm:t.onTimeConfirm},model:{value:t.currentDate,callback:function(e){t.currentDate=e},expression:"currentDate"}})],1)],1)},l=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell_user_info"},[a("div",{staticClass:"cell_user_infos"},[t._v("缺陷提交人")]),a("div",{staticClass:"cell_user_infos status"},[t._v("等待我处理")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell"},[a("div",{staticClass:"cell_title"},[a("span",[t._v("空间设备")])]),a("div",{staticClass:"cell_title"},[a("span",[t._v("设备A")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell"},[a("div",{staticClass:"cell_title"},[a("span",[t._v("发现人")])]),a("div",{staticClass:"cell_title"},[a("span",[t._v("发现人名")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell"},[a("div",{staticClass:"cell_title"},[a("span",[t._v("缺陷内容")])]),a("div",{staticClass:"cell_other"},[a("textarea",{staticClass:"cell_textarea",attrs:{placeholder:"请输入缺陷内容",cols:"30",rows:"10"}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell"},[a("div",{staticClass:"cell_title"},[a("span",[t._v("缺陷类型")]),a("span",{staticClass:"required"},[t._v("*")])]),a("div",{staticClass:"cell_title"},[a("span",[t._v("类型A")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell"},[a("div",{staticClass:"cell_title"},[a("span",[t._v("缺陷类型")]),a("span",{staticClass:"required"},[t._v("*")])]),a("div",{staticClass:"cell_title"},[a("span",[t._v("类型A")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell_title"},[a("span",[t._v("发现时间")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell_title"},[a("span",[t._v("上传图片")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell_title"},[a("span",[t._v("维修负责人")]),a("span",{staticClass:"required"},[t._v("*")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell_input"},[a("input",{attrs:{type:"text",placeholder:"输入负责人"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell"},[a("div",{staticClass:"cell_title"},[a("span",[t._v("验收结果")]),a("span",{staticClass:"required"},[t._v("*")])]),a("div",{staticClass:"cell_other"},[a("textarea",{staticClass:"cell_textarea",attrs:{placeholder:"输入内容",cols:"30",rows:"10"}})])])}],i=(a("0d03"),a("d399")),c={name:"acceptance",data:function(){return{timeShow:!1,currentDate:new Date,fileList:[]}},created:function(){},methods:{Next:function(){var t=this;i["a"].success("提交成功"),setTimeout((function(){t.pageBack()}),3500)},pageBack:function(){this.$router.back()},onTimeCancel:function(){this.timeShow=!1},onTimeConfirm:function(){this.timeShow=!1},afterRead:function(t){console.log(t)}}},n=c,r=(a("c2cc"),a("2877")),o=Object(r["a"])(n,s,l,!1,null,"efe20712",null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-7882d846.bbbb4b87.js.map