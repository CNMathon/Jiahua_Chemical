<template>
  <div class="select-user">
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="pageBack" />
    <div class="head">
      <van-search
        v-model="refName"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
        @cancel="onCancel"
        :clearable="false"
      />
    </div>
    <div class="tree-postion">
      <div @click="toggleData(cacheAllList, -1)">
        <span>组织机构</span>
        <span v-show="treePostionList.length > 0">
          <van-icon name="arrow" />
        </span>
      </div>
      <div
        v-for="(title, index) in treePostionList"
        :key="index"
        :class="{'active': treePostionList.length -1 === index}"
        @click.stop="toggleData(title, index)"
      >
        <span>{{title.name}}</span>
        <span v-show="treePostionList.length-1 !== index">
          <van-icon name="arrow" />
        </span>
      </div>
    </div>
    <div class="list">
      <van-list :finished="true" :loading="false">
        <!-- 多选 -->
        <van-checkbox-group
          v-model="result"
          v-if="!$route.query.radio && selectUser"
          :max="max"
        >
          <van-cell-group>
            <van-cell v-for="(item, index) in list" clickable :key="item.id" @click="toggle(index)">
              <template slot="title">
                <div class="cell-title">
                  <div class="header">
                    <img :src="item.avatarUrl" alt srcset />
                  </div>
                  <div class="info">
                    <div class="name">{{  item.name || item.userName }}</div>
                    <div class="department">{{ item.fullName }}</div>
                  </div>
                </div>
              </template>
              <van-checkbox :name="item" ref="checkboxes" slot="icon" />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <!-- 单选 组织-->
        <van-radio-group v-model="radio" v-else>
          <van-cell-group>
            <van-cell
              v-for="(item, index) in list"
              clickable
              :key="item.id"
              @click="tapOrganization(item, index)"
            >
              <template slot="title">
                <div class="cell-title">
                  <div class="header">
                    <img :src="item.avatarUrl" alt srcset />
                  </div>
                  <div class="info">
                    <div class="name">{{ item.name || item.userName }}</div>
                  </div>
                </div>
              </template>
              <van-radio slot="icon" :name="index" />
              <!-- <van-checkbox :name="item" ref="checkboxes" slot="icon" /> -->
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-list>
    </div>
    <div class="action" v-if="!$route.query.radio" @click="pageBack">
      确定
      <span v-if="!$route.query.radio && selectUser">({{ result.length }}/{{ $route.query.max }})</span>
    </div>
    <div class="action" v-else @click="pageBack">确定</div>
  </div>
