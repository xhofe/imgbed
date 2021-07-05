<template>
  <el-container>
    <el-header>
      <h2>图片上传</h2>
    </el-header>
    <el-main>
      <!-- <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <div id="radios">
        <el-radio
          v-for="option in options"
          :key="option.value"
          :label="option.value"
          v-model="value"
          >{{ option.label }}</el-radio
        >
      </div>
      <el-upload drag 
        action="#" 
        :http-request="httpRequest"
        :auto-upload="true">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ImgApi from "./img_api";
import {ElMessage} from 'element-plus'
import upload from "./utils/upload";

interface Option {
  value: string;
  label: string;
}

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const apis = import.meta.globEager("./apis/*.ts");
    const options = ref<Option[]>([]);
    const value = ref("");
    for (const path in apis) {
      const api = apis[path].default as ImgApi;
      options.value.push({ value: path, label: api.name });
    }
    const httpRequest = (param:any) => {
      if(!value.value){
        ElMessage.warning('请先选择一个图床')
        param.onError()
        return
      }
      const file = param.file
      upload(apis[value.value].default as ImgApi,file).then(res=>{
        if(res.err_msg){
          console.log(res)
          ElMessage.error(res.err_msg)
          return
        }
      })
    }
    return {
      options,
      value,
      httpRequest,
    };
  },
});
</script>

<style scoped>
#radios{
  --mx:2vw;
  margin-bottom: 10px;
  margin-left: var(--mx);
  margin-right: var(--mx);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
