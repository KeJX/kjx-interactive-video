<template>
  <div class="question-alert">
    <div class="question-container">
      <div class="title">
        <span>问答题:</span>
      </div>
      <div class="content">
        <span>详细叙述一下内容?</span>
        <button
          class="input-but"
          :class="{'input-but-forbidden':alertContent.isAnswered} "
          :disabled="alertContent.isAnswered"
          @click="inputFunc"
        >提交</button>
      </div>
      <textarea
        ref="text"
        class="answer-area"
        placeholder="请在此输入内容"
        v-model="alertContent.finalAnswer"
        :readonly="alertContent.isAnswered"
      ></textarea>
    </div>
  </div>
</template>
<script>
export default {
  name: "Question",
  props: {
    index: Number
  },
  data() {
    return {
      
    };
  },
  computed:{
    alertContent(){
      return this.$store.state.dotArray[this.index].alertContent
    }
  },
  methods: {
    inputFunc() {
      if (this.alertContent.isAnswered) {
      } else {
        this.$store.commit("changeIsAnswered", this.index);
        this.alertContent.finalAnswer = this.$refs.text.value;
      }
    }
  },
  created() {
  }
};
</script>
<style lang="scss">
.question-alert {
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

.question-container {
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
  padding: 0.5rem 0 0.5rem 0;
  display: flex;
  align-items: center;
}
.answer-area {
  border-radius: 0.3rem;
  border: 0.05rem solid black;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  height: 70%;
}

.input-but {
  text-align: center;
  width: 3rem;
  height: 1.5rem;
  font-size: 0.8rem;
  background-color: rgb(66, 190, 248);
  color: white;
  border-radius: 0.2rem;
  position: absolute;
  right: 1rem;
  cursor: pointer;
}

.input-but-forbidden {
  background-color: gray;
  cursor: no-drop;
}
</style>