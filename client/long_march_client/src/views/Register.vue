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
        <a-input
          v-model:value="formState.userName"
          placeholder=""
          @pressEnter="checkIsExist"
        >
          <template #prefix
            ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item label="密码">
        <a-input
          v-model:value="formState.password"
          type="password"
          placeholder=""
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item label="确认密码">
        <a-input
          v-model:value="formState.newPassword"
          type="password"
          placeholder=""
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item label="确认密码">
        <a-radio-group name="radioGroup" v-model:value="formState.gender">
          <a-radio value=1>男</a-radio>
          <a-radio value=2>女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="formState.userName === '' || formState.password === ''"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
    <span class="jump_btn" @click="toLogin">已有帐号？立即登录</span>
  </div>
</template>
<script lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { useRouter } from "vue-router";
import { defineComponent, reactive, UnwrapRef } from "vue";
import { userMsg } from "type/login";
import LoginApi from "api/login";

export default defineComponent({
  setup() {
    const router = useRouter();
    const formState: UnwrapRef<userMsg> = reactive({
      userName: "",
      password: "",
      nickName:'asdda',
      confPassword: "",
      newPassword:'',
      gender: 1,
      picture:'picture',
      city:'shanghai'
    });
    const handleFinish = () => {
      console.log(formState.userName);
      LoginApi.Register({ ...formState });
    };
    const checkIsExist = async (e: string) => {
      const res = await LoginApi.isExist({
        userName: formState.userName,
      });
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<userMsg>) => {
      console.log(errors);
    };
    const toLogin = () => {
      router.push({
        name: "login",
      });
    };
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      formState,
      handleFinish,
      handleFinishFailed,
      toLogin,
      checkIsExist,
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
