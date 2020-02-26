<template>
    <div class="choice-alert">
        <div class="title">单选题:</div>
        <div class="content">请问我们做的是啥?</div>
        <div class="choice-item">

        </div>
    </div>
</template>
<script>
export default {
   data() {
       return {
           list:[
               '做老八秘制汉堡',
               '做老9秘制汉堡',
               '做猪肚',
               '做猪肉'
           ],
           rightChoice:3
       }
   },
   props:{

   }
}
</script>
<style lang="scss">
    
    .choice-alert{
        width:90%;
        height:90%;
        margin-left: 50%;
        margin-top: 50%;
        transform: translate(-50%,-60%);
        font-family: 'Courier New', Courier, monospace;
    }
    
    .title{
        width: 100%;
        padding-bottom:.5rem;
        border-bottom: .05rem solid #9C9C9C;
        font-weight: bold;
        color:#9C9C9C;
        font-size: .8rem;
    }

    .content{
        padding:.5rem 0 1rem 0;
    }

    .choice-item{
        
    }
</style>