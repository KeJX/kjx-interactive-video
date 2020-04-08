<template>
  <div style="position:relative;right:0;padding:0 5rem;">
    <el-button type="primary" round style="position:relative;right:0;margin-bottom:1rem;">我要发布</el-button>
    <el-card v-for="(item,i) in contents" :key="i" class="box-card"  style="margin-bottom:1rem;width:100%;">
      <div slot="header" style="font-size:.8rem;">
        <span>{{item.question}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpToPoint(item.time)">{{item.time|transferToTime}}</el-button>
      </div>
        <div class="answer" style="font-size:.5rem;">{{` ${item.answer}`}}</div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "QandA",
  data() {
    return {
      contents:this.$store.state.qanda
    }
  },  
  methods: {
    print() {
      var el = this.$refs.print;
      var iframe = document.createElement("IFRAME");
      var doc = null;
      iframe.setAttribute(
        "style",
        "position:absolute;width:0px;height:0px;left:-500px;top:-500px;"
      );
      document.body.appendChild(iframe);
      doc = iframe.contentWindow.document;
      // 引入打印的专有CSS样式，www.111Cn.net根据实际修改
      doc.write("<LINK rel='stylesheet' type='text/css' href='css/print.css'>");
      doc.write("<div>" + el.innerHTML + "</div>");
      doc.close();
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      if (navigator.userAgent.indexOf("MSIE") > 0) {
        document.body.removeChild(iframe);
      }
    },
    jumpToPoint(time){
      this.$eventbus.$emit('jumpToPoint',time)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>