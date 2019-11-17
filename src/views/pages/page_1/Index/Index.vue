<template>
  <div class="home">
    <van-nav-bar 
      title="首页"
      fixed="true"
      class="navbar"
    >
      <div slot="left" class="sign-out" @click="signOut">退出</div>
      <van-icon
        slot="right"
        class-prefix="iconfont"
        name="jinggao"
        size="1.125rem"
        color="#F39800"
        @click="toPage('./error')"
      />
    </van-nav-bar>
    <van-tabs
        style="margin-top:45px"
        color="#33A4E8"
        title-inactive-color="#333333"
        title-active-color="#33A4E8"
        @change="changeTab"
      >
        <div slot="nav-rights" class="nav-right">
          <van-icon name="bars" size="20px" />
        </div>
        <van-tab
          title="生产"
          class="tabs-box"
        >
          <div>
            <van-row>
              <van-col span="6">
                <div style="width:100%;height:100px" id="dongli"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="liusuan"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="shaojian"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="xincailiao"></div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="6">
                <div style="width:100%;height:100px" id="chunjinsuan"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="suanshuijie"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="suanzhengliu"></div>
              </van-col>
              <van-col span="6">
              </van-col>
            </van-row>
            <div class="rongliang">
              <div class="box">
                <p class="p1">15511.1<span>t/h</span></p>
                <p class="p2">总产汽</p>
              </div>
              <div class="box">
                <p class="p1">15511.1<span>t/h</span></p>
                <p class="p2">外供蒸汽</p>
              </div>
              <div class="box">
                <p class="p1">15511.1<span>t/h</span></p>
                <p class="p2">外销蒸汽</p>
              </div>
              <div class="box">
                <p class="p1">15511.1<span>t/h</span></p>
                <p class="p2">烧碱A套电流</p>
              </div>
              <div class="box">
                <p class="p1">15511.1<span>t/h</span></p>
                <p class="p2">烧碱B套电流</p>
              </div>
              <div class="box">
                <p class="p1">15511.1<span>t/h</span></p>
                <p class="p2">淳进酸流量</p>
              </div>
              <div class="box">
                <p class="p1">15511.1<span>t/h</span></p>
                <p class="p2">算蒸馏流量</p>
              </div>
              <div class="box">
                <p class="p1">15511.1<span>t/h</span></p>
                <p class="p2">酸水解流量</p>
              </div>
              <div class="box">
                <p class="p1">15511.1<span>t/h</span></p>
                <p class="p2">硫酸分机转速</p>
              </div>
              <div class="box">
                <p class="p1">15511.1<span>t/h</span></p>
                <p class="p2">新材料甲苯</p>
              </div>
              <div style="clear:both">
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab
          title="安全"
          class="tabs-box"
        >
          <div class="safeMsg">
            <van-row class="tip">
              <van-col span="11">当日承包商数量：50</van-col>
              <van-col style="text-align:right" span="13">当日承包商人员数量：483</van-col>
            </van-row>
          </div>
          <div class="tszyBox">
            <div class="title">
              当日公司特殊作业
            </div>
            <van-row class="tip">
              <van-col span="6">
                <p>动火作业</p>
                <p>10</p>
              </van-col>
              <van-col span="6">
                <p>盲板抽堵</p>
                <p>10</p>
              </van-col>
              <van-col span="6">
                <p>受限空间</p>
                <p>10</p>
              </van-col>
              <van-col span="6">
                <p>高处作业</p>
                <p>10</p>
              </van-col>
            </van-row>
            <van-row class="tip">
              <van-col span="6">
                <p>动土作业</p>
                <p>10</p>
              </van-col>
              <van-col span="6">
                <p>断路作业</p>
                <p>10</p>
              </van-col>
              <van-col span="6">
                <p>临时用电</p>
                <p>10</p>
              </van-col>
              <van-col span="6">
                <p>吊装作业</p>
                <p>10</p>
              </van-col>
            </van-row>
          </div>
          <div class="tszyBox">
            <div class="title">
              重大危险源监控
            </div>
            <van-row class="tip">
              <van-col span="8">
                <img src="img/nav_1.ffd7a07c.svg"/>
                <p>烧碱</p>
              </van-col>
              <van-col span="8">
                <img src="img/nav_2.3c77d78b.svg"/>
                <p>新材料</p>
              </van-col>
              <van-col span="8">
                <img src="img/nav_3.6e07cf35.svg"/>
                <p>硫酸</p>
              </van-col>
            </van-row>
          </div>
          <div class="tszyBox">
            <div class="title">
              重点监管的危险化工工艺
            </div>
            <van-row class="tip">
              <van-col span="8">
                <img src="img/nav_1.ffd7a07c.svg"/>
                <p>烧碱</p>
              </van-col>
              <van-col span="8">
                <img src="img/nav_2.3c77d78b.svg"/>
                <p>新材料</p>
              </van-col>
              <van-col span="8">
                <img src="img/nav_3.6e07cf35.svg"/>
                <p>硫酸</p>
              </van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab
          title="环保"
          class="tabs-box"
        >
          <van-row>
              <van-col span="6">
                <div style="width:100%;height:100px" id="so2"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="nox"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="yanchen"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="cod"></div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="6">
                <div style="width:100%;height:100px" id="andan"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="ph"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="voc"></div>
              </van-col>
              <van-col span="6">
              </van-col>
            </van-row>
        </van-tab>
        <van-tab
          title="能源"
          class="tabs-box"
        >
        </van-tab>
        <van-tab
          title="质量"
          class="tabs-box"
        >
          <div class="proporty">
            <van-row class="head">
              <van-col span="8">
                分厂名称
              </van-col>
              <van-col span="8">
                原材料合格率(%)
              </van-col>
              <van-col span="8">
                产品合格率(%)
              </van-col>
            </van-row>
            <van-row class="item">
              <van-col span="8">
                动力中心
              </van-col>
              <van-col span="8">
                80
              </van-col>
              <van-col span="8">
                79
              </van-col>
            </van-row>
            <van-row class="item">
              <van-col span="8">
                烧碱厂
              </van-col>
              <van-col span="8">
                79
              </van-col>
              <van-col span="8">
                59
              </van-col>
            </van-row>
            <van-row class="item">
              <van-col span="8">
                脂肪醇厂
              </van-col>
              <van-col span="8">
                97
              </van-col>
              <van-col span="8">
                92
              </van-col>
            </van-row>
            <van-row class="item">
              <van-col span="8">
                硫酸厂
              </van-col>
              <van-col span="8">
                91
              </van-col>
              <van-col span="8">
                85
              </van-col>
            </van-row>
            <van-row class="item">
              <van-col span="8">
                新材料厂
              </van-col>
              <van-col span="8">
                83
              </van-col>
              <van-col span="8">
                91
              </van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab
          title="设备"
          class="tabs-box"
        >
          <div class="proporty">
            <van-row class="head">
              <van-col span="6">
                分厂名称
              </van-col>
              <van-col span="6">
                特种设备数量
              </van-col>
              <van-col span="6">
                关键设备数量
              </van-col>
              <van-col span="6">
                主要设备数量
              </van-col>
            </van-row>
            <van-row class="item">
              <van-col span="6">
                动力中心
              </van-col>
              <van-col span="6">
                80
              </van-col>
              <van-col span="6">
                79
              </van-col>
              <van-col span="6">
                79
              </van-col>
            </van-row>
            <van-row class="item">
              <van-col span="6">
                烧碱厂
              </van-col>
              <van-col span="6">
                79
              </van-col>
              <van-col span="6">
                59
              </van-col>
              <van-col span="6">
                59
              </van-col>
            </van-row>
            <van-row class="item">
              <van-col span="6">
                脂肪醇厂
              </van-col>
              <van-col span="6">
                97
              </van-col>
              <van-col span="6">
                92
              </van-col>
              <van-col span="6">
                92
              </van-col>
            </van-row>
            <van-row class="item">
              <van-col span="6">
                硫酸厂
              </van-col>
              <van-col span="6">
                91
              </van-col>
              <van-col span="6">
                85
              </van-col>
              <van-col span="6">
                85
              </van-col>
            </van-row>
            <van-row class="item">
              <van-col span="6">
                新材料厂
              </van-col>
              <van-col span="6">
                83
              </van-col>
              <van-col span="6">
                91
              </van-col>
              <van-col span="6">
                91
              </van-col>
            </van-row>
          </div>
        </van-tab>
      </van-tabs>
    <div class="content">
      <div class="content-title">生产运行</div>
      <van-row>
        <van-col span="6" v-for="(item, index) in nav" :key="index">
          <div class="nav" @click="toPage(item.router)">
            <div class="nav-image">
              <img :src="require(`@/assets/images/nav_${index}.svg`)" alt />
            </div>
            <div class="nav-text">{{ item.text }}</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="content">
      <div class="content-title">安全环保</div>
      <van-tabs
        color="#33A4E8"
        title-inactive-color="#333333"
        title-active-color="#33A4E8"
      >
        <div slot="nav-rights" class="nav-right" @click="toPage('./shebei')">
          <van-icon name="bars" size="20px" />
        </div>
        <van-tab
          v-for="index in 8"
          :key="index"
          :title="'岗位' + index"
          class="tabs-box"
        >
          <div class="tabs-box-item" v-for="index in 3" :key="index">
            <Liquidfill :type="index"></Liquidfill>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <div class="content">
      <div class="content-title">重要设备状态</div>
      <van-tabs
        color="#33A4E8"
        title-inactive-color="#333333"
        title-active-color="#33A4E8"
      >
        <div slot="nav-rights" class="nav-right" @click="toPage('./shebei')">
          <van-icon name="bars" size="20px" />
        </div>
        <van-tab
          v-for="index in 8"
          :key="index"
          :title="'设备' + index"
          class="tabs-box"
        >
          <ActionBar></ActionBar>
          <div class="tabs-box-item">
            <Panel name="温度" value="155℃"></Panel>
          </div>
          <div class="tabs-box-item">
            <Panel name="压力" value="61 Pa"></Panel>
          </div>
          <div class="tabs-box-item">
            <Panel name="液位" value="329M"></Panel>
          </div>
          <div class="tabs-box-item">
            <Panel2 :type="index"></Panel2>
          </div>
        </van-tab>
      </van-tabs>
    </div> -->
    <!-- <div class="content">
      <div class="content-title">启停时间</div>
      <SelectTime v-model="date_1"></SelectTime>
      <div>
        <LineChart></LineChart>
      </div>
    </div>
    <div class="content">
      <div class="content-title">液位历史曲线</div>
      <SelectTime v-model="date_2"></SelectTime>
      <div>
        <LineCharts></LineCharts>
      </div>
    </div> -->
  </div>