</template>
<script>
export default {
  name: "select-Organization-User",
  data() {
    return {
      treePostionList: [], // 树状导航
      list: [],
      cacheAllList: [],
      employeeOfficeOfficeName: "", // 选择的组织名
      employeeCompanyCompanyName: "", // 选择的公司名
      result: [],
      results: "",
      refName: "", // 用户名
      storeModule: "",
      selectUser: false, // 选择用户
      max: 1,
      min: 1,
      storeKey: "",
      title: "请选择",
      radio: ""
    };
  },
  created() {
    this.storeModule = this.$route.query.storeModule;
    this.storeKey = this.$route.query.storeKey;
    this.results = this.$store.state[this.storeModule][this.storeKey];
    this.max = parseInt(this.$route.query.max);
    this.min = parseInt(this.$route.query.min);
    this.title = this.$route.query.title;
    this.officeTreeData();
    //
  },
  methods: {
    toggleData(data, index) {
      if (index === -1) {
        this.list = data;
        this.treePostionList = [];
      } else {
        this.list = data.children;
        this.treePostionList = this.treePostionList.slice(0, index + 1);
      }
      //  不选择用户
      this.selectUser = false;
    },
    //  多选
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    tapRadio(index) {
      this.radio = index;
    },
    // 搜索
    onSearch() {
      //  直接选择个人
      this.selectUser = true;
      //  个人列表
      this.list = [];
      this.treePostionList= [];
      this.getUserData();
    },
    // 取消搜索
    onCancel() {
      this.refName = "";
      //  取消直接选择个人
      this.selectUser = false;
      this.list = this.cacheAllList;
      this.treePostionList= [];
    },
    //  多选
    toggle(index) {
      if (!this.selectUser) {
        this.treePostionList.push(data);
        if (data.children.length > 0) {
          this.list = data.children;
        } else {
          this.employeeOfficeOfficeName = data.name;
          this.employeeOfficeOfficeCode = data.id;
          this.getUserData();
        }
      } else {
        //  选择具体的人物 分多选或者的单选
        this.$refs.checkboxes[index].toggle();
      } 
    },
    //  选择组织 获得当前所有的 子类
    tapOrganization(data, index) {
      console.log(data)
      if (!this.selectUser) {
        this.treePostionList.push(data);
        if (data.children.length > 0) {
          console.log(111)
          this.list = data.children;
          console.log(this.list)
          if(this.list[0].children.length<=0){
            this.selectUser = true;
          }
        } else {
          console.log(222)
          this.employeeOfficeOfficeName = data.name;
          this.employeeOfficeOfficeCode = data.id;
        }
      } else {
        //  选择具体的人物 分多选或者的单选
        this.tapRadio(index);
      }
    },
    officeTreeData() {
      this.$api.common
        .officeTreeData({
          __sid: this.$userInfo.sessionId
        })
        .then(res => {
          // 数据全部加载完成
          this.cacheAllList = this.list = this.organizationList(res, "0");
        });
    },
    // 获取用户列表
    getUserData() {
      let sendData = {
        userName: "",
        refName: this.refName,
        "employee.office.officeCode": this.employeeOfficeOfficeCode,
        "isAll":true,
        __sid: this.$userInfo.sessionId
      };
      this.$api.common
        .empUserList(sendData)
        .then(res => {
          this.list = res.list.map(item => {
            let newItem = {};
            item.avatarUrl =
              this.$imageUrl + item.avatarUrl.replace("/ctxPath", "");
            newItem.avatarUrl = item.avatarUrl;
            newItem.userName = item.userName;
            newItem.userCode = item.userCode;
            newItem.fullName = item.refObj.office.officeName;
            return newItem;
          });
          //  开始选择人物
          this.selectUser = true;
        })
        .catch(() => {});
    },
    //  创建一个树形结构
    organizationList(res, id) {
      let list = [];
      list = res.filter(item => {
        if (item.pId === id) {
          item.children = this.organizationList(res, item.id);
        }
        return item.pId === id;
      });
      return list;
    },
    pageBack() {
      let obj = {
        key: this.storeKey,
        value: this.result
      };
      if (this.$route.query.radio) {
        obj.value = [];
        obj.value.push(this.list[this.radio]);
      }

      this.$store.dispatch(`${this.storeModule}/changTag`, obj);

      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.tree-postion {
  padding: 10px 20px;
  height: 30px;
  line-height: 30px;
  position: relative;
  color: rgba(96, 150, 248, 1);
  display: inline-flex;
  justify-content: flex-start;
  align-items: stretch;
  align-content: center;
  overflow-x: scroll;
  font-size: 0.875rem;
  box-sizing: content-box;
  flex-wrap: nowrap;
  > div {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    flex-shrink: 0;
    color: rgba(96, 150, 248, 1);
    vertical-align: middle;
  }
  > div.active {
    color: #000;
  }
}
.select-user {
  padding-bottom: 100px;
  .list {
    .cell-title {
      display: flex;
      align-items: center;
      .header {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 20px;
        img {
          width: 90px;
          height: 90px;
        }
      }
      .info {
        width: 500px;
        overflow: hidden;
        .name {
          font-size: 28px;
          color: rgba(51, 51, 51, 1);
        }
        .department {
          font-size: 28px;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
  .action {
    width: 100vw;
    height: 98px;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(96, 150, 248, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
    font-size: 32px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
