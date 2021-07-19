import ImgApi from "../img_api";

const api: ImgApi = {
  name :'aichat',
  transit: false,
  url:'https://upload.aichat.net/upload/single',
  field_name: 'single',
  resp_type: 'json',
  url_field: ['url'],
  code_field: ['code'],
  success_code: 200,
  max_size: 0,
  extensions: [],
}

export default api;