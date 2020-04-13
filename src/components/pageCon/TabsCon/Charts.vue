<template>
  <div style="height:100rem;margin:0 5rem 0 5rem;">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="打卡情况" name="1">
        <div style="display:flex; justify-content:center;">
          <v-chart :options="polar" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="题目回答情况" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="题目思考时间" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="模块回顾率" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
/* .echarts {
  width: 100%;
  height: 100%;
} */
</style>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import "echarts/lib/chart/bar";

export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      activeNames: ["1"],
      polar: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {
          //   textStyle: {
          //     fontSize: fontSize(0.12)
          //   }
        },
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>