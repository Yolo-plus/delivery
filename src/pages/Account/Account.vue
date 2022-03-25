<template>
  <div style="padding-left: 15px; padding-right: 15px">
    <HeaderTop :title="title">
      <nav class="shop-nav" slot="left">
        <a href="javascript:void(0)" class="back" @click="clear">
          <i class="iconfont icon-arrow_left"></i>
        </a>
      </nav>
    </HeaderTop>
    <div style="width: 100%; height: 45px"></div>
    <div class="container" style="padding: 10px 0 0 0">
      <button
        class="btn btn-success"
        data-toggle="modal"
        data-target="#myModal"
      >
        添加收货地址
      </button>
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
              <h4 class="modal-title">添加收货地址</h4>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label style="margin-bottom: 10px">姓名：</label>
                  <!-- form-control  使元素宽度变为100%-->
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请输入姓名"
                    v-model="name"
                  />
                </div>
                <div class="form-group">
                  <label style="margin-bottom: 10px">手机号：</label>
                  <!-- form-control  使元素宽度变为100%-->
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请输入手机号"
                    v-model="phone"
                  />
                </div>
                <div class="form-group">
                  <label style="margin-bottom: 10px">收货地址：</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请输入收货地址"
                    v-model="address"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-danger" data-dismiss="modal">取消</button>
              <button class="btn btn-success" @click="pushaddress">添加</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 style="margin: 10px 2px 5px">配送地址：</h4>
    <div style="margin: 0 2px">
      <ul>
        <li
          style="width: 100%; margin-bottom: 5px"
          v-for="item in alladdress"
          :key="item.id"
        >
          <label style="line-height: 20px; position: relative;">
            <input type="radio" v-model="address_id" :value="item.id" style="position: absolute;"/>
            <span style="display: block; margin-left: 16px;">{{ item.name }},{{ item.phone }},{{ item.address }}</span>
          </label>
        </li>
      </ul>
    </div>
    <h4 style="margin: 10px 2px 0">所购食品：</h4>
    <div class="list-content">
      <ul>
        <li class="food" v-for="item in cartfoods" :key="item.id">
          <span class="name">{{ item.name }}</span>
          <div class="price">
            <span>￥{{ item.price }}</span>
            <span style="color: #7e8c8d; margin-left: 5px"
              >数量：{{ item.count }}</span
            >
          </div>
          <!-- <div class="cartcontrol-wrapper">
            需要传递两个参数
            <CartControl :food="item" :index="foods.indexOf(item)"/>
          </div> -->
        </li>
      </ul>
    </div>
    <div style="margin: 10px 2px 0">
      <a href="javascript:void(0)" style="margin-top:8px">总计：{{ totalPrice }}元</a>
      <button
        type="button"
        class="btn btn-success"
        style="float: right"
        @click="submitorder"
      >
        {{ orderadd }}
      </button>
    </div>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { mapState, mapGetters } from "vuex";
import { addaddress, useraddress, addorder, addorderinfo } from "../../api";
import { Toast } from "mint-ui";
import CartControl from "../../components/CartControl/CartControl.vue";

export default {
  components: {
    HeaderTop,
    CartControl,
  },
  data() {
    return {
      title: "结算",
      name: "",
      phone: "",
      address: "",
      alladdress: [],
      address_id: "",
    };
  },
  computed: {
    ...mapState(["userInfo", "cartfoods", "foods"]),
    ...mapGetters(["totalPrice"]),
    orderadd() {
      if (this.totalPrice === 0) {
        return "请先添加食品";
      } else if (!this.address_id) {
        return "请选择配送地址";
      } else {
        return "提交";
      }
    },
  },
  inject: ["reload"],
  methods: {
    async pushaddress() {
      let name = this.name;
      let phone = this.phone;
      let address = this.address;
      let u_name = this.userInfo;

      let res = await addaddress(name, phone, address, u_name);
      if (res.msg === "ok") {
        Toast({
          message: "添加成功",
          position: "top",
        });
        // 刷新页面
        // this.$router.go(0);
        // 局部刷新
        this.reload();
        $("#myModal").modal("hide");
      }
    },
    async submitorder(e) {
      if (e.target.innerText === "请先添加食品") {
        let id = this.$route.params.u_name.split(' ')[1]

        this.$router.replace(`/shop/goods/${id}`);
        // this.$router.back()
      } else if (e.target.innerText === "请选择配送地址") {
        Toast({
          message: "请选择配送地址",
        });
      } else {
        let randomNum;

        do {
          randomNum = Math.random();
        } while (randomNum < 0.1);

        let order = Math.floor(randomNum * 100000000);
        let total = this.totalPrice;
        let name = this.userInfo;
        let address_id = this.address_id;
        let shop_id = this.$route.params.u_name.split(' ')[1]  // 商家id

        // 生成订单
        let res = await addorder(order, total, name, address_id, shop_id);

        // 生成订单详情
        if (res.msg === "ok") {
          // 将当前购物车的数据都插入到订单详情中
          this.cartfoods.forEach((item) => {
            let food = item.name;
            let pic = item.pic;
            let count = item.count;
            let order_id = res.insertid;

            // 不需要使用this
            addorderinfo(food, pic, count, order_id)
              .then((res) => {
                if (res.msg === "ok") {
                  this.$store.dispatch('clearcart')

                  this.$router.replace("/order");
                }
              })
              .catch(() => {});
          });
        }
      }
    },
    clear() {
      this.$store.dispatch('clearcart')

      this.$router.back()
    }
  },
  async mounted() {
    // 刷新页面this.userInfo值会消失，最好通过路由组件传值
    // console.log(this.userInfo)
    let u_name = this.$route.params.u_name.split(' ')[0];
    this.alladdress = await useraddress(u_name);
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.shop-nav {
  background-size: cover;
  background-repeat: no-repeat;
  height: 35px;
  padding: 5px 10px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #02A774;
  }

  .back {
    position: absolute;
    top: 7.5px;
    left: 10px;

    .icon-arrow_left {
      display: block;
      padding: 5px;
      font-size: 20px;
      color: #fff;
    }
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
      right: 0;
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
</style>