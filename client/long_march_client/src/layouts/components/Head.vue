<template>
  <div class="head_container">
    <div class="head_search">
      <div>LOGO</div>
      <a-input-search
        v-model:value="value"
        placeholder="搜你想搜的"
        style="width: 600px"
        @search="onSearch"
      />
    </div>
    <div class="head_btn_group">
      <router-link to="/">首页</router-link>
      <router-link to="/square">广场</router-link>
      <router-link to="/register">注册</router-link>
      <router-link to="/login">登录</router-link>
      <router-link to="/edit">个人设置</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const value = ref('')
    const onSearch = () => {

    }

    return {
      onSearch
    }
  },
};
</script>

<style lang="less" scoped>

.head_container{
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 100px 10px 100px;
  border-bottom: 1px solid #F2F2F5;
  .head_search{
    display: flex;
    justify-content: space-between;
    width: 650px;
  }
}
.head_btn_group{
    display: flex;
    justify-content: space-around;
    width: 500px;
    font-size: 18px;
  }
</style>
