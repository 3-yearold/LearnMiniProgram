// components/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currenIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e){
      this.setData({
        currenIndex:e.currentTarget.dataset.index
      })
      const data = {index: this.data.currenIndex}
      this.triggerEvent("tabclick",data,{})
    }
  }
})
