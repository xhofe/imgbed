import { Api } from '@/types'

const api: Api = {
  name: 'ImgBB',
  transit: false,
  url: 'https://zh-cn.imgbb.com/json',
  field_name: 'source',
  additional_data: {
    type: 'file',
    action: 'upload',
  },
  resp_type: 'json',
  url_field: ['image', 'url'],
  code_field: ['status_code'],
  success_code: 200,
  max_size: 0,
  extensions: [],
}

export default api
