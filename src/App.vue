<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <main-video ></main-video>
    <tabs style="margin-top:2rem"></tabs>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MainVideo from '@/components/MainVideo'
import Tabs from '@/components/pageCon/Tabs'
export default {
  name: 'app',
  components: {
    // HelloWorld
    MainVideo,
    Tabs
  },
  beforeCreate() {
    let that = this
    this.axios.get('http://127.0.0.1:5500/p')
  .then(function (response) {
    // handle success
    console.log(response.data);
    that.$store.commit("setState",response.data)
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  },
}
</script>

<style lang="scss">

</style>


