<template>
  <div class="kjx-tabs">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="问答" name="first">
        <qanda></qanda>
    </el-tab-pane>
    <el-tab-pane label="笔记" name="second">笔记</el-tab-pane>
    <el-tab-pane label="数据" name="third">数据</el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import Qanda from "./TabsCon/QandA"
  export default {
    name:"Tabs",
    components:{
        Qanda
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  };
</script>
<style lang="scss">
    .kjx-tabs{
        .el-tabs__item{
            display:inline-flex;
            align-items: center;
    }
    }
</style>