import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dotArray: [
     
      {
        time: 5,
        alertContent:{
          type:'choice',
          isAnswered:false,
          title:"今天我们要做的菜名？",
          list: ["香葱烧肚条", "大蒜烧肚条", "葱油猪肚", "大蒜炒肉条"],
          rightChoice:1,
          finalChoice:-1,
        }
      },
      {
        time:56,
        alertContent:{
          type:'question',
          isAnswered:false,
          title:"回答出刚刚提到的三个注意点",
          finalAnswer:''
        }
      },
      
    ],
    // 显示哪种弹窗
    showAlert:{
      choice:false,
      question:false
    },
    tipArray:[
      {
        startTime:1,
        endTime:9,
        content:"1-5"
      },
      {
        startTime:10,
        endTime:15,
        content:"10-15"
      }
    ]

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
