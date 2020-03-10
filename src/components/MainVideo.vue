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
          <dot-con
            :duration="duration"
            :dotArray="$store.state.dotArray"
            @dotClickCallback="dotClickInProgress"
          ></dot-con>
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

    <transition name="alert">
      <!-- 答题弹窗 -->
      <div id="alert" v-if="isShowAlert">
        <choice :index="alertIndex" v-if="this.$store.state.showAlert.choice"></choice>
        <question :index="alertIndex" v-if="this.$store.state.showAlert.question"></question>
      </div>
      
    </transition>

    <transition name="alert">
    <!-- 遮罩 -->
      <div id="mask" v-if="isShowAlert"></div>
    </transition>

    <!-- 继续按钮 -->
    <transition name="alert" v-if="isShowAlert&&$store.state.dotArray[alertIndex].alertContent.isAnswered">
      <div class="continue-button"  @click="reset">继续</div>
    </transition>

  </div>
</template>

<script>
import DotCon from "./DotCon/DotCon";
import Choice from "./Alert/Choice";
import Question from "./Alert/Question";
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
      showContinue:false,
      timeArray: [],
      alertIndex:0
    };
  },
  computed: {
    isShowAlert() {
      return (
        this.$store.state.showAlert.choice ||
        this.$store.state.showAlert.question
      );
    }
  },
  watch: {},

  mounted() {
    let video = this.$refs.video,
      that = this;

    that.duringBar = that.$refs.duringBar;

    for (let i = 0; i < that.$store.state.dotArray.length; i++) {
      that.timeArray.push({
        time: that.$store.state.dotArray[i].time,
        viewed: false,
        isAnswered:false
      });
    }
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
      if (
        that.timeArray.some(value => {
          let time = Math.round(video.currentTime);
          let index = that.timeArray.findIndex(e => {
            // console.log(`${e.time} ${time}`);
            return e.time == time;
          });
          // console.log(time + " " + index);
          if (
            Math.abs(value.time - video.currentTime) < 0.2 &&
            that.timeArray[index].viewed == false
          ) {
            return true;
          }
        })
      ) {
        let time = Math.round(video.currentTime);
        let index = that.timeArray.findIndex(e => {
          return e.time == time;
        });
        that.timeArray[index].viewed = true;
        that.pauseToShowAlert(index);
        // 恢复浏览 
        setTimeout(()=>{
          that.timeArray[index].viewed = false
        },.8)
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
    pauseToShowAlert(index) {
      this.$refs.video.pause();
      this.isPlay = false;
      this.alertIndex = index;
      // 出现提示框
      // alert('index:'+index)
      let info = this.$store.state.dotArray[index];
      switch (info.alertContent.type) {
        case "choice":
          // this.$store.state.showAlert.choice = true
          this.$store.commit("show", "choice");
          break;
        case "question":
          this.$store.commit("show", "question");
          break;
        default:
          break;
      }
    },
    playButton() {
      this.$refs.video.play();
      this.isPlay = true;
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
    dotClickInProgress(currentTime) {
      console.log(currentTime);
      this.$refs.video.currentTime = currentTime;
      console.log(this.$refs.video.currentTime);
      //  this.$refs.video.play(); //防止因为结束后造成暂停状态
      this.isPlay = true;
      // 更新 alertIndex
      let that = this
      console.log(currentTime)
      let index = this.timeArray.findIndex(e=>{
        return e.time == currentTime
      })
    alert(index)
      // 暂停出现对话框
      this.pauseToShowAlert(index);


    },
    reset() {
      this.$store.commit("reset");
      
      this.playButton();
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
  height: 25rem;
  background: black;
}
#main-video {
  width: 80%;
  height: 20rem;
  position: relative;
  left: 50%;
  top: 12.5rem;
  transform: translate(-50%, -10rem);
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
#alert {
  width:100%;
  height:100%;
  position:absolute;
  top:0;
}
// mask
#mask {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 19;
}

.alert-enter,
.alert-leave-to {
  opacity: 0;
}
.alert-leave,
.alert-enter-to {
  opacity: 1;
}
.alert-enter-active,
.alert-leave-active {
  transition: all 0.5s;
}

// 继续按钮
.continue-button{
      display: flex;
      justify-content: center;
      align-items: center;
      color:black;
    position: absolute;
    width:3rem;
    height:2rem;
    border-radius: .3rem;
    bottom:3rem;
    right: 1rem;
    font-size: .8rem;
    background-color: rgb(66, 190, 248);
    color:white;
    z-index: 20;
    cursor: pointer;
  }
</style>
