<template>
  <el-container>
    <el-header>
      <h2>图片上传</h2>
    </el-header>
    <el-main>
      <div class="main">
        <div id="radios">
          <div class="radio" v-for="api_option in api_options" :key="api_option.path">
            <el-radio :label="api_option.path" v-model="choose_api">
              <el-tag 
                :type="api_option.api.transit ? 'danger' : 'success'"
                effect="plain"
              >{{
                api_option.api.name
              }}</el-tag>
            </el-radio>
          </div>
        </div>
        <el-upload
          drag
          action="#"
          :http-request="httpRequest"
          ref="uploader"
          :auto-upload="true"
          :disabled="choose_api==''"
          @click="clickUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <url-show
          v-show="url !== ''"
          id="url-show"
          :url="url"
          :name="name"
        ></url-show>
      </div>
    </el-main>
    <div class="footer">
      <el-link href="https://github.com/Xhofe" type="success" target="_blank">Github</el-link>
    </div>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ImgApi from "./img_api";
import { ElMessage } from "element-plus";
import upload from "./utils/upload";
import UrlShow from "./components/UrlShow.vue";

interface Option {
  path: string;
  api: ImgApi;
}

export default defineComponent({
  name: "App",
  components: {
    UrlShow,
  },
  setup() {
    const apis = import.meta.globEager("./apis/*.ts");
    const api_options = ref<Option[]>([]);
    const choose_api = ref("");
    const url = ref("");
    const name = ref("");
    const uploader = ref<any>(null);
    for (const path in apis) {
      const api = apis[path].default as ImgApi;
      api_options.value.push({ path: path, api:api });
    }
    const httpRequest = (param: any) => {
      const file = param.file;
      upload(apis[choose_api.value].default as ImgApi, file).then((res) => {
        console.log(res);
        if (!res.img_url || res.err_msg) {
          ElMessage.error(res.err_msg);
          param.onError();
          return;
        }
        param.onSuccess();
        url.value = res.img_url;
        name.value = file.name;
      });
    };
    const clickUpload = ()=>{
      if (!choose_api.value) {
        ElMessage.warning("请先选择一个接口");
        return;
      }
      uploader.value!.clearFiles();
    }
    return {
      api_options,
      choose_api,
      url,
      name,
      httpRequest,
      uploader,
      clickUpload,
    };
  },
});
</script>

<style>
@media screen and (max-width: 600px) {
  .el-message {
    min-width: 80% !important;
  }
}
.el-main {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  padding: 0 !important;
  min-height: calc(95vh - 60px);
}
.main {
  width: min(844px, 88vw);
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
#radios {
  --mx: 2vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 5px;
  justify-items: start;
}
.el-upload{
  margin: 10px 0;
}
.el-upload-dragger {
  width: min(80vw, 360px) !important;
}
.el-tabs {
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-tag{
  min-width: 74px;
}
</style>
