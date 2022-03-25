import ajax from './ajax'

const BASE_URL = "/api"

// 获取商家列表
export default () => ajax(`${BASE_URL}/vueShoplist`)
// 注册
export const register =  (name, password) => ajax(`${BASE_URL}/register`, {name, password}, 'POST')  // 传递的参数其实是name:name的省略形式
export const loginusers = (name, password) => ajax(`${BASE_URL}/loginusers`, {name, password}, 'POST')
export const getcookie = () => ajax(`${BASE_URL}/cookiecheck`)
export const vuelogout = () => ajax(`${BASE_URL}/vuelogout`)
export const vueshopgoods = (id) => ajax(`${BASE_URL}/vueshopgoods`, {id})
// 获取单个商家的评论数据
export const vuecomments = (id) => ajax(`${BASE_URL}/vuecomments`, {id})
// 获取商家信息
export const vueshop = (id) => ajax(`${BASE_URL}/vueshop`, {id})
// 添加收货地址
export const addaddress = (name, phone, address, u_name) => ajax(`${BASE_URL}/addaddress`, {name, phone, address, u_name}, 'POST')
// 获取用户收货地址
export const useraddress = (u_name) => ajax(`${BASE_URL}/useraddress`, {u_name})
// 添加订单
export const addorder = (order, total, name, address_id, shop_id) => ajax(`${BASE_URL}/addorder`, {order, total, name, address_id, shop_id}, 'POST')
// 订单详情
export const addorderinfo = (food, pic, count, order_id) => ajax(`${BASE_URL}/addorderinfo`, {food, pic, count, order_id}, 'POST')
// 获取登录用户订单数据
export const userorderlist = (name) => ajax(`${BASE_URL}/userorderlist`, {name})
export const vueorderinfo = (order_id) => ajax(`${BASE_URL}/vueorderinfo`, {order_id})
export const userinfo = (name) => ajax(`${BASE_URL}/userinfo`, {name})
// 查询
export const inputsearch = (content) => ajax(`${BASE_URL}/inputsearch`, {content})
// 评价
export const commentadd = (name,comment,content_time,shoplist_id,o_orderme) => ajax(`${BASE_URL}/commentadd`, {name,comment,content_time,shoplist_id,o_orderme})
// 获取单条评价
export const commentget = (orderme) => ajax(`${BASE_URL}/commentget`, {orderme})
