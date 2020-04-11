<template>
  <div class="qanda" style="position:relative;right:0;padding:0 5rem;">
    <el-button
      type="primary"
      round
      style="position:relative;right:0;margin-bottom:1rem;"
      @click="addDialogVisible = true"
    >我要发布</el-button>
    <el-button
      type="primary"
      round
      style="position:relative;right:0;margin-bottom:1rem;"
      @click="printReady()"
    >我要打印</el-button>
    <div style="display: inline-block; right: 5rem;margin-left:5rem;"> 
      <el-radio v-model="radio" label="1">按默认顺序</el-radio>
      <el-radio v-model="radio" label="2">按视频时间</el-radio>
    </div>

    <!--  -->
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="(item,i) in contents"
        :key="i"
        :label="i"
        style="diaplay:block;width:100%;"
      >
        <el-card shadow="hover" class="box-card" style="margin-bottom:1rem;width:100%;">
          <div slot="header" style="font-size:.8rem;">
            <span>
              <i class="el-icon-question" style="margin-right:.6rem;"></i>
              {{item.question}}
            </span>

            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="jumpToPoint(item.time)"
            >{{item.time|transferToTime}}</el-button>
          </div>
          <div class="answer" style="font-size:.5rem;">{{` ${ item.answer?item.answer:'待回答'}`}}</div>
        </el-card>
      </el-checkbox>
    </el-checkbox-group>

    <!--  -->
    <el-dialog
      :visible.sync="addDialogVisible"
      width="30%"
      :show-close="false"
      :before-close="handleClose"
      class="add-container"
    >
      <div
        slot="title"
        style="display: flex;justify-content: space-between;align-items: center;font-size:.8rem"
      >
        <span>输入你的问题</span>
        <span style="font-size:.5rem">{{this.$video.currentTime|transferToTime}}</span>
      </div>
      <div>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="question"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">发 布</el-button>
      </span>
    </el-dialog>

    <!--  -->
    <el-dialog :visible.sync="printDialogVisible" width="80%">
      <div slot="title" style="border-bottom:.05rem solid #F1F1F1; padding-bottom:.5rem;">
        <el-button type="primary" round @click="toPrint()">打印</el-button>
      </div>
      <div ref="notePrint">
        <el-card class="box-card" v-for="(item,i) in checkList" :key="i">
          <div
            class="print-question"
            style="margin-bottom:1rem"
          >{{`问题: ${i+1}.${contents[Number(item)].question}`}}</div>
          <div
            class="print-answer"
            style="font-size:.8rem;margin:0 0 1.6rem 0;"
          >{{` 答: ${contents[Number(item)].answer}`}}</div>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "QandA",
  data() {
    return {
      contents: [],
      addDialogVisible: false,
      printDialogVisible: false,
      question: "",
      checkList: [],
      radio: "1"
    };
  },
  mounted(){
    this.contentsCopy()
  },
  watch: {
    radio(){
      this.contentsCopy()
    }
  },
  methods: {
    print(el) {
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
    printReady() {
      if (this.checkList.length == 0) {
        this.$message.error({
          message: "请至少选择一个项目!",
          center: true
        });
      } else {
        this.printDialogVisible = true;
      }
    },
    toPrint() {
      this.print(this.$refs.notePrint);
    },
    jumpToPoint(time) {
      this.$eventbus.$emit("jumpToPoint", time);
    },
    add() {
      this.addDialogVisible = false;
      this.$store.commit("pushQandA", {
        time: this.$video.currentTime,
        question: this.question
      });
      this.contentsCopy()
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    contentsCopy(){
      let defContents =Array.from(this.$store.state.qanda) 
      let timeContents = Array.from(this.$store.state.qanda).sort((a,b)=>{ return a.time-b.time})
      if(this.radio == "1") this.contents = defContents
      else if(this.radio == "2") this.contents = timeContents
      this.checkList.length=0
      let checkGroup = document.querySelectorAll(".el-checkbox-group .el-checkbox")
      checkGroup.forEach(item=>{
        item.classList.remove("is-checked")
        item.querySelector(".el-checkbox__input").classList.remove("is-checked")
      })
    }
  }
};
</script>

<style lang="scss" >
.qanda {
  .order-select {
    position: absolute;
    right: 5rem;
  }
  .el-radio:{
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
  }
  .add-container {
    .el-button {
      font-size: 0.5rem;
    }
  }
  .el-checkbox-group {
    .el-checkbox__input {
      position: absolute;
      left: -1rem;
    }
    .el-checkbox__label {
      width: 100% !important;
    }
  }
}
</style>