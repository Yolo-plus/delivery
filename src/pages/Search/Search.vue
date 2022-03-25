<template>
  <section class="search">
    <HeaderTop title="搜索"></HeaderTop>
    <form class="search_form" @submit.prevent="handleSubmit">
      <input
        type="search"
        name="search"
        placeholder=" 请输入商家或美食名称"
        class="search_input"
        v-model="inputCont"
        autocomplete="off"
      />
      <input type="submit" class="search_submit" />
    </form>

    <div class="well" v-show="isShow">
      <ul v-if="resarr.length">
        <li v-for="item in resarr" :key="item.id">
          <router-link :to="`/shop/goods/${item.shoplist_name ? item.shoplist_id : item.id}`">
            {{item.shoplist_name ? '（食品）' : '（商家）'}}<span style="color:black">{{item.name}}</span>
          </router-link>
        </li>
      </ul>

      <ul v-else>
        <li>无数据</li>
      </ul>
    </div>
  </section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import {inputsearch} from '../../api'

export default {
  data() {
    return {
      inputCont: '',
      resarr: [],
      isShow: false,
    }
  },
  components: {
    HeaderTop
  },
  computed: {

  },
  methods: {
    async handleSubmit () {
      if (this.inputCont) {
        this.isShow = true

        let res = await inputsearch(this.inputCont)
        
        this.resarr = res
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.well {
  padding: 15px;
  margin: 0 15px;
}

.well > ul > li {
  margin-bottom: 5px;
}

.well > ul > li:last-child {
  margin-bottom: 0;
}

.search { // 搜索
  width: 100%;
  padding-top: 45px

  .search_form {
    clearFix();
    // margin-top: 45px;
    background-color: #fff;
    padding: 12px 15px;

    input {
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: normal;
      outline: none;

      &.search_input {
        float: left;
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 14px;
        color: #333;
        background-color: #f2f2f2;
      }

      &.search_submit {
        float: right;
        width: 18%;
        border: 4px solid #02a774;
        font-size: 16px;
        color: #fff;
        background-color: #02a774;
      }
    }
  }
}
</style>