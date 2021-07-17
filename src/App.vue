<template>
  <el-container>
    <el-header>
      <h2>图片上传</h2>
    </el-header>
    <el-main>
      <div class="main">
        <div id="radios">
          <div class="radio" v-for="option in options" :key="option.value">
            <el-radio :label="option.value" v-model="value">
              <el-tag :type="option.cors ? 'danger' : ''">{{
                option.label
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
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ImgApi from "./img_api";
import { ElMessage } from "element-plus";
import upload from "./utils/upload";
import UrlShow from "./components/UrlShow.vue";

interface Option {
  value: string;
  label: string;
  cors: boolean;
}

export default defineComponent({
  name: "App",
  components: {
    UrlShow,
  },
  setup() {
    const apis = import.meta.globEager("./apis/*.ts");
    const options = ref<Option[]>([]);
    const value = ref("");
    const url = ref("");
    const name = ref("");
    const uploader = ref(null);
    for (const path in apis) {
      const api = apis[path].default as ImgApi;
      options.value.push({ value: path, label: api.name, cors: api.transit });
    }
    const httpRequest = (param: any) => {
      if (!value.value) {
        ElMessage.warning("请先选择一个接口");
        param.onError();
        return;
      }
      const file = param.file;
      upload(apis[value.value].default as ImgApi, file).then((res) => {
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
    return {
      options,
      value,
      url,
      name,
      httpRequest,
      uploader,
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
</style>
