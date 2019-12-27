<template>
    <div 
    class="dot" 
    :class="{'dot-active':isActive}"
    ref="dot" 
    @click="dotClickInDot"
    @mouseover="dotMouseOver"
    @mouseleave="dotMouseLeave"
    >
        <transition name="fade">
            <div class="dot-tip" v-if="isActive">{{info.time|transferToTime}}</div>
        </transition>
    </div>
</template>
<script>
export default {
    name:"Dot",
    props:{
        info:Object,
        duration:Number,
    },
    data() {
        return {
            isActive:false,
        }
    },
    mounted(){
        
    },
    methods:{
        dotClickInDot(){
            this.$emit('dotClickInCon',this.info.time)
        },
        dotMouseOver(){
            this.isActive=true
        },
        dotMouseLeave(){
            this.isActive=false
        }
    },
    watch:{
        duration:function(newVal){
            let percent = this.info.time/newVal
            this.$refs.dot.style = `left:${percent*100}%;`
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
    
}
</script>
<style lang="scss">
    .dot{
        position: absolute;
        width:.6rem;
        height:.6rem;
        border:.1rem solid white;
        background: black;
        border-radius: 100%;
        transform: translate(0,-.7rem);
        transition: .3s;
    }

    .dot-active{
        background:red;
    }
    
    .dot-tip{
        position: absolute;
        width:2rem;
        left:-.7rem;
        height:1rem;
        top:-1.5rem;
        background:rgba(0,0,0,.8);
        border-radius: .2rem;
        color: white;
        font-family: 'Courier New', Courier, monospace;
        font-size: .4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 0.3rem 0.05rem white;

    }

    .fade-enter,.fade-leave-active{
        opacity: 0;
        transition: .5s;

    }
    .fade-enter-active,.fade-leave{
        opacity: 1;
        transition: .5s;

    }

    
</style>