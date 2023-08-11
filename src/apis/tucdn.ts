import { Api } from '@/types'

const api: Api = {
  name: '急速免费图床',
  transit: true,
  url: 'https://tucdn.wpon.cn/upload/upload.html',
  field_name: 'image',
  additional_data: (f) => ({
    fileId: f.name,
    initialPreview: '[]',
    initialPreviewConfig: '[]',
    initialPreviewThumbTags: '[]',
  }),
  resp_type: 'json',
  url_field: ['data', 'url'],
  code_field: ['code'],
  success_code: 200,
  max_size: 0,
  extensions: [],
  disabled: true,
}

export default api
