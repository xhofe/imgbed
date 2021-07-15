<template>
  <el-tabs v-model="active">
    <el-tab-pane label="URL" name="first">
      <el-input v-model="url">
        <template #suffix>
          <i style="cursor: pointer;" class="el-input__icon el-icon-copy-document" @click="copyToClip(url)"></i>
        </template>
      </el-input>
    </el-tab-pane>
    <el-tab-pane label="HTML" name="second">
      <el-input v-model="html">
        <template #suffix>
          <i style="cursor: pointer;" class="el-input__icon el-icon-copy-document" @click="copyToClip(html)"></i>
        </template>
      </el-input>
    </el-tab-pane>
    <el-tab-pane label="BBCode" name="third">
      <el-input v-model="bbcode">
        <template #suffix>
          <i style="cursor: pointer;" class="el-input__icon el-icon-copy-document" @click="copyToClip(bbcode)"></i>
        </template>
      </el-input>
    </el-tab-pane>
    <el-tab-pane label="Markdown" name="fourth">
      <el-input v-model="markdown">
        <template #suffix>
          <i style="cursor: pointer;" class="el-input__icon el-icon-copy-document" @click="copyToClip(markdown)"></i>
        </template>
      </el-input>
    </el-tab-pane>
    <el-tab-pane label="Markdown width link" name="fifth">
      <el-input v-model="markdown_with_link">
        <template #suffix>
          <i style="cursor: pointer;" class="el-input__icon el-icon-copy-document" @click="copyToClip(markdown_with_link)"></i>
        </template>
      </el-input>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import { copyToClip } from "../utils/copy_clip";

export default defineComponent({
  name: "url-show",
  props: {
    url: String,
    name: String,
  },
  setup(props) {
    const active = ref("first");
    const data = reactive({
      name: props.name,
      url: props.url,
      html: `<img src="${props.url}" alt="${props.name}" title="${props.name}" referrerPolicy="no-referrer" />`,
      bbcode: `[img]${props.url}[/img]`,
      markdown: `![${props.name}](${props.url})`,
      markdown_with_link: `[![${props.name}](${props.url})](${props.url})`,
    });
    watch(props,()=>{
        data.name = props.name
        data.url = props.url
        data.html = `<img src="${props.url}" alt="${props.name}" title="${props.name}" referrerPolicy="no-referrer" />`
        data.bbcode = `[img]${props.url}[/img]`
        data.markdown = `![${props.name}](${props.url})`
        data.markdown_with_link = `[![${props.name}](${props.url})](${props.url})`
    })
    return {
      ...toRefs(data),
      active,
      copyToClip
    };
  },
});
</script>


<style>
</style>