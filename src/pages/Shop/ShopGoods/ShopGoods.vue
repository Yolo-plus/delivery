<template>
  <div>
    <div class="goods">
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook">
            <h1 class="title">商品名字</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(item, index) in foods" :key="item.id">
                <div class="icon">
                  <img width="57" height="57" v-lazy="`https://delivery-yolo.oss-cn-beijing.aliyuncs.com/${item.pic}`" />
                </div>
                <div class="content">
                  <h2 class="name">{{item.name}}</h2>
                  <p class="desc">{{item.descs}}</p>
                  <div class="extra">
                    <span class="count">月售10份</span>
                    <span>好评率90%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{item.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!-- 传递每个食品数据及其下标 -->
                    <CartControl :food="item" :index="index"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 传递商家id -->
      <ShopCart :id="$route.params.id"/>
    </div>
  </div>
</template>


<script>
import {mapState} from 'vuex'
import CartControl from '../../../components/CartControl/CartControl.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue'

export default {
  data() {
    return {};
  },
  components: {
    CartControl,
    ShopCart
  },
  computed: {
    ...mapState(['foods'])
  },
  mounted() {
    let id = this.$route.params.id

    // 分发获取食品数据动作
    this.$store.dispatch('getshopgoods', id)
    this.$store.dispatch('clearcart')
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;
    overflow: scroll;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
