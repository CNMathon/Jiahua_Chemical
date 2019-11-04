/**
 * 信息查询模块接口列表
 */

import base from "./request/base"; // 导入接口域名列表
import axios from "./request/http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const information = {
  // 承包商列表
  htCbsXxglJbxxList(params) {
    return axios.post(
      `${base.sq}baseinfo/htCbsXxglJbxx/listData`,
      qs.stringify(params)
    );
  },
  // 承包商详情-基本信息
  htCbsXxglJbxxDetail(params) {
    return axios.post(
      `${base.sq}baseinfo/htCbsXxglJbxx/appZInfo`,
      qs.stringify(params)
    );
  },
  // 承包商详情-资质材料
  htCbsXxglJbxxDetails(params) {
    return axios.post(
      `${base.sq}baseinfo/htCbsXxglJbxx/son4`,
      qs.stringify(params)
    );
  },
  // 承包商详情-资质材料-附件清单
  fileList(params) {
    return axios.post(`${base.sq}file/fileList`, qs.stringify(params));
  },
  // 承包商详情-联系人列表
  htCbsXxglJbxxUserList(params) {
    return axios.post(
      `${base.sq}baseinfo/htCbsXxglJbxx/son6`,
      qs.stringify(params)
    );
  },
  // 承包商人员列表、获取承包商人员基本信息
  htCbsXxglJbxxList_2(params) {
    return axios.post(
      `${base.sq}baseinfo/htCbsXxglJbxx/listData2?htStatus=1`,
      qs.stringify(params)
    );
  },
  // 承包商人员列表、获取承包商人员基本信息
  htCbsPersonInf(params) {
    return axios.post(
      `${base.sq}personinform/htCbsPersonInf/listData`,
      qs.stringify(params)
    );
  },
  // 承包商人员详细信息--证明材料
  _stuffList(params) {
    return axios.post(
      `${base.sq}personinform/htCbsPersonInf/stuffList`,
      qs.stringify(params)
    );
  },
  // 承包商人员详细信息--培训记录
  _trainList(params) {
    return axios.post(
      `${base.sq}personinform/htCbsPersonInf/trainList`,
      qs.stringify(params)
    );
  },
  // 承包商人员详细信息--违章记录
  _wzList(params) {
    return axios.post(
      `${base.sq}personinform/htCbsPersonInf/wzList`,
      qs.stringify(params)
    );
  },
  // 承包商人员详细信息--入场/离场记录
  _rclcList(params) {
    return axios.post(
      `${base.sq}personinform/htCbsPersonInf/rclcList`,
      qs.stringify(params)
    );
  },
  // 承包商人员详细信息--黑名单记录
  _backListPage(params) {
    return axios.post(
      `${base.sq}personinform/htCbsPersonInf/backListPage`,
      qs.stringify(params)
    );
  },
  // 员工安全信息
  htUserInfoListData(params) {
    return axios.post(
      `${base.sq}userinfo/htUserInfo/listData`,
      qs.stringify(params)
    );
  },
  // 人员信息详细_人员证件管理
  sumHtZxksPapers(params) {
    return axios.post(
      `${base.sq}papers/htZxksPapers/sumHtZxksPapers`,
      qs.stringify(params)
    );
  }
};

export default information;
