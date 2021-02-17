<!--
 * @Descripttion: 
 * @version: 
 * @Author: david
 * @Date: 2020-07-06 23:57:27
 * @LastEditors: david
 * @LastEditTime: 2020-07-07 12:59:16
--> 
<!--
 * @Author: daiwei
 * @since: 2020-06-05 19:06:02
 * @lastTime: 2020-06-09 09:14:05
 * @LastAuthor: Do not edit
 * @文件相对于项目的路径: /ifiregas_web/src/components/form/my-checkbox.vue
 * @message: 
--> 
<template>
  <div class="my-checkbox" @click="tigger">
    <span class="my-checkbox__inner">
      <i class="el-icon-check" v-if="innerActive"></i>
    </span>
    <span class="my-checkbox__label" :class="{'active': innerActive}">
      <slot />
    </span>
  </div>
</template>
<script>
export default {
  name: "my-checkbox",
  data() {
    return {
      innerActive: false
    };
  },
  props: {
    active: { type: Boolean, default: false }
  },
  mounted() {
    this.innerActive = this.active;
  },
  watch: {
    active(active) {
      this.innerActive = active;
    }
  },
  methods: {
    tigger() {
      this.innerActive = !this.innerActive;
      this.$emit("update:active", this.innerActive);
    }
  }
};
</script>
<style lang='scss' scoped>
.my-checkbox {
  $unit: 0.2rem;
  height: $unit;
  line-height: $unit;
  display: inline-block;
  .my-checkbox__inner {
    width: $unit;
    height: $unit;
    display: block;
    border: 0.02rem solid rgba($color: $color_primary, $alpha: 0.6);
    border-radius: 0.04rem;
    float: left;
    box-sizing: border-box;
    line-height: 0.16rem;
    .el-icon-check {
      color: $color_primary;
      font-size: 0.14rem;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .my-checkbox__label {
    font-size: 0.14rem;
    margin-left: 0.1rem;
    color: #fff;
    &.active {
      color: $color_primary;
    }
  }
}
</style>