</template>

<script>
import Liquidfill from "./components/Liquidfill";
import Panel from "../components/Panel";
import Panel2 from "../components/Panel2";
import ActionBar from "../components/ActionBar";
import SelectTime from "./components/SelectTime";
import LineChart from "./components/LineChart";
import LineCharts from "./components/LineCharts";
export default {
  name: "home",
  components: {
    Liquidfill,
    Panel,
    Panel2,
    ActionBar,
    SelectTime,
    LineChart,
    LineCharts
  },
  data() {
    return {
      nav: [
        {
          text: "动力中心",
          color: "rgba(23, 193, 149, 0.1)",
          router: "./dongli?from=index"
        },
        {
          text: "烧碱",
          color: "rgba(238, 116, 95, 0.1)",
          router: "./shaojian"
        },
        {
          text: "新材料",
          color: "rgba(78,169,232,0.1)",
          router: "./gongyi"
        },
        {
          text: "硫酸",
          color: "rgba(96,150,248,0.1);",
          router: "./liusuan"
        },
        {
          text: "脂肪醇",
          color: "rgba(237, 246, 252, 1)",
          router: "./zhifangchun"
        }
      ],
      date_1: new Date(),
      date_2: new Date()
    };
  },
  mounted(){
    this.$nextTick(() => {
      let dongli = this.$echarts.init(document.getElementById('dongli'))
      this.drawRing(dongli,'动力中心','73.32%')
      let liusuan = this.$echarts.init(document.getElementById('liusuan'))
      this.drawRing(liusuan,'硫酸厂','73.32%')
      let shaojian = this.$echarts.init(document.getElementById('shaojian'))
      this.drawRing(shaojian,'烧碱厂','73.32%')
      let xincailiao = this.$echarts.init(document.getElementById('xincailiao'))
      this.drawRing(xincailiao,'新材料厂','73.32%')
      let chunjinsuan = this.$echarts.init(document.getElementById('chunjinsuan'))
      this.drawRing(chunjinsuan,'淳进酸','73.32%')
      let suanshuijie = this.$echarts.init(document.getElementById('suanshuijie'))
      this.drawRing(suanshuijie,'酸水解','73.32%')
      let suanzhengliu = this.$echarts.init(document.getElementById('suanzhengliu'))
      this.drawRing(suanzhengliu,'酸蒸馏','73.32%')
      
    });
  },
  methods: {
    changeTab(e){
      if(e==2){
        this.$nextTick(() => {
          let so2 = this.$echarts.init(document.getElementById('so2'))
          this.drawRing(so2,'2#排放口SO2','10.94%','35mg/Nm³')
          let nox = this.$echarts.init(document.getElementById('nox'))
          this.drawRing(nox,'3#排放口NOX','35.23%','50mg/Nm³')
          let yanchen = this.$echarts.init(document.getElementById('yanchen'))
          this.drawRing(yanchen,'4#排放口烟尘','2.48%','20mg/Nm³')
          let cod = this.$echarts.init(document.getElementById('cod'))
          this.drawRing(cod,'污水口COD排放','421.38','500mg/Nm³')

          let andan = this.$echarts.init(document.getElementById('andan'))
          this.drawRing(andan,'污水口氨氮排放','1.42','35mg/L')
          let ph = this.$echarts.init(document.getElementById('ph'))
          this.drawRing(ph,'污水口PH排放','8.31','6-9')
          let voc = this.$echarts.init(document.getElementById('voc'))
          this.drawRing(voc,'三废VOC(NMHC)','98','120')
        })
      }
    },
    drawRing(obj,title,value,level){
      let graphic = []
      if(level){
        graphic = [{
            type:'text',
            left:'center',
            top:'35%',
            style:{
                text:value+'\n标准值:\n'+level,
                textAlign:'center',
                fill:'#000',
                font: '0.6em "STHeiti", sans-serif'
            }
        },{
            type:'text',
            left:'center',
            top:'85%',
            style:{
                text:title,
                textAlign:'center',
                fill:'#000',
                font: '0.6em "STHeiti", sans-serif'
            }
        }]
      }else{
        graphic = [{
            type:'text',
            left:'center',
            top:'40%',
            style:{
                text:value+'\n生产负荷',
                textAlign:'center',
                fill:'#000',
                font: '0.6em "STHeiti", sans-serif'
            }
        },{
            type:'text',
            left:'center',
            top:'90%',
            style:{
                text:title,
                textAlign:'center',
                fill:'#000',
                font: '0.6em "STHeiti", sans-serif'
            }
        }]
      }
      obj.setOption({
        graphic:graphic,
        series: [
            {   
                startAngle:'0',
                name:'访问来源',
                type:'pie',
                animation:false,
                radius: ['65%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:150, name:'直接访问',itemStyle:{
                        color:'#979797'
                    }},
                    {value:300, name:'邮件营销',itemStyle:{
                            color:'#ffffff'
                        }},
                    {value:750, name:'邮件营销',
                    itemStyle:{
                        color:'#3C54CA'
                    }
                    },
                ]
            }
        ]
      })
      // let option={
        
      // }
    },
    // 退出
    signOut() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "请确认是否退出登录"
        })
        .then(() => {
          localStorage.removeItem("JiaHuaSessionId");
          localStorage.removeItem("JiaHuaOfficeCode");
          localStorage.removeItem("JiaHuaUserName");
          localStorage.removeItem("JiaHuaOfficeName");
          this.$router.replace({
            path: "/login"
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    toPage(router) {
      this.$router.push({ path: router });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: #f5f5f5;
  .content {
    width: 100%;
    margin-top: 24px;
    background: #ffffff;
    .content-title {
      padding: 16px 30px;
      font-size: 30px;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 42px;
      border-bottom: 1px solid #fafafa;
    }
    .nav {
      padding: 17px;
      text-align: center;
      .nav-image {
        margin: 0 auto;
        width: 113px;
        height: 113px;
        border-radius: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nav-text {
        margin-top: 8px;
        font-size: 26px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 37px;
      }
    }
    .van-tabs__nav--line {
      width: calc(100% - 50px);
    }
    .nav-right {
      width: 100px;
      height: 88px;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tabs-box {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      .tabs-box-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0 30px 0;
      }
    }
  }
}
.van-tab__pane{
  background: #fff;
  padding: 10px 0;
}
.safeMsg{
  width:94%;
  background: #5677FC;
  border-radius: 10px;
  padding: 3%;
  margin: 0 auto;
  .tip{
    color:#fff;
    font-weight: bold;
    font-size:0.86875rem;
  }
}
.tszyBox{
  width:94%;
  background: #5677FC;
  border-radius: 10px;
  padding: 3%;
  margin: 10px auto 0;
  .title{
    color:#fff;
    font-weight: bold;
    font-size:0.86875rem;
    padding-bottom: 3%;
    margin-bottom: 3%;
    border-bottom: 1px solid #fff;
  }
  .van-col{
    text-align: center;
    img{
      width:56px;
      height:56px;
    }
  }
  .tip{
    color:#fff;
    font-weight: bold;
    font-size:0.86875rem;
    .van-col--8{
      height: auto;
    }
    p{
      text-align: center
    }
  }
}
.proporty{
  .head{
    color:#666666;
    font-size:14px;
    text-align: center;
    width: 90%;
    margin: 0 auto;
  }
  .item{
    font-size: 0.46875rem;
    font-weight: bold;
    color: #ffffff;
    background: #5677FC;
    width: 90%;
    padding: 3% 0;
    margin: 20px auto 0;
    text-align: center;
    border-radius: 10px;
    .van-col--8{
      height: 16px;
      line-height: 16px;
    }
    .van-col--6{
      height: 16px;
      line-height: 16px;
    }
  }
}
.fixed-first {
  margin-top: 46px;
}
.rongliang{
  margin-top: 30px;
  .box{
    width:30%;
    float:left;
    margin: 20px 0 0 2.5%;
    border-radius: 10px;
    padding:3%;
    color: #ffffff;
    background: #5677FC;
    p{
      margin: 0;
    }
    .p1{
      font-size: 40px;
      font-weight: bold;
      span{
        font-size:14px;
        font-weight:normal;
        margin-left: 5px
      }
    }
    .p2{
      font-size: 14px
    }
  }
}
.navbar {
  z-index: 99 !important;
}
</style>
