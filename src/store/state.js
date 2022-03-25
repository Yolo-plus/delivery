export default {
  userInfo: '',  // 保存用户注册或者登录的信息
  foods: [],  // 单个商家食品数据，点击添加时候保存有数量
  comments: [],  // 单个商家评论数据
  shop: {},  // 商家信息
  cartfoods: [],  // 单个商家购物车数据（点击过+的），cartfoods只是foods延伸出来的数据，并不需要保存在数据库
}