import { Api } from '@/types'

const api: Api = {
  name: '搜狗',
  transit: true,
  url: 'https://pic.sogou.com/pic/upload_pic.jsp',
  field_name: 'upload',
  resp_type: 'text',
  url_field: [],
  code_field: [],
  success_code: 0,
  max_size: 0,
  extensions: [],
}

export default api
