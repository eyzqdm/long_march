<template>
  <div class="head_container">
    <div class="head_search">
      <a-input-search
        v-model:value="value"
        placeholder="input search text"
        style="width: 400px"
        @search="onSearch"
      />
    </div>
    <div class="head_btn_group">
      <div>首页</div>
      <div>注册</div>
      <div>登录</div>
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
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 100px;
}
.head_btn_group{
    display: flex;
    justify-content: space-around;
    width: 300px;
  }
</style>
