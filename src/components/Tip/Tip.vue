<template>
    <div class="tip" :class="{'tip-active':isShowContent}"  @mouseenter="showContent" @mouseleave="hideContent">
        <transition name="fade">
            <div v-show="isShowContent" class="tip-content" >
                {{content}}
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name:"Tip",
    data() {
        return {
            isShowContent:false
        }
    },
    props:{
        content:String
    },
    methods: {
        showContent(){
            console.log(1)
            this.isShowContent = true
        },
        hideContent(){
            this.isShowContent = false
        }
    },
}
</script>
<style lang="scss">
.tip{
    height:1rem;
    width:1rem;
    border-radius: 50%;
    background:black;
    border:.2rem solid white;
    cursor: pointer;
}
.tip-content{
    position: absolute;
    right:-11rem;
    min-height:5rem;
    width: 10rem;
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 13px 19px 16px 4px #787878;
    padding:1rem;
    z-index: 100;
}

.tip-active{
    background-color: rgb(66, 190, 248);
    transition: .5s;
}
</style>