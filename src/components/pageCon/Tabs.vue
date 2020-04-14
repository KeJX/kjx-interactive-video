<template>
  <div class="kjx-tabs">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="问答" name="first">
        <qanda></qanda>
    </el-tab-pane>
    <el-tab-pane label="笔记" name="second">笔记</el-tab-pane>
    <el-tab-pane label="数据" name="third">
      <charts></charts>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import Qanda from "@/components/pageCon/TabsCon/QandA"
import Charts from "@/components/pageCon/TabsCon/Charts"
  export default {
    name:"Tabs",
    components:{
        Qanda,
        Charts
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      
    }
  };
</script>
<style lang="scss">
    .kjx-tabs{
      position: relative;
        .el-tab-pane{
          position:relative;
        }
        .el-tabs__item{
            display:inline-flex;
            align-items: center;
    }
    }
</style>