import { Api } from '@/types'

const api: Api = {
  name: '百度知道',
  transit: true,
  url: 'https://zhidao.baidu.com/submit/ajax/',
  field_name: 'image',
  additional_data: { cm: 100672 },
  resp_type: 'json',
  url_field: ['url'],
  code_field: ['errorNo'],
  success_code: 0,
  max_size: 0,
  extensions: [],
}

export default api
