/**
 * article模块接口列表
 */

import base from "./request/base"; // 导入接口域名列表
import axios from "./request/http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const article = {
  getRtMonTagInfosByNames(params) {
    return axios.get(`${base.mes2}GetRtMonTagInfosByNames`, {
    	params: params
    })
  },
  hsezyCount(params) {
  	return axios.get(`${base.sqsta}dp/hsezyCount`, {
    	params: params
    })
  },
  hseCBSCount(params) {
  	return axios.get(`${base.sqsta}dp/hseCBSCount`, {
    	params: params
    })
  },
  sipV1Sql1(params) {
    return axios.get(`${base.jhec_8085}sip/v1/sql1`, {
      params: params
    })
  },
  sipV1Sql2(params) {
    return axios.get(`${base.jhec_8085}sip/v1/sql2`, {
      params: params
    })
  },
  dpJhyhzgl(params) {
    return axios.get(`${base.jhec_8085}dp/jhyhzgl`, {
      params: params
    })
  },
  dpJhpxhgl(params) {
    return axios.get(`${base.jhec_8085}dp/jhpxhgl`, {
      params: params
    })
  },
  dpCzsgl(params) {
    return axios.get(`${base.jhec_8085}dp/czsgl`, {
      params: params
    })
  },
};

export default article;
