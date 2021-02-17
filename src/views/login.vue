<!--
 * @Author: daiwei
 * @since: 2020-03-23 10:59:23
 * @lastTime: 2020-06-09 09:12:45
 * @LastAuthor: Do not edit
 * @FilePath: /ifiregas_web/src/views/login.vue
 * @message: 
 -->
<template>
  <div class="login-container" :style="{height: fullHeight}">
    <div class="base-radius login-wrap" :style="{'top': loginTop}">
      <div class="title-container">
        <h3 class="title">燃气探测器系统</h3>
        <p class="sub-title">Gas detector system</p>
      </div>
      <div class="login-form">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="inner-box"
          auto-complete="off"
          label-position="left"
        >
          <el-form-item>
            <div class="login-name">用户登录</div>
          </el-form-item>
          <el-form-item prop="username" class="form-item">
            <span class="svg-container">
              <span class="el-icon-user"></span>
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              clearable
              auto-complete="off"
            />
          </el-form-item>
          <el-form-item prop="password" class="form-item">
            <span class="svg-container">
              <span class="el-icon-lock"></span>
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              clearable
              auto-complete="off"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>
          <el-form-item>
            <IFireCheckbox :active="savePwd">记住密码</IFireCheckbox>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              class="btn"
              style="width:100%;"
              @click.native.prevent="handleLogin"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script >
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Mutation, namespace } from "vuex-class";
import NProgress from "nprogress";
import { getSaveUser, setSaveUser } from "@/utils/public/user-handle";
import { login } from "@/utils/ajax/api/unit";
import IFireCheckbox from "@/components/form/ifire-checkbox.vue";
import { Rem } from "../utils/rem";
import { get } from "../utils/ajax/axios";
import { doneProgress } from "../utils/public/public";
import { SecurityAjax } from "../utils/ajax/api/unit";
export default {
  name: "login",
  components: {
IFireCheckbox,
  },
  created() {
    this.back = this.$route.query.back || "";
    const user = getSaveUser();
    if (user) {
      this.loginForm = user;
      this.savePwd = true;
    }
    this.fullHeight = document.documentElement.offsetHeight + "px";
    this.boxMarginTop =
      (document.documentElement.offsetHeight - 500) / 2 + "px";
  },
  mounted() {
    this.$nextTick(() => {
      doneProgress();
    });
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      back: "", //　是否　返回
      loginBoxHeight: 546,
      loginForm: {
        username: "",
        password: ""
      },
      boxMarginTop: "0rem",
      fullHeight: "0rem",
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      savePwd: false
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(nv) {
        this.redirect = route.query && route.query.redirect;
      }
    }
  },
  computed: {
    loginTop() {
      if (this.fullHeight) {
        const _height =
          (parseInt(this.fullHeight.replace("px", "")) - this.loginBoxHeight) /
            2 -
          this.$rem.toPx(0.2) +
          "px";
        return _height;
      } else {
        return 0;
      }
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    setTokenAuth(auth) {
      this.$store.commit("setTokenAuth", auth);
    },
    // 进行登陆操作
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          setSaveUser(this.loginForm);
          SecurityAjax.login(this.loginForm.username, this.loginForm.password)
            .then(status => {
              if (typeof status === "boolean" && status) {
                this.$notify({
                  type: "success",
                  title: "提示",
                  message: "登录成功"
                });
                setTimeout(() => {
                  if (this.back) {
                    this.$router.back();
                  } else {
                    this.$router.push("/");
                  }
                }, 500);
                this.setTokenAuth(true);
              } else {
                this.$notify({
                  type: "error",
                  title: "提示",
                  message: "用户名或密码错误！"
                });
              }
              this.loading = false;
            })
            .catch(err => {
              this.loading = false;
            });
        } else {
          this.loading = false;
          return false;
        }
      });
    }
  }
};
</script>
<style>
html,
body {
  height: 100%;
}
</style>

<style lang="scss" scoped>
/* reset element-ui css */
.login-container {
  background: url("~@img/login_bg.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  .login-wrap {
    width: 6.31rem;
    //height: 5.46rem;
    position: absolute;
    right: 2.21rem;
    margin-top: 0;
    .title-container {
      text-align: center;
      .title {
        background: linear-gradient(to right, #009ff1, #00e8cf);
        background-clip: text;
        margin: 0;
        font-size: 0.4061rem;
        color: transparent;
      }
      .sub-title {
        margin: 0;
        font-size: 0.18rem;
        color: #00bff4;
      }
    }
    .login-form {
      border: 0.015rem solid rgba($color: $color_primary, $alpha: 0.5);
      margin-top: 0.33rem;
      padding: 0.2rem 0;
      //height: 4.365rem;
      .inner-box {
        width: 5.15rem;
        margin: 0 auto;
        .form-item {
          position: relative;
          color: #fff !important;
          .svg-container {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            height: 0.558rem;
            line-height: 0.558rem;
            left: 0.28rem;
            color: $color_primary;
            font-size: 0.18rem;
          }
          ::v-deep .el-input__inner {
            height: 0.558rem;
            line-height: 0.558rem;
            padding-left: 0.54rem;
            box-sizing: border-box;
            background: rgba($color: #1888cb, $alpha: 0.2);
            border: 0.03rem solid rgba(32, 163, 245, 0.4);
            color: #fff !important;
          }
        }
        .btn {
          height: 0.558rem;
          background: linear-gradient(to right, #0092ff, #31f4ff);
          padding: 0;
          color: #fff;
          font-size: 0.26rem;
          font-family: 58;
          font-weight: 400;
        }
      }
      ::v-deep .el-input__inner::placeholder {
        color: #fff;
      }
    }
    .login-name {
      padding: 0.19rem 0;
      font-size: 0.3249rem;
      color: #00bff4;
      text-align: center;
    }
  }
  ::v-deep .el-form-item {
    height: auto;
  }
}
</style>
