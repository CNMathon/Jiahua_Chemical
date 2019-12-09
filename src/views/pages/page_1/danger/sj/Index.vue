<template>
  <div class="tempalta">
    <van-nav-bar title="烧碱厂" left-text="返回" left-arrow @click-left="pageBack" fixed />
    <van-tabs color="#6096F8" v-model="tabActive_1" class="fixed-first-tab">
      <van-tab title="生产单元">
        <van-tabs color="#6096F8" v-model="tabActive_1_1" type="card" class="sub-tab">
          <van-tab title="电解装置氢">
            <div class="tab-content">
              <div class="content">
                <div class="content-title">实时视频</div>
                <Video></Video>
                <div class="panel-list">
                  <div class="panel-list-item" v-for="(item, index) in panelInfo_tab1" :key="index" @click="jumpTo(`/page_1/tagsThistory?tagsNameShow=${item.itemName}&tagsName=${item.enName}&unit=${item.unit}`)">
                    <Panel :name="item.itemName" :unit="item.unit" :value="item.value" size="big"></Panel>
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
          <van-tab title="电解装置氯">
            <div class="tab-content">
              <div class="content">
                <div class="content-title">实时视频</div>
                <Video></Video>
                <div class="panel-list">
                  <div class="panel-list-item" v-for="(item, index) in panelInfo_tab2" :key="index" @click="jumpTo(`/page_1/tagsThistory?tagsNameShow=${item.itemName}&tagsName=${item.enName}&unit=${item.unit}`)">
                    <Panel :name="item.itemName" :unit="item.unit" :value="item.value" size="big"></Panel>
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
          <van-tab title="液氯包装氯">
            <div class="tab-content">
              <div class="content">
                <div class="content-title">实时视频</div>
                <Video></Video>
                <div class="panel-list">
                  <div class="panel-list-item" v-for="(item, index) in panelInfo_tab3" :key="index" @click="jumpTo(`/page_1/tagsThistory?tagsNameShow=${item.itemName}&tagsName=${item.enName}&unit=${item.unit}`)">
                    <Panel :name="item.itemName" :unit="item.unit" :value="item.value" size="big"></Panel>
                  </div>
                </div>
              </div>
              <div class="content">
                <div class="content-title">液位历史曲线</div>
                <LineCharts></LineCharts>
              </div>
              <div class="content">
                <div class="content-title">可燃有毒气体</div>
                <item-card :info="cardInfo_tab3" />
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </van-tab>
      <van-tab title="储存单元">
        <div class="tab-content">
              <div class="content">
                <div class="content-title">实时视频</div>
                <Video></Video>
                <div class="panel-list">
                  <div class="panel-list-item" v-for="(item, index) in panelInfo_tab4" :key="index" @click="jumpTo(`/page_1/tagsThistory?tagsNameShow=${item.itemName}&tagsName=${item.enName}&unit=${item.unit}`)">
                    <Panel :name="item.itemName" :unit="item.unit" :value="item.value" size="big"></Panel>
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
      panelInfo_tab1:[{
          itemName: 'A套总管氢气压力',
          enName: "SJC_BPIA2002",
          value: "",
          unit:''
        },
        {
          itemName: 'B套总管氢气压力',
          enName: "SJC_CPIA2002",
          value: "",
          unit:''
        }],
        panelInfo_tab2:[{
          itemName: 'A套总管氯气压力',
          enName: "SJC_BPIA2001",
          value: "",
          unit:''
        },
        {
          itemName: 'B套总管氯气压力',
          enName: "SJC_CPIA2001",
          value: "",
          unit:''
        }],
        panelInfo_tab3:[{
          itemName: '槽车充装抽空压力',
          enName: "SJC_DPIC_1105B",
          value: "",
          unit:''
        },
        {
          itemName: '钢瓶充装抽空压力',
          enName: "SJC_DPIC_1105A",
          value: "",
          unit:''
        }],
        panelInfo_tab4:[{
          itemName: '液氯储槽A内温度',
          enName: "SJC_CTI1101A",
          value: "",
          unit:''
        },
        {
          itemName: '液氯储槽B内温度',
          enName: "SJC_CTI1101B",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽C内温度',
          enName: "SJC_CTI1101C",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽D内温度',
          enName: "SJC_CTI1101D",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽E内温度',
          enName: "SJC_CTI1101E",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽F内温度',
          enName: "SJC_CTI1101F",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽G内温度',
          enName: "SJC_CTI1101G",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽A内压力',
          enName: "SJC_CPIA1101A",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽B内压力',
          enName: "SJC_CPIA1101B",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽C内压力',
          enName: "SJC_CPIA1101C",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽D内压力',
          enName: "SJC_CPIA1101D",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽E内压力',
          enName: "SJC_CPIA1101E",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽F内压力',
          enName: "SJC_CPIA1101F",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽G内压力',
          enName: "SJC_CPIA1101G",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽A内侧液位',
          enName: "SJC_CLIA1101A",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽B内侧液位',
          enName: "SJC_CLIA1101B",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽C内侧液位',
          enName: "SJC_CLIA1101C",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽D内侧液位',
          enName: "SJC_CLIA1101D",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽E内侧液位',
          enName: "SJC_CLIA1101E",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽F内侧液位',
          enName: "SJC_CLIA1101F",
          value: "",
          unit:''
        },{
          itemName: '液氯储槽G内侧液位',
          enName: "SJC_CLIA1101G",
          value: "",
          unit:''
        }],
      cardInfo_tab1: [
        {
          itemName: 'A套电解-二楼1#槽顶南氢气浓度',
          enName: "SJC_AIA_2011A",
          value: ""
        },{
          itemName: 'A套电解-二楼5~6#槽顶西氢气浓度',
          enName: "SJC_BAIA2021",
          value: ""
        },{
          itemName: 'A套电解-二楼7~8#槽顶东氢气浓度',
          enName: "SJC_BAIA2022",
          value: ""
        },{
          itemName: 'A套电解-二楼9~10#槽顶西氢气浓度',
          enName: "SJC_BAIA_2023",
          value: ""
        },{
          itemName: 'A套电解-二楼9~10#槽顶东氢气浓度',
          enName: "SJC_BAIA_2024",
          value: ""
        },{
          itemName: 'B套电解-二楼1~2#槽顶氢气浓度',
          enName: "SJC_CAIA2020",
          value: ""
        },{
          itemName: 'B套电解-二楼2~3#槽顶氢气浓度',
          enName: "SJC_CAIA2021",
          value: ""
        },{
          itemName: 'B套电解-二楼3~4#槽顶氢气浓度',
          enName: "SJC_CAIA2022",
          value: ""
        },{
          itemName: 'B套电解-二楼4~5#槽顶氢气浓度',
          enName: "SJC_CAIA2023",
          value: ""
        },{
          itemName: 'B套电解-二楼5~6#槽顶氢气浓度',
          enName: "SJC_CAIA2024",
          value: ""
        },{
          itemName: 'B套电解-二楼6~7#槽顶氢气浓度',
          enName: "SJC_CAIA2025",
          value: ""
        },{
          itemName: 'B套电解-二楼7~8#槽顶氢气浓度',
          enName: "SJC_CAIA2026",
          value: ""
        }
      ],
      cardInfo_tab2: [
        {
          itemName: "A套电解-一楼7~8#槽间氯气浓度",
          enName: "SJC_BAIA2011",
          value: 89
        },
        {
          itemName: "A套电解-一楼9~10#槽间氯气浓度",
          enName: "SJC_BAIA2012",
          value: 89
        },
        {
          itemName: "A套电解-一楼2V2001西南氯气浓度",
          enName: "SJC_BAIA2013",
          value: 89
        },
        {
          itemName: "B套电解-一楼1~2#槽间氯气浓度",
          enName: "SJC_CAIA2010",
          value: 70
        },{
          itemName: "B套电解-一楼3V9031西南氯气浓度",
          enName: "SJC_CAIA2011",
          value: 89
        },
        {
          itemName: "B套电解-一楼3~4#槽间氯气浓度",
          enName: "SJC_CAIA2012",
          value: 89
        },
        {
          itemName: "B套电解-一楼3V2002西南氯气浓度",
          enName: "SJC_CAIA2013",
          value: 70
        },{
          itemName: "B套电解-一楼5~6#槽间氯气浓度",
          enName: "SJC_CAIA2014",
          value: 89
        },
        {
          itemName: "B套电解-一楼3V2001西南氯气浓度",
          enName: "SJC_CAIA2015",
          value: 89
        },
        {
          itemName: "B套电解-一楼7~8#槽间氯气浓度",
          enName: "SJC_CAIA2016",
          value: 70
        }
      ],
      cardInfo_tab3: [
        {
          itemName: "液氯槽车充装平台下氯气浓度",
          enName: "SJC_BAE1303",
          value: 89
        },
        {
          itemName: "钢瓶充装厂房东北整瓶区氯气浓度",
          enName: "SJC_AIA_1303",
          value: 89
        },
        {
          itemName: "钢瓶充装厂房西北整瓶区氯气浓度",
          enName: "SJC_AIA_1306",
          value: 89
        }
      ],
      cardInfo_tab4: [
        {
          itemName: "液氯储存区地面西南氯气浓度",
          enName: "SJC_CAIA1101",
          value: 89
        },
        {
          itemName: "液氯储存区地面中北氯气浓度",
          enName: "SJC_CAIA1102",
          value: 89
        },
        {
          itemName: "液氯储存区地面东南氯气浓度",
          enName: "SJC_CAIA1103",
          value: 89
        },{
          itemName: "液氯储存区地面中南氯气浓度",
          enName: "SJC_CAIA1104",
          value: 89
        },{
          itemName: "液氯储存厂房A槽东南氯气浓度",
          enName: "SJC_CAIA1104",
          value: 89
        },{
          itemName: "液氯储存厂房A槽东南氯气浓度",
          enName: "SJC_CAIA_1131",
          value: 89
        },{
          itemName: "液氯储存厂房A槽西北氯气浓度",
          enName: "SJC_CAIA_1132",
          value: 89
        },{
          itemName: "液氯储存厂房B槽东南氯气浓度",
          enName: "SJC_CAIA_1133",
          value: 89
        },{
          itemName: "液氯储存厂房B槽西北氯气浓度",
          enName: "SJC_CAIA_1134",
          value: 89
        },{
          itemName: "液氯储存厂房C槽东南氯气浓度",
          enName: "SJC_CAIA_1135",
          value: 89
        },{
          itemName: "液氯储存厂房C槽西北氯气浓度",
          enName: "SJC_CAIA_1136",
          value: 89
        },{
          itemName: "液氯储存厂房D槽东南氯气浓度",
          enName: "SJC_CAIA_1137",
          value: 89
        },{
          itemName: "液氯储存厂房D槽西北氯气浓度",
          enName: "SJC_CAIA_1138",
          value: 89
        },{
          itemName: "液氯储存厂房E槽东南氯气浓度",
          enName: "SJC_CAIA_1139",
          value: 89
        },{
          itemName: "液氯储存厂房E槽西北氯气浓度",
          enName: "SJC_CAIA_1140",
          value: 89
        },{
          itemName: "液氯储存厂房F槽东南氯气浓度",
          enName: "SJC_CAIA_1141",
          value: 89
        },{
          itemName: "液氯储存厂房F槽西北氯气浓度",
          enName: "SJC_CAIA_1142",
          value: 89
        },{
          itemName: "液氯储存厂房G槽东南氯气浓度",
          enName: "SJC_CAIA_1143",
          value: 89
        }
      ],
      tabActive_1: 0,
      tabActive_1_1: 0
    };
  },
  created() {
    this.title = this.$route.query.title;
    let arr = []
    this.cardInfo_tab1.map(item => {
      arr.push(item.enName)
    })
    this.cardInfo_tab2.map(item => {
      arr.push(item.enName)
    })
    this.cardInfo_tab3.map(item => {
      arr.push(item.enName)
    })
    this.cardInfo_tab4.map(item => {
      arr.push(item.enName)
    })
    this.panelInfo_tab2.map(item => {
      arr.push(item.enName)
    })
    this.panelInfo_tab1.map(item => {
      arr.push(item.enName)
    })
    this.panelInfo_tab3.map(item => {
      arr.push(item.enName)
    })
    this.panelInfo_tab4.map(item => {
      arr.push(item.enName)
    })
    this.$api.page_1.getRtMonTagInfosByNames({
      tagNames: arr.join(','),
      __sid: localStorage.JiaHuaSessionId
    }).then((res)=>{
      res.forEach((item)=>{
        this.cardInfo_tab1.forEach((items)=>{
          if(items.enName===item.Name){
            items.value = item.Value.toFixed(2)
            items.unit = item.Unit
          }
        })
        this.panelInfo_tab1.forEach((items)=>{
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
        this.panelInfo_tab2.forEach((items)=>{
          if(items.enName===item.Name){
            items.value = item.Value.toFixed(2)
            items.unit = item.Unit
          }
        })
        this.cardInfo_tab3.forEach((items)=>{
          if(items.enName===item.Name){
            items.value = item.Value.toFixed(2)
            items.unit = item.Unit
          }
        })
        this.panelInfo_tab3.forEach((items)=>{
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
        this.panelInfo_tab4.forEach((items)=>{
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
