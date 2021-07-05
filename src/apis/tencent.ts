import ImgApi from "../img_api";

const tencent: ImgApi = {
    name: '腾讯',
    transit: true,
    url: 'https://om.qq.com/image/orginalupload',
    field_name: 'Filedata',
    additional_data: {},
    resp_type: 'json',
    url_field: ['data', 'url'],
    code_field: ['response', 'code'],
    success_code: 0,
    max_size: 0,
    extensions: [],
}

export default tencent