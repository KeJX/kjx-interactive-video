<template>
<div class="list">
    <button id="list-open-but" @click="drawer = true">
      <i class="iconfont icon-arrow_back" style="color:white;"></i>
    </button>
    <el-drawer
    title="目录"
    :visible.sync="drawer"
    :direction="direction"
    :modal="false"
    >
    <div class="block">
  <el-timeline>
    <el-timeline-item
      style="cursor:pointer"
      v-for="(item, index) in timeArray"
      :key="index"
      :type="'promary'"
      :size="'large'"
      :timestamp="item.time | transferToTime"
      :color="dotArrayRef[index].alertContent.isAnswered?'#0bbd87':'#E4E7ED'"
      @click.native="itemClick(timeArray[index].time)"
      >
      {{timeArray[index].type|alertName}}
    </el-timeline-item>
  </el-timeline>
</div>
    </el-drawer>
</div>
</template>
<script>
  export default {
    name:"List",
    props:{
      timeArray:Array,

    },
    data() {
      return {
        drawer: false,
        direction: 'rtl',
      };
    },
    computed:{
      dotArrayRef:function(){
        if(this.$store){
          return this.$store.state.dotArray
        }else{
          let tempArr 
          this.timeArray.foreach(tempArr.push({
              alertContent:{
              isAnswered:false
            }
          }))
          return tempArr
        }
      }
    },
    methods:{
      itemClick(time){
        this.$emit('listItemClick',time)
      }
    }
  };
</script>
<style lang="scss">
 .list{
    #list-open-but{
    cursor:pointer;
    background-color: #409EFF;
    border-radius: .3rem 0 0 .3rem;
    padding: .5rem;
    box-shadow: 0 0 8px #e5e9ef;
    }
    
  
  .el-drawer__body{
    margin-left:2rem;
  }
  #el-drawer__title{
    font-size: 2.5rem;
  }
 }
</style>