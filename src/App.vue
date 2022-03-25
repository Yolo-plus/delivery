<template>
  <div>
    <router-view v-if="isRouterAlive"></router-view>
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";

export default {
  components: {
    FooterGuide,
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  provide() {
    // 提供
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      });
    },
  },
  mounted() {
    this.$store.dispatch("cookiecheck"); // 通过cookie赋值
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>