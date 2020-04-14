<template>
  <div class="dot-con">
    <dot 
    v-for=" (item,i) in dotArray " 
    :info="item" 
    :duration="duration" 
    :key="i"
    
    @dotClickInCon="dotClick"
    ></dot>
  </div>
</template>
<script>
import Dot from "@/components/DotCon/Dot"
export default {
  name:'DotCon',
  components:{
    Dot
  },
  props:{
    duration:Number,
    dotArray:Array
  },
  methods:{
    dotClick(time){
      this.$emit("dotClickCallback",time)
    }
  }
}
</script>
<style lang="scss">
  .dot-con{
    width:100%;
    height:100%;
    position:absolute;
  }
</style>