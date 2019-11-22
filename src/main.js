import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Vant from "vant";
import "vant/lib/index.css";
import VCharts from "v-charts";
import CellInput from "./components/Cell/CellInput.vue";
import CellImage from "./components/Cell/CellImage.vue";
import CellValue from "./components/Cell/CellValue.vue";
import CellTime from "./components/Cell/CellTime.vue";
import CellPicker from "./components/Cell/CellPicker.vue";
import CellSheet from "./components/Cell/CellSheet.vue";
import CellTextarea from "./components/Cell/CellTextarea.vue";
import CellOther from "./components/Cell/CellOther.vue";
import CellSelectUser from "./components/Cell/CellSelectUser.vue";
import CellSelectDepartment from "./components/Cell/CellSelectDepartment.vue";
import CellSelectUsers from "./components/Cell/CellSelectUsers.vue";
import CellSelectTag from "./components/Cell/CellSelectTag.vue";
import JFilter from "./components/Filter/Filter.vue";
import JFilterItem from "./components/Filter/FilterItem.vue";
import FilterCell from "./components/Filter/FilterCell.vue";
import FilterTime from "./components/Filter/FilterTime.vue";
import FilterSearch from "./components/Filter/FilterSearch.vue";
import FilterBar from "./components/Filter/FilterBar.vue";
import Action from "./components/action/Index.vue";
import dayjs from "dayjs";
import "video.js/dist/video-js.css";
import api from "./api"; // 导入api接口
import { Toast } from "vant";
import { Dialog } from "vant";
import { Notify } from "vant";
import echarts from 'echarts'
import Mixin from './mixin' // Mixin
// 全局注册
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype.$Toast = Toast;
Vue.prototype.$Dialog = Dialog;
Vue.prototype.$dayjs = dayjs; //全局挂载day.js
Vue.prototype.$Notify = Notify;
Vue.prototype.$echarts = echarts
Vue.prototype.$imageUrl = "http://47.96.148.87:8980/js"; // 将api挂载到vue的原型上
Vue.use(Vant);
Vue.use(VCharts);
Vue.config.productionTip = false;
Vue.component("cell-input", CellInput);
Vue.component("cell-image", CellImage);
Vue.component("cell-value", CellValue);
Vue.component("cell-time", CellTime);
Vue.component("cell-sheet", CellSheet);
Vue.component("cell-picker", CellPicker);
Vue.component("cell-textarea", CellTextarea);
Vue.component("cell-other", CellOther);
Vue.component("cell-select-user", CellSelectUser);
Vue.component("cell-select-department", CellSelectDepartment);
Vue.component("cell-select-users", CellSelectUsers);
Vue.component("cell-select-tag", CellSelectTag);
Vue.component("j-filter", JFilter);
Vue.component("j-filter-bar", FilterBar);
Vue.component("j-filter-item", JFilterItem);
Vue.component("j-filter-cell", FilterCell);
Vue.component("j-filter-time", FilterTime);
Vue.component("j-filter-search", FilterSearch);
Vue.mixin(Mixin); // Mixin
// Vue.component('Action', Action);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
