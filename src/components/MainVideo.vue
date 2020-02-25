<template>
  <div ref="videoContainer" id="video-container">
    <video ref="video" id="main-video">
      <source :src="`${publicPath}videos/test.mp4`" type="video/mp4" />
    </video>
    <!-- <video-player id="main-video"  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"
                 >
               
    </video-player>-->
    <!-- 视频控制器 -->
    <div ref="controls" id="kjx-controls">
      <div id="play-pause-button" @click="playPauseButton()">
        <i class="iconfont" v-bind:class="{'icon-weibiaoti--1':!isPlay,'icon-weibiaoti--':isPlay}"></i>
      </div>
      <div id="progress-bar" ref="progressBar" @click="progressClick">
        <div id="base-bar">
          <dot-con :duration="duration" :dotArray="dotArray" @dotClickCallback="dotClickInProgress"></dot-con>
          <div id="during-bar" ref="duringBar">
            <div id="during-dot"></div>
          </div>
        </div>
      </div>
      <div id="time-container">{{currentTime|transferToTime}}/{{duration|transferToTime}}</div>
      <div id="fullscreen-button" @click="fullScreenButton()">
        <i
          class="iconfont"
          v-bind:class="{'icon-quanping1':!isFullScreen,'icon-quanping':isFullScreen}"
        ></i>
      </div>
    </div>

    <!-- 答题弹窗 -->
    <div id="alert" v-if="showAlert.choice||showAlert.question">
      <div id="mask"></div>
      <choice v-if="showAlert.choice"></choice>
      <question v-if="showAlert.question"></question>
    </div>
  </div>
</template>

