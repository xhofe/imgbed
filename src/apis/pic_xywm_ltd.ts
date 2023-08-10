import { Api } from '@/types'

const api: Api = {
  name: '图片储存',
  transit: false,
  url: 'https://pic.xywm.ltd/api/upload',
  field_name: 'image',
  resp_type: 'json',
  url_field: ['data', 'url'],
  code_field: ['code'],
  success_code: 200,
  max_size: 0,
  extensions: [],
}

export default api
