<template>
  <div class="login_form">
    <a-form
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="用户名">
        <a-input v-model:value="formState.phone" placeholder="">
          <template #prefix
            ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item label="密码">
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
    <div>
      <a-checkbox v-model:checked="checked">记住我</a-checkbox>
    </div>
    <span class="jump_btn" @click="toRegister">没有账号？立即注册</span>
  </div>
</template>
<script lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { defineComponent, reactive, UnwrapRef, ref } from "vue";
import { useRouter } from "vue-router";
import { userMsg } from "type/login";
import LoginApi from "api/login";

export default defineComponent({
  setup() {
    const router = useRouter();
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
    const toRegister = () => {
      router.push({
        name: "register",
      });
    };
    return {
      labelCol: { span:4 },
      wrapperCol: { span: 16 },
      formState,
      handleFinish,
      handleFinishFailed,
      toRegister,
      checked: ref(false),
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
.jump_btn {
  cursor: pointer;
}
</style>
