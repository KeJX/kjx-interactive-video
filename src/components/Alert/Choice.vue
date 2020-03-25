<template>
  <div class="choice-alert">
    <div class="choice-container">
      <div class="title">
        <span>单选题:</span>
      </div>
      <div class="content">{{alertContent.title}}</div>
      <div class="choice-item" v-bind:class="{'correct':alertContent.isAnswered&&(i==alertContent.rightChoice),'wrong':alertContent.isAnswered&&(i==alertContent.finalChoice)&&(i!==alertContent.rightChoice)}" v-for="(item,i) in list" @click="clickFunc(i)" :key="i">
        <span class="left"><strong>{{`${headList[i]}.`}}</strong>{{item}}</span>
        <i v-if="alertContent.isAnswered&&(i==alertContent.rightChoice||i==alertContent.finalChoice)" class="iconfont  right" :class="{'icon-zhengque-':i==alertContent.rightChoice,'icon-cuowu-':(i==alertContent.finalChoice)&&(alertContent.finalChoice!==alertContent.rightChoice)}" ></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"Choice",
  data() {
    return {
      headList: ["A", "B", "C", "D"],
      list:null,
      alertContent:null
    };
  },
  props: {
      index:Number
  },
  methods:{
      clickFunc(i){
        if(this.$store.state.dotArray[this.index].alertContent.isAnswered){}
        else{
          this.$store.commit("changeIsAnswered",this.index)
          this.alertContent.finalChoice = i
           this.alertContent=this.$store.state.dotArray[this.index].alertContent
        }
      }
  },
  created() {
    this.alertContent=this.$store.state.dotArray[this.index].alertContent
    this.list = this.$store.state.dotArray[this.index].alertContent.list
  },
};
</script>
<style lang="scss">
.choice-alert {
  width: 18.75rem;
  height: 15.625rem;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -9.375rem;
  margin-top: -7.8125rem;
  border-radius: 1rem;
  z-index: 20;
}
.choice-container {
  width: 90%;
  height: 90%;
  margin-left: 50%;
  margin-top: 50%;
  transform: translate(-50%, -60%);
  font-family: "Courier New", Courier, monospace;
}
.title {
  position: relative;
  width: 100%;
  padding-bottom: 0.5rem;
  border-bottom: 0.05rem solid #9c9c9c;
  font-weight: bold;
  color: #9c9c9c;
  font-size: 0.8rem;
}

.content {
  padding: 0.5rem 0 0 0;
}

.choice-item {
  margin: 0.5rem;
  padding: 0.4rem;
  border-radius: 0.1rem;
  background-color: #fbf9fb;
  color: #47484c;
  height:2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .iconfont{
    color: white;
    width:1rem;
    height:1rem;
    font-size: 1rem;
   
  }
  &.correct{
    background-color: #1CC869;
    color:white;
  }

  &.wrong{
    background-color: #EC414D;
    color:white;
  }
}

.choice-item:hover {
  background-color: rgb(66, 190, 248);
  transition: 0.5s;
  cursor: pointer;
  color: white;
}


</style>