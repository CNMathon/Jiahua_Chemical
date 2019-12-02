<template>
  <div class="home">
    <van-nav-bar title="首页" fixed class="navbar">
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
    <van-skeleton title :row="3" class="fixed-first" :loading="isLoading">
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
        <van-tab title="生产" class="tabs-box">
          <div>
            <van-row>
              <van-col span="6">
                <!-- <div style="width:100%;height:100px" id="dongli"></div> -->
                <div style="width:100%;height:100px" id="dongli-fix"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="shaojian"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="chunjinsuan"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="suanshuijie"></div>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="6">
                <div style="width:100%;height:100px" id="suanzhengliu"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="liusuan"></div>
              </van-col>
              <van-col span="6">
                <div style="width:100%;height:100px" id="xincailiao"></div>
              </van-col>
              <van-col span="6"></van-col>
            </van-row>
            <!-- 数据面板 -->
            <div class="rongliang">
              <div class="box" v-for="(item, index) in dataPanel" :key="index">
                <p class="p1">
                  <span>{{item.value}}</span>
                  <span>{{item.unit}}</span>
                </p>
                <p class="p2">{{item.text}}</p>
              </div>
              <div style="clear:both"></div>
            </div>
          </div>
        </van-tab>
        <van-tab title="安全" class="tabs-box">
          <div class="safeMsg">
            <van-row class="tip">
              <van-col span="11">当日承包商数量：{{this.cbsCount.cbscount}}</van-col>
              <van-col style="text-align:right" span="13">当日承包商人员数量：{{cbsCount.cbsrycount}}</van-col>
            </van-row>
          </div>
          <div class="tszyBox">
            <div class="title">当日公司特殊作业</div>
            <van-row class="tip">
              <van-col span="6" v-for="(item, index) in spWork" :key="index">
                <p>{{item.text}}</p>
                <p>{{item.value}}</p>
              </van-col>
            </van-row>
          </div>
          <div class="tszyBox">
            <div class="title">重大危险源监控</div>
            <van-row class="tip">
              <van-col span="8" @click="jumpTo('/page_1/danger/sj')">
                <img src="img/nav_1.ffd7a07c.svg" />
                <p>烧碱</p>
              </van-col>
              <van-col span="8" @click="jumpTo('/page_1/danger/xcl')">
                <img src="img/nav_2.3c77d78b.svg" />
                <p>新材料</p>
              </van-col>
              <van-col span="8" @click="jumpTo('/page_1/danger/ls')">
                <img src="img/nav_3.6e07cf35.svg" />
                <p>硫酸</p>
              </van-col>
            </van-row>
          </div>
          <div class="tszyBox">
            <div class="title">重点监管的危险化工工艺</div>
            <van-row class="tip">
              <van-col span="8">
                <img src="img/nav_1.ffd7a07c.svg" />
                <p>烧碱</p>
              </van-col>
              <van-col span="8">
                <img src="img/nav_2.3c77d78b.svg" />
                <p>新材料</p>
              </van-col>
              <van-col span="8">
                <img src="img/nav_3.6e07cf35.svg" />
                <p>硫酸</p>
              </van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab title="环保" class="tabs-box">
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
            <van-col span="6"></van-col>
          </van-row>
        </van-tab>
        <van-tab title="能源" class="tabs-box"></van-tab>
        <van-tab title="质量" class="tabs-box">
          <div class="proporty">
            <van-row class="head">
              <van-col span="8">分厂名称</van-col>
              <van-col span="8">原材料合格率(%)</van-col>
              <van-col span="8">产品合格率(%)</van-col>
            </van-row>
            <van-row class="item" v-for="(item, index) in sql2Data" :key="index">
              <van-col span="8">{{item.name}}</van-col>
              <van-col span="8">{{item.allRate1 * 100}}</van-col>
              <van-col span="8">{{item.allRate2 * 100}}</van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab title="设备" class="tabs-box">
          <div class="proporty">
            <van-row class="head">
              <van-col span="6">分厂名称</van-col>
              <van-col span="6">特种设备数量</van-col>
              <van-col span="6">关键设备数量</van-col>
              <van-col span="6">主要设备数量</van-col>
            </van-row>
            <van-row class="item">
              <van-col span="6">动力中心</van-col>
              <van-col span="6">80</van-col>
              <van-col span="6">79</van-col>
              <van-col span="6">79</van-col>
            </van-row>
            <van-row class="item">
              <van-col span="6">烧碱厂</van-col>
              <van-col span="6">79</van-col>
              <van-col span="6">59</van-col>
              <van-col span="6">59</van-col>
            </van-row>
            <van-row class="item">
              <van-col span="6">脂肪醇厂</van-col>
              <van-col span="6">97</van-col>
              <van-col span="6">92</van-col>
              <van-col span="6">92</van-col>
            </van-row>
            <van-row class="item">
              <van-col span="6">硫酸厂</van-col>
              <van-col span="6">91</van-col>
              <van-col span="6">85</van-col>
              <van-col span="6">85</van-col>
            </van-row>
            <van-row class="item">
              <van-col span="6">新材料厂</van-col>
              <van-col span="6">83</van-col>
              <van-col span="6">91</van-col>
              <van-col span="6">91</van-col>
            </van-row>
          </div>
        </van-tab>
      </van-tabs>
      <div class="content">
        <div class="content-title">生产运行 (嘉化能源)</div>
        <van-row>
          <van-col span="6" v-for="(item, index) in nav1" :key="index">
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
        <div class="content-title">生产运行 (嘉福新材料)</div>
        <van-row>
          <van-col span="6" v-for="(item, index) in nav2" :key="index">
            <div class="nav" @click="jumpTo(item.router, item.query)">
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
        <div class="ball-area">
          <!-- <div slot="nav-rights" class="nav-right" @click="toPage('./shebei')">
            <van-icon name="bars" size="20px" />
          </div>-->
          <div class="tabs-box-item" v-for="(item, index) in ballData" :key="index">
            <Liquidfill :type="index" :value="item"></Liquidfill>
          </div>
        </div>
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
      </div>-->
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
      </div>-->
    </van-skeleton>
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
import { business } from "@/mixin/business";
export default {
  mixins: [business],
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
      isLoading: true,
      nav1: [
        {
          text: "动力中心",
          color: "rgba(23, 193, 149, 0.1)",
          router: "./dongli?from=index"
        },
        {
          text: "烧碱厂",
          color: "rgba(238, 116, 95, 0.1)",
          router: "./shaojian"
        },
        {
          text: "脂肪醇",
          color: "rgba(237, 246, 252, 1)",
          router: "./zhifangchun"
        }
      ],
      nav2: [
        {
          text: "新材料",
          color: "rgba(78,169,232,0.1)",
          router: "./gongyi",
          query: {}
        },
        {
          text: "硫酸",
          color: "rgba(96,150,248,0.1);",
          router: "./liusuan_1",
          query: {
            mode: 2
          }
        }
      ],
      dataPanel: [
        {
          text: "总产汽",
          enText: "DLZX_ZCQ",
          value: "",
          unit: "t/h"
        },
        {
          text: "外供蒸汽",
          enText: "DLZX_WGZQ",
          value: "",
          unit: "t/h"
        },
        {
          text: "外销蒸汽",
          enText: "DLZX_WXZQ",
          value: "",
          unit: "t/h"
        },
        {
          text: "烧碱A套电流",
          enText: "SJC_ADL",
          value: "",
          unit: "KA"
        },
        {
          text: "烧碱B套电流",
          enText: "SJC_BDL",
          value: "",
          unit: "KA"
        },
        {
          text: "醇进酸流量",
          enText: "ZFCC_FIC1325",
          value: "",
          unit: "kg/h"
        },
        {
          text: "酸水解流量",
          enText: "ZFCC_ZFCCSSJ",
          value: "",
          unit: "kg/h"
        },
        {
          text: "酸蒸馏流量",
          enText: "ZFCC_FIC0501",
          value: "",
          unit: "kg/h"
        },
        {
          text: "硫酸风机转速",
          enText: "LSC_SITS_1701",
          value: "",
          unit: "rpm"
        },
        {
          text: "新材料甲苯",
          enText: "XCLC_XCLCJBZL",
          value: "",
          unit: "kg/h"
        }
      ],
      chartPanel: [
        {
          id: "dongli",
          text: "动力中心",
          enText: "DLZX_DLZXFH",
          value: 0,
          level: ""
        },
        {
          id: "shaojian",
          text: "烧碱厂",
          enText: "SJC_SJCFH",
          value: 0,
          level: ""
        },
        {
          id: "chunjinsuan",
          text: "醇进酸",
          enText: "ZFCC_ZFCCCJSFH",
          value: 0,
          level: ""
        },
        {
          id: "suanshuijie",
          text: "酸水解",
          enText: "ZFCC_ZFCCSSJFH",
          value: 0,
          level: ""
        },
        {
          id: "suanzhengliu",
          text: "酸蒸馏",
          enText: "ZFCC_ZFCCSZLFH",
          value: 0,
          level: ""
        },
        {
          id: "liusuan",
          text: "硫酸厂",
          enText: "LSC_LSCFH",
          value: 0,
          level: ""
        },
        {
          id: "xincailiao",
          text: "新材料厂",
          enText: "XCLC_XCLCFH",
          value: 0,
          level: ""
        }
      ],
      envChartPanel: [
        {
          id: "so2",
          text: "2#排放口SO2",
          enText: "HB_2SO2PJZ",
          value: 0,
          level: "35mg/Nm³"
        },
        {
          id: "nox",
          text: "3#排放口NOX",
          enText: "HB_3NOXPJZ",
          value: 0,
          level: "50mg/Nm³"
        },
        {
          id: "yanchen",
          text: "4#排放口烟尘",
          enText: "HB_4FCPJZ",
          value: 0,
          level: "20mg/Nm³"
        },
        {
          id: "cod",
          text: "污水口COD排放",
          enText: "HB_CODPJZ",
          value: 0,
          level: "500mg/Nm³"
        },
        {
          id: "andan",
          text: "污水口氨氮排放",
          enText: "HB_ADPJZ",
          value: 0,
          level: "35mg/L"
        },
        {
          id: "ph",
          text: "污水口PH排放",
          enText: "HB_PHPJZ",
          value: 0,
          level: "6-9"
        },
        {
          id: "voc",
          text: "三废VOC(NMHC)",
          enText: "HB_VOCPJZ",
          value: 0,
          level: "120"
        }
      ],
      sql2Data: [
        {
          name: "动力中心",
          allNum: "239",
          num1: "0",
          num2: "16",
          num3: "17",
          num4: "175",
          num5: "0",
          rate1: "0",
          rate2: "0.067",
          rate3: "0.071",
          rate4: "0.732",
          rate5: "0",
          allRate1: "0.87",
          allRate2: "0"
        },
        {
          name: "硫酸厂",
          allNum: "102",
          num1: "0",
          num2: "58",
          num3: "9",
          num4: "31",
          num5: "0",
          rate1: "0",
          rate2: "0.569",
          rate3: "0.088",
          rate4: "0.304",
          rate5: "0",
          allRate1: "0.961",
          allRate2: "0"
        },
        {
          name: "烧碱厂",
          allNum: "213",
          num1: "0",
          num2: "119",
          num3: "0",
          num4: "59",
          num5: "0",
          rate1: "0",
          rate2: "0.559",
          rate3: "0",
          rate4: "0.277",
          rate5: "0",
          allRate1: "0.836",
          allRate2: "0"
        },
        {
          name: "新材料厂",
          allNum: "294",
          num1: "94",
          num2: "2",
          num3: "0",
          num4: "99",
          num5: "0",
          rate1: "0.32",
          rate2: "0.007",
          rate3: "0",
          rate4: "0.337",
          rate5: "0",
          allRate1: "0.663",
          allRate2: "0"
        },
        {
          name: "脂肪醇厂",
          allNum: "150",
          num1: "0",
          num2: "36",
          num3: "0",
          num4: "91",
          num5: "0",
          rate1: "0",
          rate2: "0.24",
          rate3: "0",
          rate4: "0.607",
          rate5: "0",
          allRate1: "0.847",
          allRate2: "0"
        }
      ],
      spWork: [
        {
          text: "动火作业",
          value: 0
        },
        {
          text: "盲板抽堵",
          value: 0
        },
        {
          text: "受限空间",
          value: 0
        },
        {
          text: "高处作业",
          value: 0
        },
        {
          text: "动土作业",
          value: 0
        },
        {
          text: "断路作业",
          value: 0
        },
        {
          text: "临时用电",
          value: 0
        },
        {
          text: "吊装作业",
          value: 0
        }
      ],
      cbsCount: {
        cbscount: 0,
        cbsrycount: 0
      },
      date_1: new Date(),
      date_2: new Date(),
      ballData: [0, 0, 0,0]
      // ballData: {
      //   pxhg: 0,
      //   czsg: 0,
      //   yhzg: 0,
      //   dbpfhg: 0
      // }
    };
  },
  mounted() {},
  methods: {
    testme() {
      this.ballData = [1,0.5,0.84,0.32]
      console.log(this.ballData)
    },
    // chartPanel 初始化
    // => 参数1 => chartPanel数据结构 => Array
    echartDrawRing(arr) {
      console.log("arr", arr);
      arr.map(item => {
        this.$nextTick(() =>
          this.drawRing(
            this.$echarts.init(document.getElementById(item.id)),
            item.text,
            this.toPercent(item.value / 100, 2),
            item.level
          )
        );
      });
    },
    changeTab(e) {
      if (e == 2) {
        this.echartDrawRing(this.envChartPanel, true);
      }
    },
    drawRing(obj, title, value, level) {
      let graphic = [];
      if (level) {
        let str = value.replace(/%/g, "");
        graphic = [
          {
            type: "text",
            left: "center",
            top: "35%",
            style: {
              text: str + "\n标准值:\n" + level,
              textAlign: "center",
              fill: "#000",
              font: '0.6em "STHeiti", sans-serif'
            }
          },
          {
            type: "text",
            left: "center",
            top: "85%",
            style: {
              text: title,
              textAlign: "center",
              fill: "#000",
              font: '0.6em "STHeiti", sans-serif'
            }
          }
        ];
      } else {
        graphic = [
          {
            type: "text",
            left: "center",
            top: "40%",
            style: {
              text: value + "\n生产负荷",
              textAlign: "center",
              fill: "#000",
              font: '0.6em "STHeiti", sans-serif'
            }
          },
          {
            type: "text",
            left: "center",
            top: "90%",
            style: {
              text: title,
              textAlign: "center",
              fill: "#000",
              font: '0.6em "STHeiti", sans-serif'
            }
          }
        ];
      }
      obj.setOption({
        graphic: graphic,
        series: [
          {
            startAngle: "0",
            name: "访问来源",
            type: "pie",
            animation: true,
            radius: ["65%", "80%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              // 1.20
              {
                value: 0.125,
                name: "剩余值",
                itemStyle: {
                  color: "#979797"
                }
              },
              {
                value: 0.25,
                name: "模拟空白",
                itemStyle: {
                  color: "#ffffff"
                }
              },
              {
                value: 0.625,
                name: "有效值",
                itemStyle: {
                  color: "#3C54CA"
                }
              }
            ]
          }
        ]
      });
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
    },
    getPageList() {
      let tagNames = [];
      let finishCount = 0;
      this.isLoading = false;

      // let promise = new Promise((resolve, reject) => {
      //   if (finishCount == 3) {
      //     resolve(); // pending ——> resolved 参数将传递给对应的回调方法
      //   } else {
      //     reject(); // pending ——> rejectd
      //   }
      // });

      // promise.then(() => console.log('ok'))

      // 拼接查询参数
      this.dataPanel.map(item => tagNames.push(item.enText));
      this.chartPanel.map(item => tagNames.push(item.enText));
      this.envChartPanel.map(item => tagNames.push(item.enText));

      console.log(tagNames);
      console.log(String(tagNames));

      // 动力中心 - fix
      this.$api.page_1.sipV1Sql1().then(res => {
        console.log(`动力中心fix: `, res);
        let arr = [
          {
            id: "dongli-fix",
            value: res.value
          }
        ];
        finishCount++;
        // let res_dataPanel = res.filter((item, index) => index <= 9);
        // let res_chartPanel = res.filter(
        //   (item, index) => index > 9 && index <= 16
        // );
        // let res_envChartPanel = res.filter((item, index) => index > 16);
        // console.log("res_dataPanel", res_dataPanel);
        // console.log("res_chartPanel", res_chartPanel);
        // console.log("res_envChartPanel", res_envChartPanel);

        res_dataPanel.map(
          (item, index) =>
            (this.dataPanel[index].value = item.Value.toFixed(2))
        );
        res_chartPanel.map(
          (item, index) =>
            (this.chartPanel[index].value = item.Value.toFixed(2))
        );
        res_envChartPanel.map(
          (item, index) =>
            (this.envChartPanel[index].value = item.Value.toFixed(2))
        );
        this.echartDrawRing(arr);
      });

      this.$api.page_1.sipV1Sql2().then(res => {
        console.log(`sql2: `, res);
        this.sql2Data = res;
      });

      this.$api.page_1
        .getRtMonTagInfosByNames({
          tagNames: String(tagNames)
        })
        .then(res => {
          console.log(res);
          finishCount++;
          let res_dataPanel = res.filter((item, index) => index <= 9);
          let res_chartPanel = res.filter(
            (item, index) => index > 9 && index <= 16
          );
          let res_envChartPanel = res.filter((item, index) => index > 16);
          console.log("res_dataPanel", res_dataPanel);
          console.log("res_chartPanel", res_chartPanel);
          console.log("res_envChartPanel", res_envChartPanel);

          res_dataPanel.map(
            (item, index) =>
              (this.dataPanel[index].value = item.Value.toFixed(2))
          );
          res_chartPanel.map(
            (item, index) =>
              (this.chartPanel[index].value = item.Value.toFixed(2))
          );
          res_envChartPanel.map(
            (item, index) =>
              (this.envChartPanel[index].value = item.Value.toFixed(2))
          );
          this.echartDrawRing(this.chartPanel);
        });
      this.$api.page_1.hsezyCount().then(res => {
        finishCount++;
        console.log("res_zyCount", res);
        this.spWork[0].value = res.dhzyCount;
        this.spWork[1].value = res.mbzyCount;
        this.spWork[2].value = res.sxkjCount;
        this.spWork[3].value = res.gczyCount;
        this.spWork[4].value = res.dtzyCount;
        this.spWork[5].value = res.dlzyCount;
        this.spWork[6].value = res.lsydcount;
        this.spWork[7].value = res.dzzyCount;
      });

      this.$api.page_1.hseCBSCount().then(res => {
        finishCount++;
        console.log("res_CBSCount", res);
        this.cbsCount.cbscount = res.cbscount;
        this.cbsCount.cbsrycount = res.cbsrycount;
      });

      // this.$api.page_1.dpJhyhzgl().then(res => {
      //   console.log(`ballData-yhzg`, res.split(":"));
      //   ballData[0] = res.split(":");
      // });

      // this.$api.page_1.dpJhpxhgl().then(res => {
      //   console.log(`ballData-pxhg`, res.split(":"));
      //   ballData[1] = res.split(":");
      // });

      // this.$api.page_1.dpCzsgl().then(res => {
      //   console.log(`ballData-czsg`, res.split(":"));
      //   ballData[2] = res.split(":");
      // });
    }
  },
  created() {
    this.getPageList();
  }
};
</script>

