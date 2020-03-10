import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dotArray: [
      {
        time:1,
        alertContent:{
          type:'choice',
          isAnswered:false
        }
      },
      {
        time: 5,
        alertContent:{
          type:'choice',
          isAnswered:false

        }
      },
      {
        time: 150,
        alertContent:{
          type:'choice',
          isAnswered:false

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
