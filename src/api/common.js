/**
 * article模块接口列表
 */

import base from "./request/base"; // 导入接口域名列表
import axios from "./request/http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const common = {
  // 登录
  userLogin(params) {
    params.mobileLogin = true;
    return axios.post(`${base.sq}login`, qs.stringify(params));
  },
  // 图片上传
  uploadFile(params) {
    const config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    params.mobileLogin = true;
    return axios.post(`${base.sq}file/upload`, params, config);
  }
};

export default common;
