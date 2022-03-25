<template>
  <section class="order">
    <HeaderTop title="订单列表"></HeaderTop>
    <section class="order_no_login" v-if="!userInfo">
      <img src="./images/person.png" />
      <h3>登录后查看外卖订单</h3>
      <button>
        <router-link to="/login">立即登陆</router-link>
      </button>
    </section>
    <div v-else>
      <!-- 撑开高度 -->
      <div style="width: 100%; height: 45px"></div>
      <!-- 通过计算属性获取登录用户订单数据，不能使用v-if，因为v-if一开始就不会渲染 -->
      <h3 v-show="false">{{ orderlistget }}</h3>
      <div class="container" id="accordion">
        <div style="text-align: center">
          <span style="font-weight: bold">订单号</span>
          <span style="font-weight: bold">总价格</span>
          <span style="font-weight: bold">购买人</span>
          <span style="font-weight: bold; width: 33%">操作</span>
        </div>
        <div v-for="item in orderlist" :key="item.id" class="panel">
          <div style="text-align: center">
            <span>{{ item.orderme }}</span>
            <span>{{ item.total }}</span>
            <span>{{ item.name }}</span>
            <button
              class="btn btn-primary"
              data-toggle="collapse"
              :data-target="`#collapseme${item.id}`"
              data-parent="#accordion"
              style="width: 20%;padding: 3px 6px;"
            >
              订单详情
            </button>
            <button
              class="btn btn-info"
              data-toggle="modal"
              data-target="#myModal"
              style="padding: 3px 6px;"
              @click="saveinfo(item.shop_id,item.orderme)"
              v-if="!item.didcomment"
            >
              评价
            </button>
            <button
              class="btn btn-info"
              data-toggle="modal"
              data-target="#myModal"
              style="padding: 3px 6px;"
              @click="commentpull(item.orderme)"
              v-else
            >
              查看
            </button>
          </div>

          <div
            :id="`collapseme${item.id}`"
            class="collapse"
            style="margin-top: 5px"
          >
            <Orderinfo :idinfo="`collapseme${item.id}`"></Orderinfo>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
            <h4 class="modal-title" v-if="!commentone">编辑评价</h4>
            <h4 class="modal-title" v-else>你的评价</h4>
          </div>
          <div class="modal-body">
            <form @submit.prevent="commentpush">
              <div class="form-group">
                <textarea class="form-control" v-model="comment" v-if="!showComment" required></textarea>
                <textarea class="form-control" :value="commentone.content" disabled v-else></textarea>
              </div>

              <div class="modal-footer">
                <button class="btn btn-danger" data-dismiss="modal">
                  取消
                </button>
                <input type="submit" value="确定" class="btn btn-success" v-if="!showComment"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { mapState } from "vuex";
import { userorderlist,commentadd,commentget } from "../../api";
import Orderinfo from "./Orderinfo.vue";

export default {
  components: {
    HeaderTop,
    Orderinfo,
  },
  data() {
    return {
      orderlist: [],
      comment: '',
      shoplist_id: '',  // 商家id
      o_orderme: '',  // 订单号
      commentone: '',  // 单条评价
      showComment: false,
    };
  },
  // 通过计算属性来获取用户订单
  computed: {
    ...mapState(["userInfo"]),
    async orderlistget() {
      let name = this.userInfo;
      this.orderlist = await userorderlist(name);
    },
  },
  methods: {
    async commentpush () {
      let name = this.userInfo
      let comment = this.comment
      let content_time = new Date().toLocaleString()  // 年月日，时分秒
      let shoplist_id = this.shoplist_id
      let o_orderme = this.o_orderme
      
      let res = await commentadd(name,comment,content_time,shoplist_id,o_orderme)

      if (res.msg === 'ok') {
        $("#myModal").modal("hide")
        this.$router.go(0)
      }
    },
    saveinfo (shop_id, orderme) {
      this.shoplist_id = shop_id
      this.o_orderme = orderme
      this.showComment = false
    },
    async commentpull(orderme) {
      let res = await commentget(orderme)
      this.commentone = res
      this.showComment = true
    }
  },
  // 如果使用mounted的话，刷新的时候name还没有获取到就请求后端数据了
  mounted() {},
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

#accordion {
  padding-bottom: 50px;

  > div > span, > div > div > span {
    display: inline-block;
    width: 20%;
  }

  > div {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}

.panel {
  margin-bottom: 0;
  border: none;
}

.order { // 订单
  width: 100%;

  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;

    >img {
      display: block;
      width: 100%;
      height: 30%;
    }

    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }

    >button {
      display: inline-block;
      background: #02a774;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;

      a {
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
</style>