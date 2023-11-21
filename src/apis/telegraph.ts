import { Api } from '@/types'

const api: Api = {
  name: 'Telegraph',
  transit: true,
  url: 'https://telegra.ph/upload',
  field_name: 'file',
  resp_type: 'json',
  url_field: [0, 'src'],
  code_field: [],
  success_code: 0,
  max_size: 0,
  extensions: [],
  final_handler: (text) => {
    return `https://proxy.nn.ci/tgp${text}`
  },
}

export default api
