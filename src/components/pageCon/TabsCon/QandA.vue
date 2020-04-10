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
            <span><i class="el-icon-question" style="margin-right:.6rem;"></i>{{item.question}}</span>

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
        <el-card class="box-card" v-for="(item,i) in checkList" :key="i" >
          <div class="print-question" style="margin-bottom:1rem">{{`问题: ${i+1}.${contents[Number(i)].question}`}}</div>
          <div class="print-answer" style="font-size:.8rem;margin:0 0 1.6rem 0;">{{` 答: ${contents[Number(i)].answer}`}}</div>
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
      contents: this.$store.state.qanda,
      addDialogVisible: false,
      printDialogVisible: false,
      question: "",
      checkList: []
    };
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
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang="scss" >
.qanda {
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