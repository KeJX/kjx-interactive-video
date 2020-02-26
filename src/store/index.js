import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dotArray: [
      {
        time:1,
        alertContent:{
          type:'choice'
        }
      },
      {
        time: 200,
        alertContent:{
          type:'question'
        }
      },
      {
        time: 150,
        alertContent:{
          type:'choice'
        }
      }
    ],
    // 是否显示
    showAlert:{
      choice:true,
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
    }
  },
  actions: {
  },
  modules: {
  }
})