<style lang="scss" scoped>
.home {
  // background-color: #f5f5f5;
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
.van-tab__pane {
  background: #fff;
  padding: 10px 0;
}
.safeMsg {
  width: 94%;
  background: #5677fc;
  border-radius: 10px;
  padding: 3%;
  margin: 0 auto;
  .tip {
    color: #fff;
    font-weight: bold;
    font-size: 0.86875rem;
  }
}
.tszyBox {
  width: 94%;
  background: #5677fc;
  border-radius: 10px;
  padding: 3%;
  margin: 10px auto 0;
  .title {
    color: #fff;
    font-weight: bold;
    font-size: 0.86875rem;
    padding-bottom: 3%;
    margin-bottom: 3%;
    border-bottom: 1px solid #fff;
  }
  .van-col {
    text-align: center;
    img {
      width: 56px;
      height: 56px;
    }
  }
  .tip {
    color: #fff;
    font-weight: bold;
    font-size: 0.86875rem;
    .van-col--8 {
      height: auto;
    }
    p {
      text-align: center;
    }
  }
}
.proporty {
  .head {
    color: #666666;
    font-size: 14px;
    text-align: center;
    width: 90%;
    margin: 0 auto;
  }
  .item {
    font-size: 0.46875rem;
    font-weight: bold;
    color: #ffffff;
    background: #5677fc;
    width: 90%;
    padding: 3% 0;
    margin: 20px auto 0;
    text-align: center;
    border-radius: 10px;
    .van-col--8 {
      height: 16px;
      line-height: 16px;
    }
    .van-col--6 {
      height: 16px;
      line-height: 16px;
    }
  }
}
.fixed-first {
  margin-top: 46px;
}
.rongliang {
  margin-top: 30px;
  .box {
    width: 30%;
    float: left;
    margin: 20px 0 0 2.5%;
    border-radius: 10px;
    padding: 3%;
    color: #ffffff;
    background: #5677fc;
    p {
      margin: 0;
    }
    .p1 {
      display: flex;
      justify-content: space-between;
      font-size: 40px;
      font-weight: bold;
      span:nth-child(1) {
        font-size: 30px;
        font-weight: bold;
      }
      span:nth-child(2) {
        font-size: 20px;
        font-weight: normal;
      }
    }
    .p2 {
      font-size: 14px;
    }
  }
}
.navbar {
  z-index: 99 !important;
}
.ball-area {
  display: flex;
  justify-content: space-around;
}
</style>
