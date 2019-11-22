<template>
  <div>
    <div v-if="order==1">
      <van-checkbox-group v-model="result">
        <van-checkbox name="a">复选框 a</van-checkbox>
        <van-checkbox name="b">复选框 b</van-checkbox>
        <van-checkbox name="c">复选框 c</van-checkbox>
      </van-checkbox-group>
    </div>
    <div v-if="order==2">
456
    </div>
    <div v-if="order==3">

    </div>
  </div>
</template>

<script>
  export default {
    name: "selectPage",
    data(){return {
      order:'',
      result: ['a', 'b']
    }},
    mounted(){
      this.order=this.$route.query.order
    }
  };
</script>

<style scoped>

</style>