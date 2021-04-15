<template>
  <div class="login_form">
    <a-form
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item>
        <a-input v-model:value="formState.phone" placeholder="" @pressEnter="checkIsExist">
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
      phone: "",
      password: "",
    });
    const handleFinish = () => {
      console.log(formState.phone);
      LoginApi.login({ ...formState });
    };
    const checkIsExist = async(e:string) => {
        const res =  await LoginApi.isExist(e)
        console.log(res);
        
    }
    const handleFinishFailed = (errors: ValidateErrorEntity<userMsg>) => {
      console.log(errors);
    };
    const toLogin = () => {
      router.push({
        name:'login'
      })
    }
    return {
      formState,
      handleFinish,
      handleFinishFailed,
      toLogin,
      checkIsExist
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
.jump_btn{
    cursor: pointer;
}
</style>