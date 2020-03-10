<template>
  <div class="choice-alert">
    <div class="choice-container">
      <div class="title">
        <span>单选题:</span>
      </div>
      <div class="content">请问我们做的是啥?</div>
      <div class="choice-item" v-for="(item,i) in list" @click="clickFunc">
        <strong>{{`${headList[i]}.`}}</strong>
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headList: ["A", "B", "C", "D"],
      list: ["做老八秘制汉堡", "做老9秘制汉堡", "做猪肚", "做猪肉"],
      rightChoice: 3
    };
  },
  props: {
      index:Number
  },
  methods:{
      clickFunc(){
          this.$store.commit("changeIsAnswered",this.index)
      }
  }
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
}

.choice-item:hover {
  background-color: rgb(66, 190, 248);
  transition: 0.5s;
  cursor: pointer;
  color: white;
}
</style>