<script>
import DotCon from "./DotCon/DotCon";
import Choice from "./Alert/Choice"
import Question from "./Alert/Question"
export default {
  name: "MainVideo",
  components: {
    DotCon,
    Choice,
    Question
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      isPlay: false,
      isFullScreen: false,
      duration: 0,
      currentTime: 0,
      duringBar: null,
      dotArray: [
        {
          time:5,
          alertContent:{
            type:'choice'
          }
        },
        {
          time: 200,
          alertContent:{
            type:'question'
          }
        },
        {
          time: 150,
          alertContent:{
            type:'choice'
          }
        }
      ],
      timeArray:[],
      // 是否显示
      showAlert:{
        choice:false,
        question:false
      }
    };
  },

  mounted() {
    let video = this.$refs.video,
      that = this;
    
    that.duringBar = that.$refs.duringBar;

    for(let i=0;i<that.dotArray.length;i++){
      that.timeArray.push({time:that.dotArray[i].time,viewed:false})
    }
    console.log(that.timeArray)
    video.addEventListener("loadedmetadata", () => {
      that.duration = video.duration;
    });
    video.addEventListener("timeupdate", () => {
      that.currentTime = video.currentTime;

      // 更新进度条
      that.duringBar.style = `width:${(that.currentTime / that.duration) *
        100}%`;
      if (that.currentTime >= that.duration) {
        that.isPlay = false;
      }
      // 监听dot
      // console.log(video.currentTime)
      if(that.timeArray.some((value)=>{
        let time = Math.round(video.currentTime)
        let index = that.timeArray.findIndex((e)=>{console.log(`${e.time} ${time}`)
         return e.time==time})
        console.log(time+" "+index)
        if(Math.abs(value.time-video.currentTime)<0.2&&that.timeArray[index].viewed ==false){
          return true
        }
      })){
        let time = Math.round(video.currentTime)
        let index = that.timeArray.findIndex((e)=>{return e.time==time})
        that.timeArray[index].viewed = true
        that.pauseToShowAlert(index)
      }
    });
  },
  methods: {
    // play pause button
    playPauseButton() {
      if (this.isPlay) {
        this.$refs.video.pause();
      } else {
        this.$refs.video.play();

        //  this.$refs.video.requestFullscreen();
        // this.$refs.controls.style = "position:fixed;top:2.25rem;"
      }
      this.isPlay = !this.isPlay;
    },
    pauseToShowAlert(index){
        this.$refs.video.pause();
        this.isPlay = false

        // 出现提示框
        // alert('index:'+index)
        let info = this.dotArray[index]
        switch (info.alertContent.type) {
          case 'choice':
            this.showAlert.choice = true
            break;
          case 'question':
            this.showAlert.question = true
            break;
          default:
            break;
        }
    },
    playButton(){
      this.$refs.video.play()
      this.isPlay=true
    },
    fullScreenButton() {
      if (this.isFullScreen) {
        // 全屏  --> 缩小
        fullScreenOff(this.$refs.videoContainer);
        this.$refs.videoContainer.style = "";
      } else {
        // 不是全屏 --》 放大
        fullScreenOn(this.$refs.videoContainer);
        this.$refs.videoContainer.style =
          "display:flex;align-items=center;flex-direction:column;justify-content:center;";
      }

      this.isFullScreen = !this.isFullScreen;

      function fullScreenOn(element) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          this.$refs.video.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        } else if (element.oRequestFullscreen) {
          element.oRequestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullScreen();
        } else {
          var docHtml = document.documentElement;
          var docBody = document.body;
          var videobox = document.getElementById("sfLive");
          var cssText = "width:100%;height:100%;overflow:hidden;";
          docHtml.style.cssText = cssText;
          docBody.style.cssText = cssText;
          videobox.style.cssText = cssText + ";" + "margin:0px;padding:0px;";
          document.IsFullScreen = true;
        }
      }

      function fullScreenOff() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.oRequestFullscreen) {
          document.oCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else {
          var docHtml = document.documentElement;
          var docBody = document.body;
          var videobox = document.getElementById("sfLive");
          docHtml.style.cssText = "";
          docBody.style.cssText = "";
          videobox.style.cssText = "";
          document.IsFullScreen = false;
        }
      }
    },
    progressClick(event) {
      if (!event.target.classList.contains("dot")) {
        let totalLen = this.$refs.progressBar.clientWidth;
        this.$refs.video.currentTime =
          (event.offsetX / totalLen) * this.duration;

        this.$refs.video.play(); //防止因为结束后造成暂停状态
        this.isPlay = true;
      }
    },
    dotClickInProgress(currentTime){
      console.log(currentTime)
       this.$refs.video.currentTime = currentTime
      console.log(this.$refs.video.currentTime);
      //  this.$refs.video.play(); //防止因为结束后造成暂停状态
      this.isPlay = true;

      // 暂停出现对话框
      this.pauseToShowAlert()
    }
  },

  filters: {
    transferToTime: function(v) {
      if (!v) return "0:00";
      let min = Math.floor(v / 60),
        sec = Math.round(v % 60),
        minStr = min + "",
        secStr;
      // if(min<10){
      //   minStr = `0${min}`
      // }else{
      //   minStr = ''+min
      // }
      if (sec < 10) {
        secStr = `0${sec}`;
      } else {
        secStr = "" + sec;
      }
      return `${minStr}:${secStr}`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#video-container {
  position: relative;
  width: 100%;
  background: black;
}
#main-video {
  width: 80%;
  height: 25rem;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

#kjx-controls {
  padding: 0 0.6rem;
  position: absolute;
  width: 100%;
  height: 2rem;
  background-color: rgba(73, 67, 67, 0.7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
}

#progress-bar {
  flex: 1;
  margin: 0 1rem;
}

#base-bar {
  width: 100%;
  border-radius: 0.1rem;
  background: white;
  height: 0.3rem;
  position: relative;
}

#during-bar {
  position: absolute;
  height: 100%;
  width: 0rem;
  background-color: rgb(66, 190, 248);
  border-radius: 0.1rem 0 0 0.1rem;
}

#during-dot {
  background-color: rgb(66, 190, 248);
  border-radius: 100%;
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  right: -0.46rem;
  transform: translateY(-0.1rem);
}
#base-bar:hover {
  cursor: pointer;
}
#time-container {
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.8rem;
  margin-right: 0.5rem;
}
#play-pause-button,
#fullscreen-button {
  font-size: 2rem;
  height: 1.5rem;
  width: 2rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
#play-pause-button:hover,
#fullscreen-button:hover {
  cursor: pointer;
}

.iconfont {
  height: 1.5rem;
  width: 1.5rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconfont:before {
  width: 100%;
  height: 100%;
}


/* alert */
#alert{
  width:18.75rem;
  height:15.625rem;
  background-color: #fff;
  position: absolute;
  top:50%;
  left:50%;
  margin-left: -9.375rem;
  margin-top: -7.8125rem;
  border-radius: 1rem;
}
</style>
