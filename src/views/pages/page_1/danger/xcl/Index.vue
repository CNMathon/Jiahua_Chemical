<template>
  <div class="tempalta">
    <van-nav-bar title="新材料厂" left-text="返回" left-arrow @click-left="pageBack" fixed />
    <van-tabs color="#6096F8" v-model="tabActive_1" class="fixed-first-tab">
      <van-tab title="生产单元">
        <van-tabs color="#6096F8" v-model="tabActive_1_1" type="card" class="sub-tab">
          <van-tab title="NMST-氯甲烷">
            <div class="tab-content">
              <div class="content">
                <div class="content-title">实时视频</div>
                <Video></Video>
                <div class="panel-list">
                  <div class="panel-list-item" v-for="item in panelInfo_tab1">
                    <Panel :name="item.itemName" :unit="item.unit" :value="item.value"  size="big"></Panel>
                  </div>
                </div>
              </div>
              <div class="content">
                <div class="content-title">液位历史曲线</div>
                <LineCharts></LineCharts>
              </div>
              <div class="content">
                <div class="content-title">可燃有毒气体</div>
                <item-card :info="cardInfo_tab1" />
              </div>
            </div>
          </van-tab>
          <van-tab title="NMST-发烟硝酸">
            <div class="tab-content">
              <div class="content">
                <div class="content-title">实时视频</div>
                <Video></Video>
                <div class="panel-list">
                  <div class="panel-list-item" v-for="item in panelInfo_tab2">
                    <Panel :name="item.itemName" :unit="item.unit" :value="item.value"  size="big"></Panel>
                  </div>
                </div>
              </div>
              <div class="content">
                <div class="content-title">液位历史曲线</div>
                <LineCharts></LineCharts>
              </div>
              <div class="content">
                <div class="content-title">可燃有毒气体</div>
                <item-card :info="cardInfo_tab2" />
              </div>
            </div>
          </van-tab>
          <van-tab title="NMST-乙醇">NMST-乙醇</van-tab>
        </van-tabs>
      </van-tab>
      <van-tab title="储存单元">
        <van-tabs color="#6096F8" v-model="tabActive_1_1" type="card" class="sub-tab">
          <van-tab title="罐组一甲苯">
            <div class="tab-content">
              <div class="content">
                <div class="content-title">实时视频</div>
                <Video></Video>
                <div class="panel-list">
                  <div class="panel-list-item" v-for="item in panelInfo_tab4">
                    <Panel :name="item.itemName" :unit="item.unit" :value="item.value"  size="big"></Panel>
                  </div>
                </div>
              </div>
              <div class="content">
                <div class="content-title">液位历史曲线</div>
                <LineCharts></LineCharts>
              </div>
              <div class="content">
                <div class="content-title">可燃有毒气体</div>
                <item-card :info="cardInfo_tab4" />
              </div>
            </div>
          </van-tab>
          <van-tab title="罐组一发烟硝酸">
            <div class="tab-content">
              <div class="content">
                <div class="content-title">实时视频</div>
                <Video></Video>
                <div class="panel-list">
                  <div class="panel-list-item" v-for="item in panelInfo_tab5">
                    <Panel :name="item.itemName" :unit="item.unit" :value="item.value"  size="big"></Panel>
                  </div>
                </div>
              </div>
              <div class="content">
                <div class="content-title">液位历史曲线</div>
                <LineCharts></LineCharts>
              </div>
              <div class="content">
                <div class="content-title">可燃有毒气体</div>
                <item-card :info="cardInfo_tab5" />
              </div>
            </div>
          </van-tab>
          <van-tab title="罐组二发烟硝酸">
            <div class="tab-content">
              <div class="content">
                <div class="content-title">实时视频</div>
                <Video></Video>
                <div class="panel-list">
                  <div class="panel-list-item" v-for="item in panelInfo_tab6">
                    <Panel :name="item.itemName" :unit="item.unit" :value="item.value"  size="big"></Panel>
                  </div>
                </div>
              </div>
              <div class="content">
                <div class="content-title">液位历史曲线</div>
                <LineCharts></LineCharts>
              </div>
              <div class="content">
                <div class="content-title">可燃有毒气体</div>
                <item-card :info="cardInfo_tab5" />
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Panel from "@/views/pages/page_1/components/Panel";
import ItemCard from "./components/ItemCard";
import LineCharts from "@/views/pages/page_1/Index/components/LineCharts.vue";
import Video from "./components/Video";
export default {
  name: "tempaltaPage",
  components: {
    Panel,
    LineCharts,
    Video,
    ItemCard
  },
  data() {
    return {
      title: "加载中",
      panelInfo_tab1: [
        {
          itemName: "氯甲烷储罐V1057氯甲烷温度",
          enName: "XCLC_TIA_V1057",
          value: ''
        },
        {
          itemName: "氯甲烷缓冲罐V1059内氯甲烷压力",
          enName: "XCLC_PICA_V1059",
          value: ''
        },
        {
          itemName: "氯甲烷储罐V1057氯甲烷液位",
          enName: "XCLC_LI_V1057",
          value: ''
        }
      ],
      panelInfo_tab2: [
        {
          itemName: "2#浓硝酸储槽V1220压力",
          enName: "XCLC_PIA_V1220",
          value: ''
        },
        {
          itemName: "浓硝酸储罐V1205A罐内液位",
          enName: "XCLC_LIA_V1206A",
          value: ''
        },
        {
          itemName: "浓硝酸储罐V1205B罐内液位",
          enName: "XCLC_LIA_V1206B",
          value: ''
        }
      ],
      panelInfo_tab4: [
        {
          itemName: "甲苯储罐V1201甲苯温度",
          enName: "XCLC_TI_V1201",
          value: ''
        },
        {
          itemName: "来自罐区甲苯总管甲苯压力",
          enName: "XCLC_PI_0100",
          value: ''
        },{
          itemName: "甲苯储罐V1201液位",
          enName: "XCLC_LIA_V1201",
          value: ''
        }
      ],
      panelInfo_tab5: [
        {
          itemName: "硝酸储槽V1205AB压力",
          enName: "XCLC_PIA_V1205AB",
          value: ''
        },{
          itemName: "中和池V1026液位",
          enName: "XCLC_LIA_V1026",
          value: ''
        }
      ],
      panelInfo_tab6: [
        {
          itemName: "硝酸储槽V1205AB压力",
          enName: "XCLC_PIA_V1205AB",
          value: ''
        },{
          itemName: "中和池V1026液位",
          enName: "XCLC_LIA_V1026B",
          value: ''
        }
      ],
      cardInfo_tab1:[],
      cardInfo_tab2: [
        {
          itemName: "甲苯浓度",
          enName: "XCLC_AIA_1201",
          value: ''
        },
        {
          itemName: "甲苯﹑乙醇浓度",
          enName: "XCLC_AIA_1203",
          value: ''
        }
      ],
      cardInfo_tab4: [
        {
          itemName: "磺化一楼东V0104边甲苯浓度",
          enName: "XCLC_GT_01003",
          value: ''
        },
        {
          itemName: "磺化一楼西V0137AB南甲苯浓度",
          enName: "XCLC_GT_01002",
          value: ''
        },{
          itemName: "磺化二楼东甲苯浓度",
          enName: "XCLC_GT_01007",
          value: ''
        },{
          itemName: "磺化二楼西甲苯浓度",
          enName: "XCLC_GT_01006",
          value: ''
        },{
          itemName: "磺化三楼东甲苯浓度",
          enName: "XCLC_GT_01009",
          value: ''
        },{
          itemName: "磺化三楼西甲苯浓度",
          enName: "XCLC_GT_01008",
          value: ''
        },{
          itemName: "甲苯浓度显示",
          enName: "XCLC_AIA_1201",
          value: ''
        },{
          itemName: "磺化一楼X0108西甲苯浓度",
          enName: "XCLC_GT_01001",
          value: ''
        },{
          itemName: "磺化一楼V0139C边上甲苯浓度",
          enName: "XCLC_GT_01004",
          value: ''
        },{
          itemName: "磺化二楼R0109边上甲苯浓度",
          enName: "XCLC_GT_01005",
          value: ''
        },{
          itemName: "磺化二楼东P0105D南边甲苯浓度",
          enName: "XCLC_GT_01010",
          value: ''
        },{
          itemName: "磺化四楼西V0149边上甲苯浓度",
          enName: "XCLC_GT_01011",
          value: ''
        },{
          itemName: "磺化四楼东V0100南边甲苯浓度",
          enName: "XCLC_GT_01012",
          value: ''
        }
      ],
      cardInfo_tab5: [
        {
          itemName: "甲苯浓度A",
          enName: "XCLC_AIA_1201",
          value: ''
        },
        {
          itemName: "甲苯浓度B",
          enName: "XCLC_AIA_1203",
          value: ''
        }
      ],
      tabActive_1: 0,
      tabActive_1_1: 0
    };
  },
  created() {
    this.title = this.$route.query.title;
    let arr = []
    
    this.panelInfo_tab1.map(item => {
      arr.push(item.enName)
    })
    this.panelInfo_tab2.map(item => {
      arr.push(item.enName)
    })
    this.cardInfo_tab2.map(item => {
      arr.push(item.enName)
    })
    this.panelInfo_tab4.map(item => {
      arr.push(item.enName)
    })
    this.cardInfo_tab4.map(item => {
      arr.push(item.enName)
    })
    this.panelInfo_tab5.map(item => {
      arr.push(item.enName)
    })
    this.cardInfo_tab5.map(item => {
      arr.push(item.enName)
    })
    this.panelInfo_tab6.map(item => {
      arr.push(item.enName)
    })
    this.$api.page_1.getRtMonTagInfosByNames({
      tagNames: arr.join(','),
      __sid: localStorage.JiaHuaSessionId
    }).then((res)=>{
      res.forEach((item)=>{
        // this.cardInfo_tab1.forEach((items)=>{
        //   if(items.enName===item.Name){
        //     items.value = item.Value.toFixed(2)
        //     items.unit = item.Unit
        //   }
        // })
        this.panelInfo_tab1.forEach((items)=>{
          if(items.enName===item.Name){
            items.value = item.Value.toFixed(2)
            items.unit = item.Unit
          }
        })
        this.panelInfo_tab2.forEach((items)=>{
          if(items.enName===item.Name){
            items.value = item.Value.toFixed(2)
            items.unit = item.Unit
          }
        })
        this.cardInfo_tab2.forEach((items)=>{
          if(items.enName===item.Name){
            items.value = item.Value.toFixed(2)
            items.unit = item.Unit
          }
        })
        this.panelInfo_tab4.forEach((items)=>{
          if(items.enName===item.Name){
            items.value = item.Value.toFixed(2)
            items.unit = item.Unit
          }
        })
        this.cardInfo_tab4.forEach((items)=>{
          if(items.enName===item.Name){
            items.value = item.Value.toFixed(2)
            items.unit = item.Unit
          }
        })
        this.panelInfo_tab5.forEach((items)=>{
          if(items.enName===item.Name){
            items.value = item.Value.toFixed(2)
            items.unit = item.Unit
          }
        })
        this.cardInfo_tab5.forEach((items)=>{
          if(items.enName===item.Name){
            items.value = item.Value.toFixed(2)
            items.unit = item.Unit
          }
        })
        this.panelInfo_tab6.forEach((items)=>{
          if(items.enName===item.Name){
            items.value = item.Value.toFixed(2)
            items.unit = item.Unit
          }
        })
      })
    }).catch(() => this.$Toast.clear());
  },
  methods: {
    pageBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.tempalta {
  // background-color: #f5f5f5;
  .sub-tab {
    margin-top: 20px;
  }
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
    .panel-list {
      box-sizing: border-box;
      padding: 0 30px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px 30px;
      align-items: center;
      margin-top: 40px;
      padding-bottom: 40px;
      .panel-list-item {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .panel-list-item:nth-child(3n + 1) {
        margin-left: auto;
      }
      .panel-list-item:nth-child(3n + 3) {
        margin-right: auto;
      }
    }
  }
}
</style>
