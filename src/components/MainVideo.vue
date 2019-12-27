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
  </div>
</template>

<script>
import DotCon from "./DotCon/DotCon";
export default {
  name: "MainVideo",
  components: {
    DotCon
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
          time: 200
        },
        {
          time: 150
        }
      ]
    };
  },
  mounted() {
    let video = this.$refs.video,
      that = this;
    that.duringBar = that.$refs.duringBar;
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
       this.$refs.video.play(); //防止因为结束后造成暂停状态
      this.isPlay = true;
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
<style scoped>
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
  width: 10rem;
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
</style>
