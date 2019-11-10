/**
 * article模块接口列表
 */

import base from './request/base'; // 导入接口域名列表
import axios from './request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const article = {
    // 教育培训-统计信息
    getStatisticsInfo(params) {
        return axios.get(`${base.sq}port/grport/getStatisticsInfo.json`, {
            params: params
        });
    },
    // 我的历史考试
    getMyTestHistory(params) {
        return axios.post(
            `${base.sq}myexam/myexam/listData`,
            qs.stringify(params)
        );
    },
    // 我的试卷详情
    getQueryMyPaperInfo(params) {
        return axios.get(`${base.sq}myexam/myexam/queryMyPaperInfo`, {
            params: params
        });
    },
    // 提交考试答案
    submitMyPaper(params, __sid) {
        return axios.post(`${base.sq}myexam/myexam/submitMyPaper`, params, {
            headers: {
                'Content-Type': 'application/json',
                __sid: __sid
            }
        });
    },
    // 我的学习
    getMyStudy(params) {
        return axios.post(
            `${base.sq}coursesList/htZxksCoursesList/portStudyList`,
            qs.stringify(params)
        );
    },
    // 我的学习详情
    getMyStudyDetail(params) {
        return axios.post(
            `${base.sq}coursesList/htZxksCoursesList/courseStudy2`,
            qs.stringify(params)
        );
    },
    // 资料库数据
    getksTrainingFiles(params) {
        return axios.post(
            `${base.sq}training/ksTrainingFiles/listData.json`,
            qs.stringify(params)
        );
    },
    // 培训
    htZxksPxzx(params) {
        return axios.post(
            `${base.sq}pxzx/htZxksPxzx/pxqdList`,
            qs.stringify(params)
        );
    },
    // 培训签到
    saveHtZxksPxzxRen(params) {
        return axios.post(
            `${base.sq}pxzx/htZxksPxzx/saveHtZxksPxzxRen`,
            qs.stringify(params)
        );
    },
    // 获取地址前缀
    getSQ() {
        return base.sq;
    }
};

export default article;
