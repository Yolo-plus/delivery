<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count" @click="addFood(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click="addFood(true)"></div>
  </div>
</template>

<script>
export default {
  // 单个商家下每个食品所点的数量
  props: {
    food: Object,
    index: Number
  },
  methods: {
    // 一开始想的是直接保存在组件内，后来是保存在食品对象内
    addFood(isAdd) {
      let index = this.index
      // 传递当前食品的下标和加还是减
      this.$store.dispatch('addfood', {index, isAdd})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.cartcontrol {
  font-size: 0;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .icon-remove_circle_outline {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: $green;

    // 进入和离开的过程
    &.move-enter-active,&.move-leave-active {
      transition: all 1s;
    }

    &.move-enter,&.move-leave-to {
      opacity: 0;
      transform: translateX(15px) rotate(180deg);  // 进入和离开的位置是一样的
    }
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .icon-add_circle {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: $green;
  }
}
</style>