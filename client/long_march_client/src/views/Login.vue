<template>
  <div class="long_march">Long March</div>
  <div class="title">用户名密码登录</div>
  <div class="login_form">
    <a-form
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="用户名">
        <a-input v-model:value="formState.userName" placeholder="">
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
          :disabled="formState.userName === '' || formState.password === ''"
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
  <div @click="changeNum">{{ num }}</div>
</template>
<script lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { defineComponent, reactive, UnwrapRef, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { userMsg } from "type/login";
import LoginApi from "api/login";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const router = useRouter();
    const formState: UnwrapRef<userMsg> = reactive({
      userName: "",
      password: "",
    });
    const handleFinish = async () => {
      const { code, message: msg, data: res } = await LoginApi.login({
        ...formState,
      });
      console.log(code);
      if (code === 0) {
        message.success("登陆成功");
        sessionStorage.setItem("token", res.token);
        router.push("/");
      } else {
        message.warning(msg);
      }
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<userMsg>) => {
      console.log(errors);
    };
    const toRegister = () => {
      router.push({
        name: "register",
      });
    };
    const useNum = inject("test");
    const { changeNum, num } = useNum;
    console.log(changeNum);

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      formState,
      handleFinish,
      handleFinishFailed,
      toRegister,
      checked: ref(false),
      changeNum,
      num,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});
</script>
<style scoped lang="less">
.long_march {
  position: fixed;
  top: 20%;
  left: 40%;
  width: 350px;
  text-align: center;
  font-size: 50px;
  color: #7497c2;
  border: 2px solid #7497c2;
}
.title{
   position: fixed;
  top: 30%;
  left: 40%;
  width: 350px;
  text-align: center;
  font-size: 20px;
  color: #7497c2;
}
.login_form {
  position: absolute;
  top: calc(50% - 145px);
  left: calc(50% - 136px);
}
.jump_btn {
  cursor: pointer;
}
</style>
