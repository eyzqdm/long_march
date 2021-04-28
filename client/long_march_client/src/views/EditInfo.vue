<template>
<div>个人信息设置</div>
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
          <a-radio value="1">男</a-radio>
          <a-radio value="2">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="上传头像">
        <a-upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="http://127.0.0.1:3000/api/user/upload"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
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
import {
  UserOutlined,
  LockOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { defineComponent, reactive, UnwrapRef, ref } from "vue";
import { userMsg } from "type/login";
import LoginApi from "api/login";

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  type?: string;
  size: number;
  originFileObj: any;
}
interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

export default defineComponent({
  setup() {
    LoginApi.getUserInfo()
    const router = useRouter();
    const formState: UnwrapRef<userMsg> = reactive({
      userName: "",
      password: "",
      nickName: "asdda",
      confPassword: "",
      newPassword: "",
      gender: 1,
      picture: "picture",
      city: "shanghai",
    });
    const fileList = ref([]);
    const loading = ref(false);
    const imageUrl = ref("");
    const handleFinish = async () => {
      console.log(formState.userName);
      const { errno } = await LoginApi.Register({ ...formState });
      if (errno === 0) {
        router.push({
          name: "login",
        });
      }
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
    function getBase64(img: Blob, callback: (base64Url: string) => void) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result as string));
      reader.readAsDataURL(img);
    }
    const handleChange = (info: FileInfo) => {
      if (info.file.status === "uploading") {
        loading.value = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url: string) => {
          imageUrl.value = base64Url;
          loading.value = false;
        });
      }
      if (info.file.status === "error") {
        loading.value = false;
        message.error("upload error");
      }
    };

    const beforeUpload = (file: FileItem) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    };
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      formState,
      handleFinish,
      handleFinishFailed,
      toLogin,
      checkIsExist,
      fileList,
      loading,
      imageUrl,
      handleChange,
      beforeUpload,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
    LoadingOutlined,
    PlusOutlined,
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
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
