import { SAVEUSERINFO,LOGOUT,GETSHOPGOODS,GETCOMMENTS,GETHEADER,ADDFOOD,CLEARCART } from "./mutation-types"
import { getcookie,vuelogout,vueshopgoods,vuecomments,vueshop } from "../api"  // 默认是index

export default {
  saveuserinfo({commit}, userinfo) {
    commit(SAVEUSERINFO, {userinfo})
  },
  async cookiecheck({commit}) {
    let result = await getcookie()
    let userinfo = result.msg1  // 不能直接写在花括号里面

    commit(SAVEUSERINFO, {userinfo})
  },
  // 前台退出
  async logout({commit}) {
    // 清除cookie
    let result = await vuelogout()

    // 清除userinfo
    if (result.msg === 0) {
      commit(LOGOUT)
    }
  },
  // 获取单个商家食品数据，并保存
  async getshopgoods({commit}, id) {
    let foods = await vueshopgoods(id)
    
    // 保存数据
    commit(GETSHOPGOODS, {foods})
  },
  async getcomments({commit}, id) {
    // 获取数据
    let comments = await vuecomments(id)

    // 保存数据
    commit(GETCOMMENTS, {comments})
  },
  async getheader({commit}, id) {
    // 获取数据
    let shop = await vueshop(id)

    // 保存数据
    commit(GETHEADER, {shop})
  },
  addfood({commit}, {index, isAdd}) {
    commit(ADDFOOD, {index, isAdd})
  },
  // 清空购物车
  clearcart({commit}) {
    commit(CLEARCART)
  }
}