<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <!-- 点击上拉下拉 -->
          <div class="logo-wrapper" @click="toggleList">
            <!-- highlight 控制购物车样式显示隐藏 -->
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: totalCount}"></i>
            </div>
            <!-- 角标 -->
            <div class="num">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{shopinfo.fee}} 元</div>
        </div>
        <div class="content-right">
          <!-- not-enough 未达起送费样式 -->
          <div class="pay" :class="classText" @click="account">{{payText}}</div>
        </div>
      </div>
      <!-- 是否上拉：绑定计算属性 -->
      <div class="shopcart-list" v-if="showList">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <!-- 清空购物车 -->
          <span class="empty" @click="clearcart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="item in cartfoods" :key="item.id">
              <span class="name">{{item.name}}</span>
              <div class="price"><span>￥{{item.price}}</span></div>
              <div class="cartcontrol-wrapper">
                <!-- 传递的是购物车中的食品数据，相当已经过滤了count为0的数据，但是使用CartControl还需要传递index -->
                <CartControl :food="item" :index="foods.indexOf(item)"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- v-if和上拉下拉同步，点击和点击上拉下拉一样 -->
    <div class="list-mask" v-if="showList" @click="toggleList"></div>
  </div>
</template>

<script>
import {vueshop} from '../../api/index'
import {mapGetters,mapState} from 'vuex'
import CartControl from '../CartControl/CartControl.vue'
import {MessageBox,Toast} from 'mint-ui'

export default {
  props: {
    id: String
  },
  data() {
    return {
      shopinfo: {},
      isShow: false,
    }
  },
  components: {
    CartControl
  },
  computed: {
    // 初步想法是监听变化，后面更好的方法是直接在vuex中定义一个变量当点击加减的时候存储购物车的数据
    // 获取商家食品数据
    ...mapGetters(['totalCount','totalPrice']),
    ...mapState(['cartfoods','foods','userInfo','shop']),
    // 逻辑较强
    showList() {
      if (this.totalCount === 0) {
        this.isShow = false  // 需要归零，否则下一次点开的时候会受影响
        return false
      } else {
        // 数量大于0的时候随便点击上拉下拉，数量等于0的时候不显示
        return this.isShow
      }
    },
    payText() {
      // 假设配送费的10倍是起送费
      let startFee = this.shopinfo.fee * 10
      // 有三个返回值，所以加3个条件
      if (this.totalPrice === 0) {
        return `起送费为￥${startFee}元`
      } else if (this.totalPrice >= startFee) {
        return '结算'
      } else {
        return `还差￥${startFee - this.totalPrice}元起送`
      }
    },
    classText() {
      let startFee = this.shopinfo.fee * 10

      if (this.totalPrice >= startFee) {
        return 'enough'
      } else {
        return 'not-enough'
      }
    }
  },
  methods: {
    toggleList() {
      // 细节
      if (this.totalCount > 0) {
        this.isShow = !this.isShow
      }
    },
    clearcart() {
      MessageBox.confirm('清空购物车？').then((action) => {
        // console.log('sure')
        this.$store.dispatch('clearcart')
      }, ()=>{

      })
    },
    account(e) {
      let fee = this.shopinfo.fee * 10
      if (e.target.innerText === '结算') {
        // 判断是否登录
        if (this.userInfo) {
          // console.log('已经登录')
          let userInfo = this.userInfo + ' ' + this.shop.id

          this.$router.push(`/account/${userInfo}`)
        } else {
          Toast({
            message: '请先登录',
            position: 'top'
          })
          this.$router.replace('/login')
        }
      } else {
        Toast(`起送费为${fee}元`)
      }
    }
  },
  async mounted() {
    let res = await vueshop(this.id)

    this.shopinfo = res
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: $green;
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: $green;
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%);

    &.move-enter-active, &.move-leave-active {
      transition: transform 0.3s;
    }

    &.move-enter, &.move-leave-to {
      transform: translateY(0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
        margin-top: 13px;
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        bottom-border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>