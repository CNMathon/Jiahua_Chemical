(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-306a7dca"],{"65dc":function(e,t,i){"use strict";var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("div",{staticClass:"operation",on:{click:e.onClickMinus}},[e._v("-")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.modelValue,expression:"modelValue"}],staticClass:"input",attrs:{disabled:e.modelDisabled},domProps:{value:e.modelValue},on:{input:function(t){t.target.composing||(e.modelValue=t.target.value)}}}),i("div",{staticClass:"operation",on:{click:e.onClickPlus}},[e._v("+")])])},a=[],c=(i("a9e3"),{data:function(){return{modelMin:null,modelMax:null,modelValue:null,modelStep:1,modelDisabled:!0,isError:!1}},props:{min:Number,max:Number,value:Number,step:Number,disabled:Boolean},created:function(){this.errorThrow(),this.initUserSetting()},methods:{onClickPlus:function(){0==this.isError&&(null==this.modelMax||this.modelValue+this.modelStep<=this.modelMax)&&(console.log("+"),this.modelValue+=this.modelStep,this.$emit("getNewValue",this.modelValue))},onClickMinus:function(){0==this.isError&&(null==this.modelMin||this.modelValue-this.modelStep>=this.modelMin)&&(console.log("-"),this.modelValue-=this.modelStep,this.$emit("getNewValue",this.modelValue))},initUserSetting:function(){void 0!=this.value&&(this.modelValue=this.value),void 0!=this.max&&(this.modelMax=this.max),void 0!=this.min&&(this.modelMin=this.min),void 0!=this.step&&(this.modelStep=this.step),void 0!=this.disabled&&(this.modelDisabled=this.disabled)},errorThrow:function(){try{if(this.value<this.min||this.value>this.max)throw this.modelValue="",this.isError=!0,'[Stepper]: The value of the "value" entered is less than the supplied "min" value or greater than the supplied "max" value.';if(null==this.value)throw this.isError=!0,'[Stepper]: The Item of "value" is required and cannot be empty.'}catch(e){console.error(e)}}}}),n=c,o=(i("d962"),i("2877")),l=Object(o["a"])(n,s,a,!1,null,"1280af6f",null);t["a"]=l.exports},"889c":function(e,t,i){},b029:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"donghuo_confirm"},[e._m(0),i("div",{staticClass:"confirm_list"},[i("div",{staticClass:"confirm_item"},[i("div",{staticClass:"confirm_item_content"},[e._v(" 动火设备内部构件清理干净,蒸汽吹扫或水洗合格,达到用火条件； ")]),i("div",{staticClass:"checkbox"},[i("van-checkbox",{attrs:{"checked-color":"#07c160",click:""},model:{value:e.checked[0],callback:function(t){e.$set(e.checked,0,t)},expression:"checked[0]"}})],1),i("div",{staticClass:"confirm_item_signature"},[i("van-image",{attrs:{width:"100%",height:"100%",fit:"scale-down",src:""}})],1)]),i("div",{staticClass:"confirm_item"},[i("div",{staticClass:"confirm_item_content"},[i("span",[e._v("断开与动火设备相连接的所有管线,加盲板")]),i("span",[i("stepper-plus",{attrs:{value:e.manbanNumber,min:0,disabled:!0},on:{getNewValue:e.getManbanNumber}})],1),i("span",[e._v("块；")])]),i("div",{staticClass:"checkbox"},[i("van-checkbox",{attrs:{"checked-color":"#07c160"},model:{value:e.checked[1],callback:function(t){e.$set(e.checked,1,t)},expression:"checked[1]"}})],1)]),i("div",{staticClass:"confirm_item"},[i("div",{staticClass:"confirm_item_content"},[e._v(" 动火点周围的下水井、地漏、地沟、电缆沟等已清除易燃物,并已采取覆盖、铺沙、水封等手段进行隔离； ")]),i("div",{staticClass:"checkbox"},[i("van-checkbox",{attrs:{"checked-color":"#07c160"},model:{value:e.checked[2],callback:function(t){e.$set(e.checked,2,t)},expression:"checked[2]"}})],1)]),i("div",{staticClass:"confirm_item"},[i("div",{staticClass:"confirm_item_content"},[e._v(" 罐区内动火点同一围堰内和防火间距内的油罐不同时进行脱水作业； ")]),i("div",{staticClass:"checkbox"},[i("van-checkbox",{attrs:{"checked-color":"#07c160"},model:{value:e.checked[3],callback:function(t){e.$set(e.checked,3,t)},expression:"checked[3]"}})],1)]),i("div",{staticClass:"confirm_item"},[i("div",{staticClass:"confirm_item_content"},[e._v("高处作业已采取防火花飞溅措施")]),i("div",{staticClass:"checkbox"},[i("van-checkbox",{attrs:{"checked-color":"#07c160"},model:{value:e.checked[4],callback:function(t){e.$set(e.checked,4,t)},expression:"checked[4]"}})],1)]),i("div",{staticClass:"confirm_item"},[i("div",{staticClass:"confirm_item_content"},[e._v("动火点周围易燃物已清除")]),i("div",{staticClass:"checkbox"},[i("van-checkbox",{attrs:{"checked-color":"#07c160"},model:{value:e.checked[5],callback:function(t){e.$set(e.checked,5,t)},expression:"checked[5]"}})],1)]),i("div",{staticClass:"confirm_item"},[i("div",{staticClass:"confirm_item_content"},[e._v(" 电焊回路线已接在焊件上,把线未穿过下水井或与其他设备搭接； ")]),i("div",{staticClass:"checkbox"},[i("van-checkbox",{attrs:{"checked-color":"#07c160"},model:{value:e.checked[6],callback:function(t){e.$set(e.checked,6,t)},expression:"checked[6]"}})],1)]),i("div",{staticClass:"confirm_item"},[i("div",{staticClass:"confirm_item_content"},[e._v(" 乙炔气瓶(直立放置)、氧气瓶间距大于5米，与火源间的距离大于10米 ")]),i("div",{staticClass:"checkbox"},[i("van-checkbox",{attrs:{"checked-color":"#07c160"},model:{value:e.checked[7],callback:function(t){e.$set(e.checked,7,t)},expression:"checked[7]"}})],1)]),i("div",{staticClass:"confirm_item"},[i("div",{staticClass:"confirm_item_content"},[i("span",[e._v("现场配备消防水带")]),i("stepper-plus",{attrs:{value:e.fangshuidaiNumber,min:0,disabled:!0},on:{getNewValue:e.getFangshuidaiNumber}}),i("span",[e._v("根，灭火器")]),i("stepper-plus",{attrs:{value:e.miehuoqiNumber,min:0,disabled:!0},on:{getNewValue:e.getMiehuoqiNumber}}),i("span",[e._v("台,铁锹")]),i("stepper-plus",{attrs:{value:e.tieqiuNumber,min:0,disabled:!0},on:{getNewValue:e.getTieqiuNumber}}),i("span",[e._v("把,灭火毯")]),i("stepper-plus",{attrs:{value:e.miehuotanNumber,min:0,disabled:!0},on:{getNewValue:e.getMiehuotanNumber}}),i("span",[e._v("块；")])],1),i("div",{staticClass:"checkbox"},[i("van-checkbox",{attrs:{"checked-color":"#07c160"},model:{value:e.checked[8],callback:function(t){e.$set(e.checked,8,t)},expression:"checked[8]"}})],1)])]),i("div",{staticClass:"confirm_action"},[i("div",{staticClass:"confirm_actions signature",on:{click:function(t){e.signatureShow=!0}}},[e._v(" 签字 ")]),i("div",{staticClass:"confirm_actions confirm"},[e._v("提交")])]),i("van-popup",{staticClass:"popup",attrs:{position:"bottom"},model:{value:e.signatureShow,callback:function(t){e.signatureShow=t},expression:"signatureShow"}},[i("Canvas",{on:{save:e.saveCanvas,cancel:e.cancelCanvas}})],1)],1)},a=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"head"},[i("div",{staticClass:"head_1"},[e._v("安全措施")]),i("div",{staticClass:"head_2"},[e._v("确认")]),i("div",{staticClass:"head_3"},[e._v("确认人")])])}],c=i("65dc"),n=i("9ce3"),o={name:"donghuo_confirm",components:{Canvas:n["a"],StepperPlus:c["a"]},data:function(){return{manbanNumber:0,fangshuidaiNumber:0,miehuoqiNumber:0,tieqiuNumber:0,miehuotanNumber:0,signatureShow:!1,checked:[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1]}},created:function(){},methods:{pageBack:function(){this.$router.back()},saveCanvas:function(){this.signatureShow=!1,console.log("signatureShow: ")},cancelCanvas:function(){this.signatureShow=!1},testButtonClick:function(){console.log("父组件 = ".concat(this.value))},getManbanNumber:function(e){this.manbanNumber=e},getFangshuidaiNumber:function(e){this.fangshuidaiNumber=e},getMiehuoqiNumber:function(e){this.miehuoqiNumber=e},getTieqiuNumber:function(e){this.tieqiuNumber=e},getMiehuotanNumber:function(e){this.miehuotanNumber=e},testme:function(){console.log({manbanNumber:this.manbanNumber,fangshuidaiNumber:this.fangshuidaiNumber,miehuoqiNumber:this.miehuoqiNumber,tieqiuNumber:this.tieqiuNumber,miehuotanNumber:this.miehuotanNumber})}}},l=o,u=(i("d4bd"),i("2877")),r=Object(u["a"])(l,s,a,!1,null,"3aedba64",null);t["default"]=r.exports},b0b8:function(e,t,i){},d4bd:function(e,t,i){"use strict";var s=i("b0b8"),a=i.n(s);a.a},d962:function(e,t,i){"use strict";var s=i("889c"),a=i.n(s);a.a}}]);
//# sourceMappingURL=chunk-306a7dca.82db5fa8.js.map