/**
 * article模块接口列表
 */

import base from "./request/base"; // 导入接口域名列表
import axios from "./request/http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const article = {
  // 新闻列表
  articleList() {
    return axios.get(`${base.sq}/topics`);
  },
  // 新闻详情,演示
  articleDetail(id, params) {
    return axios.get(`${base.sq}/topic/${id}`, {
      params: params
    });
  },
  // post提交
  dongHuoSave(params) {
    return axios.post(
      `${base.sq}/js/a/dhzyp/htHseDhzyp/save`,
      qs.stringify(params)
    );
  }
  // 其他接口…………
};

export default article;
