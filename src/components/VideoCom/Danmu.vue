<template>
  <div class="dm-container">
    <div style="display:flex;align-items: center;">
      <i class="iconfont icon-danmu" style="font-size:1.2rem;margin-right:.5rem;"></i>
      <el-switch
        class="dm-switcher"
        v-model="isDanmuShow"
        active-color="#00A1D6"
        inactive-color="#757575"
      ></el-switch>
    </div>
    <el-input style="margin:0 1rem;height:1.8rem;" id="danmu-input" placeholder="请输入内容" v-model="input"></el-input>
    <div style="margin:.8rem 0;">
      <el-button style="paddng:1rem 2rem" type="primary" @click="emitDanmu(input)">发送弹幕</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Danmu",
  props:{
    danmu:Object,
    video:HTMLVideoElement,
  },
  data() {
    return {
      isDanmuShow: true,
      input: ""
    };
  },
  watch:{
    isDanmuShow(newVal,oldVal){
      if(newVal){
        this.danmu.show()
      }else{
        this.danmu.hide()
      }
    }
  },
  methods: {
    emitDanmu(input){
      // console.log(input);
      let time = this.video.currentTime+1
      this.danmu.emit({
         text: input,
        // Specified in seconds, if not provided when using with media,
        // it will be set to `media.currentTime`. Not required in live mode.
        time: time,
        // When using canvas engine, Danmaku will create a <canvas> object for each comment,
        // you should pass in a CanvasRenderingContext2D object.
        // For example:
        style: {
          font: "30px sans-serif",
      textAlign: "start",
      // Note that 'bottom' is the default
      textBaseline: "middle",
      direction: "inherit",
      fillStyle: "#fff",
      strokeStyle: "#fff",
      lineWidth: 1.0
      }})
      this.$store.commit("pushComments",{time:time,input:input})
      this.input = ""

    }
  },
};
</script>
<style lang="scss">
.dm-container {
  
  height: 2rem;
  width: 100%;
  box-shadow: 0 0 8px #e5e9ef;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  .el-button{
    padding: .3rem 2rem;
  }
  .el-input__inner{
    height:1.8rem;
  }
}

.dm-switcher {
  width: 2rem;
  height: 1.2rem;
  .el-switch__core {
    width: 100% !important;
    height: 100% !important;
  }
}


</style>