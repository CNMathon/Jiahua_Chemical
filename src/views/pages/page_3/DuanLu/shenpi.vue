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
      <div v-if="status=='2'" class="huiqian">
        <span>会签节点</span>
        <div style="margin-top:10px">
          <p @click="check1" :class="zzb===1?'checked':'box'">制造部</p>
          <p @click="check2" :class="aqhbb===1?'checked':'box'">安全环保部</p>
          <p @click="check3" :class="tjzg===1?'checked':'box'">土建专工</p>
          <p @click="check4" :class="sdbm===1?'checked':'box'">属地部门</p>
        </div>
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
        status:'',
        zzb:0,
        aqhbb:0,
        tjzg:0,
        sdbm:0
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
      //选中传1
      check1(){
        if(this.zzb==0){
          this.zzb = 1
        }else{
          this.zzb = 0
        }
      },
      check2(){
        if(this.aqhbb==0){
          this.aqhbb = 1
        }else{
          this.aqhbb = 0
        }
      },
      check3(){
        if(this.tjzg==0){
          this.tjzg = 1
        }else{
          this.tjzg = 0
        }
      },
      check4(){
        if(this.sdbm==0){
          this.sdbm = 1
        }else{
          this.sdbm = 0
        }
      },
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
        if (this.comment === '') {
          this.$notify("请填写审批意见");
        }else if(this.apprSignCode==''){
          this.$notify("请签字");
        }  else {
          let data
          if(this.status=='2'){
            data = {
              'id': this.id,
              'flowKey': 'htHseDlzypService',
              'comment': this.comment,
              'actRuTask.id': this.actRuTask,
              'btnSubmit': '通过',
              extendVar:{
                zzb:this.zzb,
                aqhbb:this.aqhbb,
                tjzg:this.tjzg,
                sdbm:this.sdbm,
                apprSignCode:this.apprSignCode
              },
              __sid: localStorage.getItem("JiaHuaSessionId")
            }
          }else{
            data = {
              'id': this.id,
              'flowKey': 'htHseDlzypService',
              'comment': this.comment,
              'actRuTask.id': this.actRuTask,
              'btnSubmit': '通过',
              extendVar:{
                apprSignCode:this.apprSignCode
              },
              __sid: localStorage.getItem("JiaHuaSessionId")
            }
          }
          console.log(data)
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
                    type: 'htHseDlzypService'
                  }                })
              } else {
                console.log(44444444444444444)
                this.$router.push({ path: '../duanlu/list' })
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
  font-size:0.875rem;
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
