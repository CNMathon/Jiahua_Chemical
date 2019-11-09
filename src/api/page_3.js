/**
 * article模块接口列表
 */

import base from './request/base'; // 导入接口域名列表
import axios from './request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const article = {
    // 动火作业票主表保存
    userSelect(params) {
        return axios.get(`${base.sq}sys/empUser/userSelect.json`, {
            params: params
        });
    },
    // 动火作业票主表保存
    htHseDhzypSave(params) {
        return axios.post(
            `${base.sq}dhzyp/htHseDhzyp/save`,
            qs.stringify(params)
        );
    },
    // 动火作业票安全措施子表保存
    htHseDhzypSaveHtHseDhzypSafety(params, __sid) {
        // return axios.post(
        //     `${base.sq}dhzyp/htHseDhzyp/saveHtHseDhzypSafety`,
        //     qs.stringify(params)
        // );
        console.log(8888888)
        console.log(params)
        return axios.post(
            `${base.sq}dhzyp/htHseDhzyp/saveHtHseDhzypSafety`,
            qs.stringify(params),
            {
                headers: {
                    'Content-Type': 'application/json',
                    '__sid': __sid
                },
                
            }
        );
        // return axios({
        //     url: `${base.sq}dhzyp/htHseDhzyp/saveHtHseDhzypSafety`,
        //     methods: 'POST',
        //     data: qs.stringify(params),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         '__sid': __sid
        //     },
        // })
    },
    // 动火作业票查询
    htHseDhzypListData(params) {
        return axios.post(
            `${base.sq}dhzyp/htHseDhzyp/listData`,
            qs.stringify(params)
        );
    },
    // 吊装工种作业证号查询
    htCbsPersonInf(params) {
        return axios.get(
            `${base.sq}personinform/htCbsPersonInf/personAndZjbhTreeData.json`,
            { params: params }
        );
    },
    // 吊装作业票主表保存
    htHseDzzypSave(params) {
        return axios.post(
            `${base.sq}dzzy/htHseDzzyp/save`,
            qs.stringify(params)
        );
    },
    // 吊装作业票子表保存
    htHseDzzypSaveLit(params, __sid) {
        return axios.post(
            `${base.sq}dzzy/htHseDzzyp/mysaveHtHseDzzypAqcs.json`,
            qs.stringify(params),
            {
                headers: {
                    'Content-Type': 'application/json',
                    '__sid': __sid
                },
                
            }
        );
    },
    // 吊装作业票主表查询
    htHseDzzypList(params) {
        return axios.get(`${base.sq}dzzy/htHseDzzyp/listData.json`, {
            params: params
        });
    },
    // 动土作业票保存
    htHseDtzypSave(params) {
        return axios.post(
            `${base.sq}dtzy/htHseDtzyp/save`,
            qs.stringify(params)
        );
    },
    // 高处作业票保存
    htHseUpworkticketSave(params) {
        return axios.post(
            `${base.sq}heightworkticket/htHseUpworkticket/save`,
            qs.stringify(params)
        );
    },
    // 高处作业子票保存
    htHseUpworkticketSave(params, __sid) {
        return axios.post(
            `${base.sq}heightworkticket/htHseUpworkticket/saveHtHseUpworkticketSon.json`,
            qs.stringify(params),
            {
                headers: {
                    'Content-Type': 'application/json',
                    '__sid': __sid
                },
                
            }
        );
    },
    // 受限空间作业票保存
    htHseSxkjzypSave(params) {
        return axios.post(
            `${base.sq}sxkjzyp/htHseSxkjzyp/save`,
            qs.stringify(params)
        );
    },
    // 受限空间作业票查询
    htHseSxkjzypListData(params) {
        return axios.post(
            `${base.sq}sxkjzyp/htHseSxkjzyp/listData`,
            qs.stringify(params)
        );
    },
    // 部门相关查询
    bmSelect(params) {
        return axios.post(
            `${base.sq}sys/office/treeData?isAll=true`,
            qs.stringify(params)
        );
    },
    // 临时用电作业票列表
    htHseLsydzypListData(params) {
        return axios.post(
            `${base.sq}lsydzyp/htHseLsydzyp/list`,
            qs.stringify(params)
        );
    },
    // 临时用电作业票保存、修改
    htHseLsydzypSave(params) {
        return axios.post(
            `${base.sq}lsydzyp/htHseLsydzyp/save`,
            qs.stringify(params)
        );
    },
    // 断路安全作业票查询
    htHseDlzypListData(params) {
        return axios.post(
            `${base.sq}dlzyp/htHseDlzyp/listData`,
            qs.stringify(params)
        );
    },
    // 断路作业票保存、修改
    htHseDlzypSave(params) {
        return axios.post(
            `${base.sq}dlzyp/htHseDlzyp/save`,
            qs.stringify(params)
        );
    },
    // 设备缺陷保存
    htDeviceDefectSave(params) {
        return axios.post(
            `${base.sq}device/defect/htDeviceDefect/save`,
            qs.stringify(params)
        );
    },
    // 盲板抽堵作业票查询
    htHseMbzypListData(params) {
        return axios.post(
            `${base.sq}mbzyp/htHseMbzyp/listData`,
            qs.stringify(params)
        );
    },
    // 高处作业作业票查询
    htHseUpworkticketListData(params) {
        return axios.post(
            `${base.sq}heightworkticket/htHseUpworkticket/listData.json`,
            qs.stringify(params)
        );
    },
    // 动土作业票查询
    htHseDtzypListData(params) {
        return axios.post(
            `${base.sq}dtzyp/htHseDtzyp/listData`,
            qs.stringify(params)
        );
    },
    // 隐患管理查询
    dangerRectificationListData(params) {
        return axios.post(
            `${base.sq}dangerrectification/dangerRectification/listData.json`,
            qs.stringify(params)
        );
    },
    // 隐患保存
    dangerRectificationSave(params) {
        return axios.post(
            `${base.sq}dangerrectification/dangerRectification/save.json`,
            qs.stringify(params)
        );
    },
    // 违章管理查询
    htCbsBreakrulesmanageListData(params) {
        return axios.post(
            `${base.sq}breakrulemanage/htCbsBreakrulesmanage/listData.json`,
            qs.stringify(params)
        );
    }
};

export default article;
