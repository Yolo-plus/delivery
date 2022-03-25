<template>
  <div>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">外卖</h2>
          <div class="login_header_title">
            <a
              href="javascript:;"
              :class="{ on: showRegister }"
              @click="showRegister = true"
              >注册</a
            >
            <a
              href="javascript:;"
              :class="{ on: !showRegister }"
              @click="showRegister = false"
              >登录</a
            >
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="fn1" method="post">
            <div :class="{ on: showRegister }">
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="请输入2-6位任意汉字、数字、字母、下划线"
                  v-model="name1"
                />
              </section>
              <section class="login_verification">
                <input
                  type="password"
                  maxlength="8"
                  placeholder="请输入6-14位任意数字、字母、下划线"
                  v-model="password1"
                />
              </section>
              <button class="login_submit">注册</button>
              <section class="login_hint">
                温馨提示：未注册起点外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
              <a href="javascript:;" class="about_us">关于我们</a>
            </div>
          </form>

          <form @submit.prevent="fn2" method="post">
            <div :class="{ on: !showRegister }">
              <section>
                <section class="login_message">
                  <input
                    type="text"
                    maxlength="11"
                    placeholder="用户名"
                    v-model="name2"
                  />
                </section>
                <section class="login_verification">
                  <input
                    type="text"
                    maxlength="8"
                    placeholder="密码"
                    v-if="showpwd"
                    v-model="password2"
                  />
                  <input
                    type="password"
                    maxlength="8"
                    placeholder="密码"
                    v-else
                    v-model="password2"
                  />

                  <!-- on/off控制颜色 -->
                  <div
                    class="switch_button"
                    :class="showpwd ? 'on' : 'off'"
                    @click="showpwd = !showpwd"
                  >
                    <div
                      class="switch_circle"
                      :class="{ right: showpwd }"
                    ></div>
                    <span class="switch_text"></span>
                  </div>
                </section>
              </section>
              <input type="submit" value="登录" class="login_submit"/>
            </div>
          </form>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>

      <!-- 提示框 -->
      <AlertTip
        v-show="alertShow"
        :alertText="alertText"
        @closeTip="closeTip"
      ></AlertTip>
    </section>
  </div>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip.vue"
import { register, loginusers } from "../../api/index"

export default {
  data() {
    return {
      showRegister: false,
      showpwd: false,
      name1: "",
      password1: "",
      name2: "",
      password2: "",
      alertShow: false,
      alertText: "",
    };
  },
  methods: {
    async fn1() {
      // 用户名必须是2-6位任意汉字数字字母下划线
      if (!/^[A-Za-z0-9_\u4E00-\u9FA5]{2,6}$/.test(this.name1)) {
        this.alertShow = true
        this.alertText = "用户名必须是2-6位任意汉字、数字、字母、下划线"
        return;
      }

      // 密码必须是6-14位任意数字字母下划线
      if (!/^\w{6,14}$/.test(this.password1)) {
        this.alertShow = true
        this.alertText = "密码必须是6-14位任意数字、字母、下划线"
        return;
      }

      const res = await register(this.name1, this.password1)
      // console.log(res)

      if (res.msg == "ok") {
        // 分发动作，将user保存到vuex的state
        this.$store.dispatch('saveuserinfo', this.name1)

        // 去个人中心界面
        this.$router.replace("/profile")
        // 清空值
        this.name1 = ""
        this.password1 = ""
      }
    },
    async fn2() {
      const res = await loginusers(this.name2, this.password2)
      // console.log(res)

      if (res.msg === "usernameiserror") {
        this.alertShow = true
        this.alertText = "用户名有误"
        return;
      }

      if (res.msg === "userpassiserror") {
        this.alertShow = true
        this.alertText = "密码有误"
        return;
      }

      if (res.msg === "ok") {
        this.$store.dispatch('saveuserinfo',this.name2)
        // 去个人中心界面
        this.$router.replace("/profile")

        this.name2 = ""
        this.pass2 = ""
      }
    },
    closeTip() {
      this.alertShow = false
      this.alertText = ""
    },
  },
  components: {
    AlertTip,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
              }

              // 控制圆点左右滑动
              >.right {
                transform: translateX(14px);
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        position: fixed;
        bottom: 50px;
        left 50%
        transform translateX(-50%)
        font-size: 12px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 22.5px;
      left: 15px;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
      line-height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>