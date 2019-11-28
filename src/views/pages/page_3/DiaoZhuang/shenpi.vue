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
        signatureShow:false
      };
    },
    mixins: [mixin],
    created () {
      console.log(this.$route.query)
      this.id = this.$route.query.id
      this.actRuTask = this.$route.query.actRuTask
    },
    methods: {
      saveCanvas(e) {
      console.log(123)
      console.log("e: ", e);
      this.signatureShow = false;
      this.apprSignCode = e;
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
          let data = {
            'id': this.id,
            'flowKey': 'htHseDzzypService',
            'comment': this.comment,
            'actRuTask.id': this.actRuTask,
            'btnSubmit': '通过',
            extendVar:{
              apprSignCode:this.apprSignCode
            },
            __sid: localStorage.getItem("JiaHuaSessionId")
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
                    type: 'htHseDzzypService'
                  }                })
              } else {
                console.log(44444444444444444)
                this.$router.push({ path: '../diaozhuang/list' })
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
</style>
