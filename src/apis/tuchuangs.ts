import { Api } from '@/types'

const api: Api = {
  name: 'tuchuangs',
  transit: false,
  url: 'https://www.tuchuangs.com/upload/localhost',
  field_name: 'file',
  resp_type: 'json',
  url_field: ['url'],
  code_field: ['code'],
  success_code: 200,
  max_size: 0,
  extensions: [],
}

export default api
