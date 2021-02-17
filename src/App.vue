<!--
 * @Author: david
 * @Descriptor: 
 * @Date: 2019-12-26 15:24:12
 * @LastEditors: david
 * @LastEditTime: 2020-07-06 23:38:53
 -->
<template>
  <div id="app" class>
    <router-view />
  </div>
</template>
<script>
import { inMain, goMain } from "./utils/public/system";
export default {
  name: "app",
  data() {
    return {
      validate: false
    };
  },
  methods: {
    goLogin() {
      if (inMain()) {
        let params = {
          inner: 1, // 1 为 内部子系统
          path: window.location.href , //当前的路径，前往主系统登录成功后，会自动跳转该路径
        };
        goMain("/login", params);
      } else {
        this.$router.push({
          path: "/login",
          query: { back: "1" }
        });
      }
    },
    open(status) {
      if (!status) return; // 只在
      this.$confirm("token已失效, 是否重新登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.goLogin();
        })
        .catch(() => {
          this.$store.commit("setTokenAuth", true);
        });
    }
  },
  watch: {
    "$store.state.tokenAuth": {
      handler(nv) {
        this.validate = nv;
        this.open(nv);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
html,
body {
  min-height: 100%;
  font-size: 0.14rem;
}
#nprogress .bar {
  background: #f56c6c !important;
}
#nprogress .spinner {
  display: none !important;
}
/*解决谷歌浏览器自动填充背景变色的问题*/
input:-webkit-autofill {
  -webkit-text-fill-color: #ededed !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
}
</style>
 



