<template>
  <div>
    <HeaderTop title="个人中心">
      <a
        href="javascript:void(0)"
        class="back"
        @click="$router.back()"
        slot="left"
      >
        <i class="iconfont icon-arrow_left"></i>
      </a>
    </HeaderTop>

    <div class="content">
      <div class="detail">
        <div :style="`background-image:url(https://delivery-yolo.oss-cn-beijing.aliyuncs.com/${message.pic || 'southeast.jpg'})`">

        </div>
        <ul class="block">
          <li>姓名：{{ message.name ? message.name : "暂无姓名" }}</li>
          <li>手机：{{ message.phone ? message.phone : "暂无手机" }}</li>
          <li>邮箱：{{ message.email ? message.email : "暂无邮箱" }}</li>
          <li>兴趣：{{ message.hobby ? message.hobby : "暂无兴趣" }}</li>
        </ul>
      </div>

      <div class="edit">
        <mt-button
          type="primary"
          style="width: 100%"
          href="###"
          data-toggle="modal"
          data-target="#myModal"
          >编辑</mt-button
        >
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
              <h4 class="modal-title">编辑信息</h4>
            </div>
            <div class="modal-body">
              <form :action="`${message.name ? '/api/updateuser' : '/api/insertuserinfo'}`" method="post" enctype="multipart/form-data">
                <div class="form-group">
                  <label style="margin-bottom:10px">头像：</label>
                  <!-- form-control  使元素宽度变为100%-->
                  <!-- 没有信息 -->
                  <input
                    type="file"
                    name="pic"
                    class="form-control"
                    style="padding-top: 4px;"
                    v-if="!message.name"
                  />
                  <!-- 编辑已有信息 -->
                  <div v-else>
                    <input type="image" :src="`https://delivery-yolo.oss-cn-beijing.aliyuncs.com/${message.pic}`" style="width:80px;margin-left:12px;">
                    <input
                      type="file"
                      name="pic"
                      class="form-control"
                      style="padding-top: 4px;margin-top:6px;"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label style="margin-bottom:10px">姓名：</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请输入姓名"
                    name="name"
                    required
                    v-if="!message.name"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改姓名"
                    name="name"
                    required
                    :value="message.name"
                    v-else
                  />
                </div>
                <div class="form-group">
                  <label style="margin-bottom:10px">手机：</label>
                  <!-- form-control  使元素宽度变为100%-->
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请输入手机"
                    name="phone"
                    required
                    v-if="!message.name"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改手机"
                    name="phone"
                    required
                    :value="message.phone"
                    v-else
                  />
                </div>
                <div class="form-group">
                  <label style="margin-bottom:10px">邮箱：</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请输入邮箱"
                    name="email"
                    required
                    v-if="!message.name"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改邮箱"
                    name="email"
                    required
                    :value="message.email"
                    v-else
                  />
                </div>
                <div class="form-group">
                  <label style="margin-bottom:10px">爱好：</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请输入爱好"
                    name="hobby"
                    required
                    v-if="!message.name"
                  />
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请修改爱好"
                    name="hobby"
                    required
                    :value="message.hobby"
                    v-else
                  />
                </div>
                <input type="text" v-show="false" name="id" :value="message.id">
                <input type="text" v-show="false" name="u_name" :value="$route.params.userInfo">
                <div class="modal-footer">
                  <button class="btn btn-danger" data-dismiss="modal">
                    取消
                  </button>
                  <input
                    type="submit"
                    value="添加"
                    class="btn btn-success"
                    v-if="!message.name"
                  />
                  <input
                    type="submit"
                    value="确定"
                    class="btn btn-success"
                    v-else
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="login-out">
        <mt-button type="danger" style="width: 100%" href="###" @click="logout"
          >退出</mt-button
        >
      </div>
      <footer></footer>
    </div>
  </div>
</template>

<script>
import { userinfo} from "../../api";
import { MessageBox } from "mint-ui";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";

export default {
  data() {
    return {
      message: {}
    };
  },
  components: {
    HeaderTop,
  },
  // 获取userinfo
  async mounted() {
    let name = this.$route.params.userInfo;
    let res = await userinfo(name);

    this.message = res;
  },
  methods: {
    logout() {
      MessageBox.confirm("确定退出？").then(
        (action) => {
          // console.log(action)
          // 分发动作
          this.$store.dispatch("logout");
          this.$router.replace("/login");
        },
        (action) => {
          // console.log(action)
        }
      );
    },
  },
};
</script>

<style scoped>
@charset "utf-8";
body {
  margin: 0;
  padding: 0;
  background-color: #eeeeee;
  font-family: "微软雅黑";
}

ul {
  list-style: none;
  margin: 10px 0 0 110px;
  padding: 0;
}

ul > li {
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

header {
  width: 100%;
  height: 3em;
  background-color: #02a774;
  color: white;
}

header p {
  text-align: center;
  line-height: 3em;
}

.content {
  padding-top: 45px;
  width: 100%;
  background-color: #ffffff;
  padding-left: 15px;
  padding-right: 15px;
}

.detail {
  background-color: #ffffff;
  height: auto;
  padding-top: 10px;
  position: relative;
}

.detail > div {
  width: 100px;
  height: 140px;
  border: 1px solid #ccc;
  position: absolute;
  left: 0;
  top: 10px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.edit {
  background-color: #ffffff;
  width: 100%;
  margin-top: 100px;
}

.login-out {
  background-color: #ffffff;
  width: 100%;
  margin-top: 10px;
}

.footer {
  width: 100%;
  height: 2em;
  background-color: rgb(75, 75, 75);
}

a {
  text-decoration: none;
  display: inline-block;
  height: 2em;
  text-align: center;
  width: 100%;
  line-height: 2em;
  color: black;
}

.back {
  position: absolute;
  top: 22.5px;
  left: 0;
  transform: translateY(-50%);
  text-align: left;
}
.icon-arrow_left {
  display: block;
  font-size: 20px;
  color: #fff;
  margin-left: 12px;
}
</style>