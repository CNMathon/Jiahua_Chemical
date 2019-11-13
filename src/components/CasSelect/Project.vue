<template>
  <div id="app">
    <van-nav-bar
      title="请选择"
      left-text="返回"
      left-arrow
      @click-left="pageBack"
      fixed="true"
    />
    <label 
      v-for="(item, index) in initData"
      :key="index"
    >
      <van-cell
        :title="item.name"
        is-link
        @click="onClickCell"
        :value="chooseValue == [] ? chooseValue : '下级'"
      />
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chooseValue: [],
      initData: [
        {
          name: 'A化工厂',
          children: [
           
          ]
        },
        {
          name: 'B化工厂',
          children: [
           
          ]
        }
      ],
      pageData: []
    }
  },
  methods: {
    pageBack() {
      this.$router.back();
    },
    onClickCell() {
      this.$router.back();
    },
    created() {
      console.log(this.$route.params.testData)
    }
  }
}
</script>