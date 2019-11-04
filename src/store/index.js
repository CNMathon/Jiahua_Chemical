import Vue from "vue";
import Vuex from "vuex";
import selectUser from "./modules/selectUser";
import donghuo from "./modules/donghuo";
import diaozhuang from "./modules/diaozhuang";
import dongtu from "./modules/dongtu";
import gaochu from "./modules/gaochu";
import kongjian from "./modules/kongjian";
import linshi from "./modules/linshi";
import duanlu from "./modules/duanlu";
import quexian from "./modules/quexian";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    selectUser,
    donghuo,
    diaozhuang,
    dongtu,
    gaochu,
    kongjian,
    linshi,
    duanlu,
    quexian
  },
  strict: debug
});
