/**
 * article模块接口列表
 */

import base from "./request/base"; // 导入接口域名列表
import axios from "./request/http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const article = {
  getRtMonTagInfosByNames(params) {
    return axios.get(`${base.mes2}GetRtMonTagInfosByNames`, qs.stringify(params))
  }
};

export default article;
