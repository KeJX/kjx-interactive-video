import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dotArray: [
      {
        time:1,
        alertContent:{
          type:'question',
          isAnswered:false,
          finalAnswer:''
        }
      },
      {
        time: 5,
        alertContent:{
          type:'choice',
          isAnswered:false,
          list: ["做老八秘制汉堡", "做老9秘制汉堡", "做猪肚", "做猪肉"],
          rightChoice:1,
          finalChoice:-1,
         
        }
      },
      {
        time: 150,
        alertContent:{
          type:'choice',
          isAnswered:false,
          list: ["做老八秘制汉堡", "做老9秘制汉堡", "做猪肚", "做猪肉"],
          rightChoice:1,
          finalChoice:-1,
        }
      }
    ],
    // 是否显示
    showAlert:{
      choice:false,
      question:false
    }
  },
  mutations: {
    reset(state){
      for(let key in state.showAlert){
        state.showAlert[key] = false
      }
    },
    show(state,type){
      state.showAlert[type] = true
    },
    changeIsAnswered(state,index){
      state.dotArray[index].alertContent.isAnswered=true
    }
  },
  actions: {
  },
  modules: {
  }
})
