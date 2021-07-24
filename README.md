## 图片上传

一个React练手项目，可自定义添加接口。
接口：
```typescript
interface ImgApi {
  name: string; //接口名称需要唯一
  transit: boolean; //是否需要中转(更改referrer,跨域)
  url: string; //接口地址
  field_name: string; //文件字段名称
  headers?: Data; // 请求头
  additional_data?: Data; //附加数据
  resp_type: 'text' | 'json'; //响应类型
  url_field: (string | number)[]; //url字段
  code_field: string[]; //状态码字段
  success_code: string | number; //成功状态码
  max_size: number; //最大文件大小
  extensions: string[]; //文件后缀
  final_handler?: (text: string) => string; //最终处理函数
}
```
示例：
```typescript
{
  name: 'upload.cc',
  transit: true,
  url: 'https://upload.cc/image_upload',
  field_name: 'uploaded_file[]',
  resp_type: 'json',
  url_field: ['success_image', 0, 'url'],
  code_field: ['code'],
  success_code: 100,
  max_size: 0,
  extensions: [],
  final_handler: (text) => {
    return `https://upload.cc/${text}`
  }
}
```