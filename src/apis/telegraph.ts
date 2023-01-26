import ImgApi from "../img_api";

const api: ImgApi = {
  name :'Telegraph',
  transit: false,
  url:'https://api.nn.ci/tgp/upload',
  field_name: 'file',
  resp_type: 'json',
  url_field: [0, 'src'],
  code_field: [],
  success_code: 0,
  max_size: 0,
  extensions: [],
  final_handler: (text) => {
    return `https://api.nn.ci/tgp${text}`
  }
}

export default api;