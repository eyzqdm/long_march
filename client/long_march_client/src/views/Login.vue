<template>
  <div class="login_form">
    <a-form
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item>
        <a-input v-model:value="formState.phone" placeholder="Username">
          <template #prefix
            ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formState.password"
          type="password"
          placeholder="Password"
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formState.user === '' || formState.password === ''"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <span>没有账号？立即注册</span>
  </div>
</template>
<script lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { defineComponent, reactive, UnwrapRef } from "vue";
import { userMsg } from "type/login";
import LoginApi from "api/login";

export default defineComponent({
  setup() {
    const formState: UnwrapRef<userMsg> = reactive({
      phone: "",
      password: "",
    });
    const handleFinish = () => {
      console.log(formState.phone);
      LoginApi.login({ ...formState });
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<userMsg>) => {
      console.log(errors);
    };
    return {
      formState,
      handleFinish,
      handleFinishFailed,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>
<style scoped lang="less">
.login_form {
  position: absolute;
  top: calc(50% - 145px);
  left: calc(50% - 136px);
}
</style>
