<!-- 动火列表页 -->
<template>
  <div class="home">
    <van-sticky>
      <van-nav-bar title="审批"
                   left-text="返回"
                   right-text="提交"
                   left-arrow
                   @click-left="pageBack"
                   @click-right="submit"
                   fixed />
    </van-sticky>
    <div class="cell_group fixed-first">
      <cell-textarea title="审批意见"
                     required
                     v-model="comment"
                     placeholder="请输入审批意见"></cell-textarea>
      <div v-if="status=='3'" class="huiqian">
        <span>会签节点</span>
        <p @click="check1" :class="aqy===0?'checked':'box'">安全员</p>
        <p @click="check2" :class="sbgly===0?'checked':'box'">设备管理员</p>
      </div>
    </div>
    <div class="signature" @click="signatureShow = true">
          <span>签字</span>
          <van-image v-if="apprSignCode" style="width:40px;margin-left:30px" :src="apprSignCode"></van-image>
          <van-icon style="float:right" name="edit" />
          
    </div>
    <!-- 画板Popup -->
        <van-popup
          class="popup"
          v-model="signatureShow"
          :close-on-click-overlay="false"
          position="bottom"
        >
          <Canvas ref="signature" @save="saveCanvas" @cancel="cancelCanvas"></Canvas>
        </van-popup>
  </div>
</template>

<script>
  import { mixin } from "@/mixin/mixin";
  import Canvas from "@/components/Canvas.vue";
  export default {
    components: {
      Canvas
    },
    data () {
      return {
        comment: '',
        id: '',
        actRuTask: '',
        apprSignCode:"",
        signatureShow:false,
        status:0,
        sbgly:1,
        aqy:1
      };
    },
    mixins: [mixin],
    created () {
      console.log(this.$route.query)
      this.id = this.$route.query.id
      this.actRuTask = this.$route.query.actRuTask
      this.status = this.$route.query.status
    },
    methods: {
      saveCanvas(e) {
        console.log(123)
        console.log("e: ", e);
        this.signatureShow = false;
        this.apprSignCode = e;
      },
      //选中传0
      check1(){
        if(this.aqy==0){
          this.aqy = 1
        }else{
          this.aqy = 0
        }
      },
      check2(){
        if(this.sbgly==0){
          this.sbgly = 1
        }else{
          this.sbgly = 0
        }
      },
    // 取消签名
    cancelCanvas() {
      console.log("取消签名");
      this.signatureShow = false;
    },
      pageBack () {
        this.$router.go(-1)
      },
      submit () {
        console.log(888)
        if (this.comment === '') {
          this.$notify("请填写审批意见");
        }else if(this.apprSignCode==''){
          this.$notify("请签字");
        } else {
          let data
          if(this.status=='3'){
            data = {
              'id': this.id,
              'flowKey': 'htHseMbzypService',
              'comment': this.comment,
              'actRuTask.id': this.actRuTask,
              'btnSubmit': '通过',
              extendVar:{
                sbgly:this.sbgly,
                aqy:this.aqy,
                apprSignCode:this.apprSignCode
              },
              __sid: localStorage.getItem("JiaHuaSessionId")
            }
          }else{
            data = {
              'id': this.id,
              'flowKey': 'htHseMbzypService',
              'comment': this.comment,
              'actRuTask.id': this.actRuTask,
              'btnSubmit': '通过',
              extendVar:{
                apprSignCode:this.apprSignCode
              },
              __sid: localStorage.getItem("JiaHuaSessionId")
            }
          }
          this.$api.page_3.approve(data).then((ress) => {
            console.log(ress)
            if (ress.result === 'true') {
              console.log(ress.groups)
              if (ress.groups) {
                console.log(333333333333)
                this.$router.push({                  name: 'daibanren', query: {
                    groups: ress.groups.join(','),
                    taskId: ress.taskId,
                    id: this.id,
                    type: 'htHseMbzypService'
                  }                })
              } else {
                console.log(44444444444444444)
                this.$router.push({ path: '../mangban/list' })
              }
            } else {
              this.$notify(ress.message);
            }
          }).catch(() => this.$Toast.clear());
        }
      }

    }
  };
</script>

<style lang="scss" scoped>
.signature {
  background-color: white;
  padding: 30px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}
.huiqian{
  padding:30px;
  font-size:0.875rem;
  .box{
    float: right;
    margin: 0 10px;
    padding: 2px 10px;
    border: 1px solid #cbcbcb;
    color: #cbcbcb;
  }
  .checked{
    float: right;
    margin: 0 10px;
    padding: 2px 10px;
    background: #108CD4;
    color:#ffffff;
    border:none
  }
}
</style>
