import { Api } from '@/types'

const api: Api = {
  name: '猫眼电影',
  transit: true,
  url: 'https://maoyan.com/ajax/proxy/admin/mmdb/photos/upload.json',
  field_name: 'file',
  resp_type: 'json',
  url_field: ['data', 0, 'olink'],
  code_field: [],
  success_code: 0,
  max_size: 0,
  extensions: [],
}

export default api
