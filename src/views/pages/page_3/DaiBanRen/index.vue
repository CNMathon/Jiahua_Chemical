<template>
  <div class="daibanren">
    <van-sticky>
      <van-nav-bar title="指定待办人" left-text="返回" left-arrow @click-left="pageBack" />
      <div class="head">
        <div class="top" @click="initialSwipe = 0">通讯录</div>
        <van-icon name="arrow" v-show="initialSwipe !== 0" />
        <div v-if="initialSwipe !== 0">人事部</div>
      </div>
    </van-sticky>
    <van-skeleton title :row="13" :loading="loading">
      <div v-show="initialSwipe === 0">
        <van-cell-group>
          <div v-for="(item,index) in Post" :key="index">
            <van-cell :title="item.postName" is-link @click="toDetail(item.postCode)" />
          </div>
        </van-cell-group>
      </div>
      <div class="contenter" v-if="initialSwipe === 1">
        <van-skeleton :row="3" :loading="loadings">
          <van-radio-group v-model="radio">
            <van-cell-group>
              <div v-for="(item,index) in User" :key="index">
                <van-cell clickable @click="radio = index">
                  <template slot="title">
                    <div class="cell-title">
                      <div class="header">
                        <van-image
                          width="2.8125rem"
                          height="2.8125rem"
                          src="https://img.yzcdn.cn/vant/cat.jpeg"
                        />
                      </div>
                      <div class="info">
                        <div class="name">{{item.userName}}</div>
                        <div class="department"></div>
                      </div>
                    </div>
                  </template>
                  <van-radio slot="icon" :name="index" />
                </van-cell>
              </div>
            </van-cell-group>
          </van-radio-group>
          <div v-show="User.length === 0">
            <van-divider class="no-user">暂无人员</van-divider>
          </div>
        </van-skeleton>
        <div @click="claim()" class="action">确认</div>
      </div>
    </van-skeleton>
  </div>
</template>
<script>
export default {
  name: "daibanren",
  data() {
    return {
      initialSwipe: 0,
      radio: "",
      loading: true,
      loadings: true,
      Post: [], //部门数据
      User: [] //部门人员数据
    };
  },
  created() {
    // 获取部门数据
    console.log(this.$route.query.groups)
    this.getPosts();
  },
  methods: {
    // 获取部门人员数据
    toDetail(code) {
      this.initialSwipe = 1;
      this.getUsers(code);
    },
    // 获取部门数据
    getPosts() {
      this.$api.page_3
        .getPosts({
          __sid: localStorage.getItem("JiaHuaSessionId"),
          postCodes:this.$route.query.groups
        })
        .then(res => {
          console.log("res: ", res);
          this.Post = res.data;
          this.loading = false;
        })
        .catch(() => this.$Toast.clear());
    },
    // 获取部门人员数据
    getUsers(code) {
      this.loadings = true;
      this.$api.page_3
        .getUsers({
          __sid: localStorage.getItem("JiaHuaSessionId"),
          postCode: code
        })
        .then(res => {
          this.User = res.data;
          console.log("res: ", res);
          this.loadings = false;
        })
        .catch(() => this.$Toast.clear());
    },
    // 返回上级
    pageBack() {
      this.$router.back();
    },
    claim(){
      console.log(this.User[this.radio].userCode)
      let data = {
        __sid: localStorage.getItem("JiaHuaSessionId"),
        id:this.$route.query.id,
        task_id:this.$route.query.taskId,
        user_code:this.User[this.radio].userCode
      }
      this.$api.page_3.claim(data).then((res)=>{
        if(res.result=='true'){
          this.$Toast.success('签收任务成功！')
          if(this.$route.query.type=='htHseDhzypService'){
            this.$router.push({name:'donghuo_list'})
          }else if(this.$route.query.type=='htHseSxkjzypService'){
            this.$router.push({name:'kongjian_list'})
          }else if(this.$route.query.type=='htHseMbzypService'){
            this.$router.push({name:'mangban_list'})
          }else if(this.$route.query.type=='htHseUpworkticketService'){
            this.$router.push({name:'gaochu_list'})
          }else if(this.$route.query.type=='htHseDzzypService'){
            this.$router.push({name:'diaozhuang_list'})
          }else if(this.$route.query.type=='htHseLsydzypService'){
            this.$router.push({name:'linshi_list'})
          }else if(this.$route.query.type=='htHseDtzypService'){
            this.$router.push({name:'dongtu_list'})
          }else if(this.$route.query.type=='htHseDlzypService'){
            this.$router.push({name:'duanlu_list'})
          }
        }else{
          this.$Toast.fail('操作失败')
        }
      }).catch(() => this.$Toast.clear());
    }
  }
};
</script>
<style lang="scss" scoped>
.daibanren {
  min-height: 100vh;
  position: relative;
}
.head {
  background-color: #fff;
  padding: 15px 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .top {
    color: #6096f8;
  }
}
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
.contenter {
  padding-bottom: 100px;
  box-sizing: border-box;
}
.action {
  width: 100vw;
  height: 98px;
  text-align: center;
  background: rgba(96, 150, 248, 1);
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 32px;
  color: rgba(255, 255, 255, 1);
  line-height: 98px;
}
.no-user {
  padding-top: 60px;
}
</style>