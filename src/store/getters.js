export default {
  // 总数量
  totalCount(state) {
    // 使用reduce遍历购物车数据，0是初始值，preC上一次计算的值，food为每次遍历出来的数据
    return state.cartfoods.reduce((preC, food) => { return preC + food.count }, 0)
  },
  // 总价格
  totalPrice(state) {
    return state.cartfoods.reduce((preP, food) => { return preP + food.count * food.price }, 0)
  }
}