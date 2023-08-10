import { Api } from '@/types'

const api: Api = {
  name: '百度文库',
  transit: true,
  url: 'https://wenku.baidu.com/user/api/editorimg',
  field_name: 'file',
  resp_type: 'json',
  url_field: ['link'],
  code_field: [],
  success_code: 0,
  max_size: 0,
  extensions: [],
}

export default api
