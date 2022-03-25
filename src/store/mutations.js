import Vue from "vue"
import { SAVEUSERINFO,LOGOUT,GETSHOPGOODS,GETCOMMENTS,GETHEADER,ADDFOOD,CLEARCART } from "./mutation-types"

export default {
  [SAVEUSERINFO](state, {userinfo}) {
    state.userInfo = userinfo
  },
  [LOGOUT](state) {
    state.userInfo = ''
  },
  [GETSHOPGOODS](state, {foods}) {
    state.foods = foods
  },
  [GETCOMMENTS](state, {comments}) {
    state.comments = comments
  },
  [GETHEADER](state, {shop}) {
    state.shop = shop
  },
  [ADDFOOD](state, {index, isAdd}) {
    // 如果count是变量才不需要加引号
    // 对象本来是响应式的，如需要加的是响应式属性，那么需要使用vue的set方法
    if (isAdd) {
      // state.cartfoods = []

      // 数量+1，需要先判断是否已经有数量了
      state.foods[index].count ? state.foods[index].count++ : Vue.set(state.foods[index], 'count', 1)

      if (state.cartfoods.indexOf(state.foods[index]) >= 0) {
        // 先清除购物车中已有的同款食品
        // let indexc = state.cartfoods.indexOf(state.foods[index])
        // state.cartfoods[indexc].count++

        // 已经添加进购物车的不需要处理了，因为食品本来就与foods有对应关系
      } else {
        // 添加进购物车
        state.cartfoods.push(state.foods[index])
      }

      // 每点击一次就遍历一次【哭笑】
      // for (let item of state.foods) {
      //   if (item.count) {
      //     state.cartfoods.push(item)
      //   }
      // }
    } else {
      // 数量-1，等于零的时候-按钮会自动隐藏
      if (state.foods[index].count > 0) {
        state.foods[index].count--
        // 为什么点击-的时候，cartfoods也会跟随变化？？因为foods里面的和cartfoods里面的是有映射的

        // 只有数量等于0的时候才对购物车数据做移除，不等于0的时候还有数量不能做移除
        if (state.foods[index].count === 0 ) {
          let food = state.foods[index]
          // 从购物车中删除某条数据
          state.cartfoods.splice(state.cartfoods.indexOf(food), 1)
        }
      }
    }
  },
  // 清空购物车
  [CLEARCART](state) {
    // 先将数量变为0
    state.cartfoods.forEach(food => food.count = 0)
    state.cartfoods = []
  }
}