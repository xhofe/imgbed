import ImgApi from "../img_api";

const api: ImgApi = {
    name: '大众点评',
    transit: false,
    url: 'https://kf.dianping.com/api/file/burstUploadFile',
    field_name: 'files',
    headers:{
      'CSC-VisitId':'access-ba00ca3b-fa67-4a4f-b5d5-4522e8788ba5'
    },
    additional_data: {
      part:0,
      partSize:1,
      fileName:'meituan',
      fileID:'453573879545378'
    },
    resp_type: 'json',
    url_field: ['data', 'uploadPath'],
    code_field: ['code'],
    success_code: 200,
    max_size: 0,
    extensions: [],
}

export default api