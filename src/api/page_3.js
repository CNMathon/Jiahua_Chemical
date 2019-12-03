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
    //获取任务id
    getTaskInfo(params) {
        return axios.get(`${base.sq}act/core/mobile/getTaskInfo`, {
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
        return axios.post(
            `${base.sq}dhzyp/htHseDhzyp/saveHtHseDhzypSafety`,
            params,
            {
                headers: {
                    'Content-Type': 'application/json',
                    __sid: __sid
                }
            }
        );
    },
    // 动火作业票查询
    htHseDhzypListData(params) {
        return axios.post(
            `${base.sq}dhzyp/htHseDhzyp/listData`,
            qs.stringify(params)
        );
    },
    // 动火作业票子表查询
    mylistDataD(params) {
        return axios.post(
            `${base.sq}dhzyp/htHseDhzyp/mylistDataD`,
            qs.stringify(params)
        );
    },
    // 吊装工种作业证号查询
    htCbsPersonInf(params) {
        return axios.get(
            `${base.sq}personinform/htCbsPersonInf/personAndZjbhTreeData.json`,
            {
                params: params
            }
        );
    },
    // 吊装作业票主表保存
    htHseDzzypSave(params, __sid) {
        return axios.post(
            `${base.sq}dzzy/htHseDzzyp/save`,
            qs.stringify(params)
        );
    },
    //吊装安全作业子表
    getDzaqInfo(params) {
        return axios.get(
            `${
                base.sq
            }dzzy/htHseDzzyp/alllistHtHseDzzypAqcs.json?${qs.stringify(
                params
            )}`,
            {}
        );
    },
    // 吊装作业票子表保存
    htHseDzzypSaveLit(params, __sid) {
        return axios({
            method: 'POST',
            url: `${base.sq}dzzy/htHseDzzyp/mysaveHtHseDzzypAqcs.json`,
            data: params,
            headers: {
                'content-type': 'application/json; charset=utf-8',
                __sid: __sid
            }
        });
    },
    // 吊装作业票主表查询
    htHseDzzypList(params) {
        return axios.get(`${base.sq}dzzy/htHseDzzyp/listData.json`, {
            params: params
        });
    },
    // 动土作业票保存
    htHseDtzypSave(params, __sid) {
        return axios(
            {
                method: 'POST',
                url: `${base.sq}dtzyp/htHseDtzyp/save2`,
                data: params,
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    __sid: __sid
                }
            }
        );
    },
    // 高处作业作业票查询
    htHseUpworkticketListData(params) {
        return axios.post(
            `${base.sq}heightworkticket/htHseUpworkticket/listData.json`,
            qs.stringify(params)
        );
    },
    // 高处作业 子表查询
    htHseUpworkticketGetChildrenListData(id,__sid) {
        return axios({
            method: 'get',
            url: `${base.sq}heightworkticket/htHseUpworkticket/listHtHseUpworkticketSon.json?fatherId.id=${id}&__sid=${__sid}`,
            headers: {
                'content-type': 'application/json; charset=utf-8',
                __sid: __sid
            }
        });
    },
    // 高处作业票保存
    htHseUpworkticketSave(params) {
        return axios.post(
            `${base.sq}heightworkticket/htHseUpworkticket/save`,
            qs.stringify(params)
        );
    },
    // 高处作业子票保存
    htHseUpworkticketSaveLit(params, __sid) {
        return axios({
            method: 'POST',
            url: `${base.sq}heightworkticket/htHseUpworkticket/saveHtHseUpworkticketSon.json`,
            data: params,
            headers: {
                'content-type': 'application/json; charset=utf-8',
                __sid: __sid
            }
        });
    },
    // 受限空间作业票保存
    htHseSxkjzypSave(params, __sid) {
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
    // 受限空间作业票查询 详情
    htHseSxkjzypListDataById(params) {
        return axios.post(
            `${base.sq}sxkjzyp/htHseSxkjzyp/getById`,
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
            `${base.sq}lsydzyp/htHseLsydzyp/listData`,
            qs.stringify(params)
        );
    },
    // 临时用电作业票列表
    htHseLsydzypListDataById(params) {
        return axios.post(
            `${base.sq}lsydzyp/htHseLsydzyp/getById`,
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
    // 断路作业票查询 详情
    htHseDlzypListDataById(params) {
        return axios.post(
            `${base.sq}dlzyp/htHseDlzyp/getById`,
            qs.stringify(params)
        );
    },
    // 断路作业票保存、修改
    htHseDlzypSave(params, __sid) {
        return axios.post(`${base.sq}dlzyp/htHseDlzyp/appSave`, params, {
            headers: {
                'Content-Type': 'application/json',
                __sid: __sid
            }
        });
    },
    // 设备缺陷列表
    htHseDzzypList(params) {
        return axios.get(`${base.sq}device/defect/htDeviceDefect/listData`, {
            params: params
        });
    },
    // 设备缺陷保存
    htDeviceDefectSave(params) {
        return axios.post(
            `${base.sq}device/defect/htDeviceDefect/save`,
            qs.stringify(params)
        );
    },
    // 盲板作业票新增和修改（表单提交）
    htHseMbzypSave(params, __sid) {
        return axios.post(`${base.sq}mbzyp/htHseMbzyp/save2`, params, {
            headers: {
                'Content-Type': 'application/json',
                __sid: __sid
            }
        });
    },
    // 盲板作业票查询
    htHseMbzypListData(params) {
        return axios.post(
            `${base.sq}mbzyp/htHseMbzyp/listData`,
            qs.stringify(params)
        );
    },
    // 盲板作业票查询 详情
    htHseMbzypListDataById(params) {
        return axios.post(
            `${base.sq}mbzyp/htHseMbzyp/getById`,
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
    // 动土作业票查询 详情
    htHseDtzypListDataById(params) {
        return axios.post(
            `${base.sq}dtzyp/htHseDtzyp/getById`,
            qs.stringify(params)
        );
    },
    // 隐患管理查询
    dangerRectificationListData(params) {
        return axios.post(
            `${base.sq}jhdangerrect/jhDangerRect/listData.json`,
            qs.stringify(params)
        );
    },
    // 隐患保存
    dangerRectificationSave(params) {
        return axios.post(
            `${base.sq}jhdangerrect/jhDangerRect/save.json`,
            qs.stringify(params)
        );
    },
    // 隐患详情
    dangerRectificationForm(params) {
        return axios.get(
            `${base.sq}dangerrectification/dangerRectification/form.json`,
            {
                params: params
            }
        );
    },
    // 违章管理查询
    htCbsBreakrulesmanageListData(params) {
        return axios.post(
            `${base.sq}breakrulemanage/jhCbsBrkRulesManage/listData.json`,
            qs.stringify(params)
        );
    },
    //违章保存
    htCbsBreakrulesmanageSave(params) {
        return axios.post(
            `${base.sq}breakrulemanage/jhCbsBrkRulesManage/save`,
            qs.stringify(params)
        );
    },
    // 违章查询
    Violation(params) {
        return axios.get(
            `${base.sq}breakrulemanage/jhCbsBrkRulesManage/form.json`,
            {
                params: params
            }
        );
    },
    //承包商项目
    contractorProject(params) {
        return axios.post(
            `${base.sq}proinfo/htCbsXxglProjectInfo/listData2?htStatus=3`,
            qs.stringify(params)
        );
    },
    //违章考核标准
    violationAssessmentCriteria(params) {
        return axios.post(
            `${base.sq}breakrulesstandard/breakRulesasseaStandard/listDataLayerData2?normStatus=3`,
            qs.stringify(params)
        );
    },
    //违章项目
    violationProject(params) {
        return axios.post(
            `${base.sq}breakrulesstandard/breakRulesasseaStandard/getItemByStandId`,
            qs.stringify(params)
        );
    },
    //获取部门数据
    getPosts(params) {
        return axios.get(`${base.sq}act/core/client/getPosts`, {
            params: params
        });
    },
    //获取部门人员数据
    getUsers(params) {
        return axios.get(`${base.sq}act/core/client/getUsers`, {
            params: params
        });
    },
    //提交工作流
    start(type, params) {
        return axios.post(`${base.sq}${type}/start`, qs.stringify(params));
    },
    // 文件列表
    fileList(params) {
        return axios.get(`${base.sq}file/fileList`, qs.stringify(params));
    },
    //提交工作流
    approve(params) {
        return axios.post(
            `${base.sq}act/core/client/approve`,
            qs.stringify(params)
        );
    },
    claim(params) {
        return axios.post(
            `${base.sq}act/core/client/claim`,
            qs.stringify(params)
        );
    },
    getRtMonTagInfosByNames(params) {
        return axios.get(
            `${base.mes2}GetRtMonTagInfosByNames`,
            qs.stringify(params)
        );
    },
    // 热力机械工作票
    // 获取待办审批列表
    GetUnDoApproveList(params) {
        return axios.post(
            `${base.mes3}GetUnDoApproveList`,
            qs.stringify(params)
        );
    },
    // 作业列表
    getJobs(params) {
        return axios.get(`${base.mes3}GetJobs`, qs.stringify(params));
    },
    // 获取作业详情
    getTaskById(params) {
        console.log('params: ', params);
        return axios.get(`${base.mes3}GetTaskById?${qs.stringify(params)}`);
    },
    //工单列表
    deviceWorkOrderListData(params) {
        return axios.get(
            `${base.sq}workorder/deviceWorkOrder/listData.json?${qs.stringify(
                params
            )}`
        );
    },
    //工单保存
    deviceWorkOrderSave(params) {
        return axios.post(
            `${base.sq}workorder/deviceWorkOrder/save?${qs.stringify(params)}`
        );
    },
    //空间设备列表
    deviceSpacelistData(params) {
        return axios.get(
            `${base.sq}deviceinfo/deviceSpace/listData?${qs.stringify(params)}`
        );
    },
    // 文件上传
    fileUpload(params) {
        return axios.post(`${base.sq}file/upload?${qs.stringify(params)}`, {
            headers: {
                'Content-Type':
                    'multipart/form-data; boundary----WebKitFormBoundaryt8uxnK9w7CBA2Rzj',
                __sid: localStorage.JiaHuaSessionId
            }
        });
    },
    // 检修项目查询
    deviceProjectListData(params) {
        return axios.get(
            `${base.sq}project/deviceProject/listData.json?${qs.stringify(
                params
            )}`
        );
    },
    // 工单详情与验收接口
    workorderDeviceWorkOrder2Form(params) {
        return axios.get(
            `${base.sq}workorder/deviceWorkOrder2/form.json?${qs.stringify(
                params
            )}`
        );
    },
    // 工单安全模板查询接口
    workorderDeviceWorkOrderSecurityListData(params) {
        return axios.get(
            `${
                base.sq
            }workorder/deviceWorkOrderSecurity/listData?${qs.stringify(params)}`
        );
    },
    // 工单作业票查询
    cptListData(params) {
        return axios.post(`${base.sq}cpt/listData`, qs.stringify(params));
    },
    // 获取我发起的任务
    clientStartListData(params) {
        return axios.post(
            `${base.sq}act/core/client/startListData`,
            qs.stringify(params)
        );
    },
    // 获取待办任务
    actCoreMobileDoingListData(params) {
        return axios.post(
            `${base.sq}act/core/mobile/doingListData`,
            qs.stringify(params)
        );
    },
    // 获取已办任务
    actCoreclientStartListData(params) {
        return axios.post(
            `${base.sq}act/core/client/startListData`,
            qs.stringify(params)
        );
    }
};

export default article;
