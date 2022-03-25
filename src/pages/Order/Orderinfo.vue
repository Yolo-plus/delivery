<template>
  <div class="well" style="position: relative">
    <li
      class="food-item bottom-border-1px"
      v-for="item in orderinfo"
      :key="item.id"
    >
      <div class="icon">
        <img
          width="67"
          :src="`https://delivery-yolo.oss-cn-beijing.aliyuncs.com/` + item.pic"
          style="display: block"
        />
      </div>
      <div class="content">
        <h2 class="name">{{ item.food }}</h2>
        <div class="cartcontrol-wrapper" style="font-size: 14px">
          数量：{{ item.count }}
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import { vueorderinfo } from "../../api";

export default {
  props: {
    idinfo: String,
  },
  data() {
    return {
      orderinfo: [],
    };
  },
  async mounted() {
    let id = this.idinfo.slice(10) * 1;
    this.orderinfo = await vueorderinfo(id);
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.well {
  padding: 15px;
  margin-bottom: 0;
}

.food-item {
  display: flex;
  // margin: 5px;
  padding-bottom: 10px;
  padding-top: 10px;
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
</style>