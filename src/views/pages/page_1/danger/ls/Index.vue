<template>
  <div class="tempalta">
    <van-nav-bar title="硫酸厂" left-text="返回" left-arrow @click-left="pageBack" fixed />
    <div class="tab-content fixed-first">
      <div class="content">
        <div class="content-title">实时视频</div>
        <Video></Video>
        <div class="panel-list">
          <div class="panel-list-item" v-for="(item, index) in panelInfo_tab1" :key="index" @click="jumpTo(`/page_1/tagsThistory`, {tagsNameShow: item.itemName, tagsName: item.enName, unit: item.unit})">
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
          itemName: '氯磺酸贮罐A压力',
          enName: "LSC_PI_1403",
          value: ""
        },
        {
          itemName: '氯磺酸贮罐B压力',
          enName: "LSC_PI_1404",
          value: ""
        },
        {
          itemName: '氯磺酸贮罐C压力',
          enName: "LSC_PI_1405",
          value: ""
        },{
          itemName: '氯磺酸贮罐A液位',
          enName: "LSC_LI-1403",
          value: ""
        },{
          itemName: '氯磺酸贮罐B液位',
          enName: "LSC_LI-1404",
          value: ""
        },{
          itemName: '氯磺酸贮罐C液位',
          enName: "LSC_LI-1405",
          value: ""
        }],
      cardInfo_tab1: [
        // {
        //   itemName: '硫酸厂-氯磺酸-氯磺酸贮罐A液位',
        //   enName: "LSC_LI-1403",
        //   value: ""
        // },
        // {
        //   itemName: '硫酸厂-氯磺酸-氯磺酸贮罐B液位',
        //   enName: "LSC_LI-1404",
        //   value: ""
        // },
        // {
        //   itemName: '硫酸厂-氯磺酸-氯磺酸贮罐C液位',
        //   enName: "LSC_LI-1405",
        //   value: ""
        // },
      ],
      tabActive_1: 0,
      tabActive_1_1: 0
    };
  },
  created() {
    this.title = this.$route.query.title;
    this.getPageList()
  },
  methods: {
    pageBack() {
      this.$router.back();
    },
    getPageList() {
      let getCellData = () => {
        let arr = []
        this.panelInfo_tab1.map(item => {
          arr.push(item.enName)
        })
        console.log(`cell-enNameArr: `, arr)
        console.log(`cell-enNameStr: `, String(arr))
        this.$api.page_1
          .getRtMonTagInfosByNames({
            tagNames: String(arr),
            __sid: localStorage.JiaHuaSessionId
          })
          .then(res => {
            console.log(`cell-res: `, res)
            res.forEach((item)=>{
              this.panelInfo_tab1.forEach((items)=>{
                if(items.enName===item.Name){
                  items.unit = item.Unit
                  items.value = item.Value.toFixed(2)
                }
              })
            })

          })
      }
      getCellData()
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
